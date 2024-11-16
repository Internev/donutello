import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { sql } from '@vercel/postgres'

export interface User {
  id: string
  username: string
  jobtitle: string
  favourites?: Set<string>
}

async function getOrCreateUser(username: string, jobtitle: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`
      INSERT INTO users (username, jobtitle)
      VALUES (${username}, ${jobtitle})
      ON CONFLICT (username) 
      DO UPDATE SET jobtitle = ${jobtitle}
      RETURNING *
    `
    return user.rows[0]
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {
      console.log('authorize credentials:', credentials)
      const parsedCredentials = z
        .object({ username: z.string().min(1), jobtitle: z.string().min(1) })
        .safeParse(credentials)

      if (parsedCredentials.success) {
        const { username, jobtitle } = parsedCredentials.data
        const user = await getOrCreateUser(username, jobtitle)
        if (!user) return null // TODO: something helpful to handle this
        return {
          id: user.id,
          username: user.username,
          jobtitle: user.jobtitle,
        }
      }
      console.log('Credential validation failed')
      return null
    },
  })]
})