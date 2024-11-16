// app/lib/actions.ts
'use server'

import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'

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