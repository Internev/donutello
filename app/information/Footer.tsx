import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'

export default function SmallWithNavigation() {
  return (
    <Box
      bg={'gray.50'}
      color={'gray.700'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>I dunno, I just felt like I should make a footer.</Text>
      </Container>
    </Box>
  )
}