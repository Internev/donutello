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
import { authenticate } from '@/app/lib/actions'
import { useFormState } from 'react-dom'

export default function SplitScreen() {
  const [errorMessage, dispatch, isPending] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch}>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Would you like to see some anime?</Heading>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" id="username" name="username" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Job Title</FormLabel>
              <Input type="text" id="jobtitle" name="jobtitle" />
            </FormControl>
            <Stack spacing={6} mt={4}>
              <Button colorScheme={'blue'} variant={'solid'} type='submit' isLoading={isPending}>
                Boy, would I!
              </Button>
            </Stack>
            {errorMessage && (
              <>
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
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