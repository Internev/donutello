'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Link,
  useColorModeValue
} from '@chakra-ui/react'

export default function Footer() {
  const bgColor = useColorModeValue('gray.200', 'gray.800')
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box
      bg={bgColor}
      borderTop="1px"
      borderColor={borderColor}
      mt={8}
    >
      <Container
        as={Stack}
        maxW="7xl"
        py={6}
        spacing={4}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text color={textColor} textAlign="center">
            Made with 🍩 by a hungry developer
          </Text>
          <Stack
            direction="row"
            spacing={6}
            justify="center"
          >
            <Link
              href="/about"
              color={textColor}
              _hover={{ color: 'brand.pink.400' }}
            >
              About
            </Link>
            <Link
              href="/privacy"
              color={textColor}
              _hover={{ color: 'brand.pink.400' }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              color={textColor}
              _hover={{ color: 'brand.pink.400' }}
            >
              Terms
            </Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}