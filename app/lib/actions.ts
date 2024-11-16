// app/lib/actions.ts
'use server'

import { signIn, signOut, auth } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

const FormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  jobtitle: z.string().min(1, 'Job title is required'),
})

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const validatedFields = FormSchema.safeParse({
      username: formData.get('username'),
      jobtitle: formData.get('jobtitle'),
    })

    console.log('validated fields:', validatedFields)
    if (!validatedFields.success) {
      return 'Invalid fields. Please check your input.'
    }

    const { username, jobtitle } = validatedFields.data

    await signIn('credentials', {
      username,
      jobtitle,
    })

    return undefined
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Authentication failed.'
    }
    throw error
  }
}

export async function handleSignOut() {
  await signOut()
  redirect('/login')
}

const SettingsSchema = z.object({
  id: z.string(),
  username: z.string().min(1, 'Username must exist'),
  jobtitle: z.string().min(1, 'Job title must exist'),
})

export async function updateSettings(prevState: string | undefined, formData: FormData) {
  try {
    // Get current session to verify user
    const session = await auth()
    if (!session?.user) {
      return {
        message: 'You must be logged in to update settings',
        status: 'error',
      }
    }

    const validatedFields = SettingsSchema.safeParse({
      id: formData.get('id'),
      username: formData.get('username'),
      jobtitle: formData.get('jobtitle'),
    })

    if (!validatedFields.success) {
      return {
        message: 'Invalid fields. Please check your input.',
        status: 'error',
      }
    }

    const { id, username, jobtitle } = validatedFields.data

    // Verify the user is updating their own settings
    if (id !== session.user.id) {
      return {
        message: 'Unauthorized',
        status: 'error',
      }
    }

    // Update database
    await sql`
      UPDATE users
      SET username = ${username}, jobtitle = ${jobtitle}
      WHERE id = ${id}
    `

    // Update session by signing in again with new credentials
    await signIn('credentials', {
      username,
      jobtitle,
      redirect: false,
    })

    revalidatePath('/settings')

    return {
      message: 'Settings updated successfully',
      status: 'success',
    }
  } catch (error) {
    console.error('Failed to update settings:', error)
    return {
      message: 'Failed to update settings',
      status: 'error',
    }
  }
}