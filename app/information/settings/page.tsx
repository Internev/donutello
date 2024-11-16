// app/settings/page.tsx
import { auth } from '@/auth'
import { SettingsForm } from './SettingsForm'
import { redirect } from 'next/navigation'
import { Box, Container } from '@chakra-ui/react'

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.md" h="100vh" py={8}>
        <SettingsForm
          id={session.user.id}
          username={session.user.username}
          jobtitle={session.user.jobtitle}
        />
      </Container>
    </Box>
  )
}