'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react'

export default function SplitScreen() {
  return (
    <form action={'formAction'}>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Would you like to see some anime?</Heading>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Job Title</FormLabel>
              <Input type="text" />
            </FormControl>
            <Stack spacing={6} mt={4}>
              <Button colorScheme={'blue'} variant={'solid'} type='submit'>
                Boy, would I!
              </Button>
            </Stack>
          </Stack>
        </Flex >
        <Flex flex={1}>
          <Image
            alt={'image a of tasty donut'}
            objectFit={'cover'}
            src={'/donutV.jpg'}
          />
        </Flex>
      </Stack >
    </form>
  )
}