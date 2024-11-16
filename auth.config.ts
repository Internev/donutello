import type { NextAuthConfig } from 'next-auth'
import { User as NextAuthUser } from 'next-auth'

interface User extends NextAuthUser {
  username?: string
  jobtitle?: string
}

interface Session {
  user?: User
  expires: string
}

import { JWT } from 'next-auth/jwt'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/information')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/information?page=1', nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      // Add the id to the token when it's first created
      if (user) {
        token.id = user.id
        if ('username' in user && 'jobtitle' in user) {
          token.username = user.username
          token.jobtitle = user.jobtitle
        }
      }
      return token
    },
    session({ session, token }: { session: Session; token: JWT }) {
      // Add the id from the token to the session
      if (session.user) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.jobtitle = token.jobtitle as string
      }
      return session
    },
  },
  providers: [], // handled in auth.ts
} satisfies NextAuthConfig