'use client'

import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState, useTransition, useEffect } from 'react'
import { updateSettings } from '@/app/lib/actions'
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
  status: '',
}

interface SettingsFormProps {
  id: string
  username: string
  jobtitle: string
}

export function SettingsForm({ id, username, jobtitle }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    username,
    jobtitle,
  })
  const [errors, setErrors] = useState({
    username: '',
    jobtitle: '',
  })
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useFormState(updateSettings, initialState)
  const toast = useToast()

  const hasChanges =
    formData.username !== username ||
    formData.jobtitle !== jobtitle

  // Use useEffect to handle toast notifications
  useEffect(() => {
    if (state.message && state.status) {
      toast({
        title: state.message,
        status: state.status as 'success' | 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }, [state.message, state.status, toast])

  // Rest of your component remains the same...

  const validateForm = () => {
    const newErrors = {
      username: '',
      jobtitle: '',
    }

    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    if (formData.jobtitle.length < 2) {
      newErrors.jobtitle = 'Job title must be at least 2 characters'
    }

    setErrors(newErrors)
    return !newErrors.username && !newErrors.jobtitle
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const data = new FormData()
    data.append('id', id)
    data.append('username', formData.username)
    data.append('jobtitle', formData.jobtitle)

    startTransition(() => {
      formAction(data)
    })
  }

  const handleReset = () => {
    setFormData({
      username,
      jobtitle,
    })
    setErrors({
      username: '',
      jobtitle: '',
    })
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">User Settings</Heading>
      </CardHeader>
      <CardBody>
        <form action={formAction}>
          <Stack spacing={6}>
            <input type="hidden" name="id" value={id} />

            <FormControl isInvalid={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <FormErrorMessage>
                {errors.username}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.jobtitle}>
              <FormLabel>Job Title</FormLabel>
              <Input
                name="jobtitle"
                value={formData.jobtitle}
                onChange={handleChange}
              />
              <FormErrorMessage>
                {errors.jobtitle}
              </FormErrorMessage>
            </FormControl>

            <Stack direction="row" spacing={4} justify="flex-end">
              <Button
                colorScheme="gray"
                onClick={handleReset}
                isDisabled={!hasChanges || isPending}
              >
                Reset
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isPending}
                isDisabled={!hasChanges}
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </form>
      </CardBody>
    </Card>
  )
}