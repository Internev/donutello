'use client'

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error somewhere useful, like Sentry
    console.error('Error:', error)
  }, [error])

  return (
    <Box minH="100vh" bg="gray.50" py={10}>
      <Container maxW="container.md">
        <VStack spacing={6} align="center" textAlign="center">

          <Heading size="lg">
            Something went wrong! Donut worry, we can try again
          </Heading>

          <Text color="gray.600">
            {error.message || "We've encountered an unexpected error."}
          </Text>

          {process.env.NODE_ENV === 'development' && (
            <Text
              fontSize="sm"
              color="gray.500"
              maxW="full"
              overflow="auto"
              whiteSpace="pre-wrap"
            >
              {error.stack}
            </Text>
          )}

          <Button
            colorScheme="blue"
            onClick={reset}
            size="lg"
            mt={4}
          >
            Try again
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}