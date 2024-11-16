'use client'

import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { authenticate } from '@/app/lib/actions'
import { useFormState } from 'react-dom'

const LoginPage = () => {
  const [errorMessage, dispatch, isPending] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch}>
      <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
        {/* Left side - Form */}
        <Flex
          p={8}
          flex={1}
          align="center"
          justify="center"
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <Stack
            spacing={8}
            w="full"
            maxW="md"
            bg={useColorModeValue('white', 'gray.800')}
            rounded="xl"
            boxShadow="lg"
            p={{ base: 4, sm: 6, md: 8 }}
          >
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Heading
                  fontSize={{ base: "2xl", md: "3xl" }}
                  color={useColorModeValue('pink.400', 'pink.200')}
                >
                  🍩 Welcome to Donutello
                </Heading>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color={useColorModeValue('gray.600', 'gray.400')}
                >
                  Would you like to see some anime?
                </Text>
              </Stack>
            </Stack>

            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel
                  color={useColorModeValue('gray.700', 'gray.300')}
                >
                  Username
                </FormLabel>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  border={0}
                  _focus={{
                    bg: useColorModeValue('white', 'gray.800'),
                    borderColor: 'pink.400',
                    boxShadow: '0 0 0 1px pink.400'
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel
                  color={useColorModeValue('gray.700', 'gray.300')}
                >
                  Job Title
                </FormLabel>
                <Input
                  type="text"
                  id="jobtitle"
                  name="jobtitle"
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  border={0}
                  _focus={{
                    bg: useColorModeValue('white', 'gray.800'),
                    borderColor: 'pink.400',
                    boxShadow: '0 0 0 1px pink.400'
                  }}
                />
              </FormControl>
            </Stack>

            <Stack spacing={6}>
              <Button
                bg="pink.400"
                color="white"
                _hover={{
                  bg: 'pink.500',
                }}
                type="submit"
                isLoading={isPending}
                size="lg"
                fontSize="md"
              >
                Boy, would I!
              </Button>

              {errorMessage && (
                <Text
                  color="red.500"
                  fontSize="sm"
                  textAlign="center"
                >
                  {errorMessage}
                </Text>
              )}
            </Stack>
          </Stack>
        </Flex>

        {/* Right side - Image */}
        <Flex
          flex={1}
          display={{ base: 'none', md: 'flex' }}
          position="relative"
          overflow="hidden"
        >
          <Image
            alt="A martial arts donut with pink icing"
            objectFit="cover"
            src="/donutV.jpg"
          />
          <Box
            position="absolute"
            top={0}
            right={0}
            bottom={0}
            left={0}
            bg="blackAlpha.400"
            backdropFilter="blur(1px)"
          />
        </Flex>
      </Stack>
    </form>
  )
}

export default LoginPage