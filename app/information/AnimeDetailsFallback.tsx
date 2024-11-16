'use client'

import {
  Box,
  Container,
  Stack,
  Skeleton,
  SkeletonText,
  Flex,
  Button,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Card,
  CardBody,
} from '@chakra-ui/react'

const CharacterListSkeleton = () => {
  return (
    <Box>
      <Skeleton height="24px" width="120px" mb={4} />
      <SimpleGrid columns={{ base: 2, md: 3 }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Card variant={'unstyled'} key={`character-skeleton-${index}`}>
            <CardBody>
              <Skeleton height="20px" width="80%" />
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}

const TagListSkeleton = () => {
  return (
    <Box>
      <Skeleton height="24px" width="120px" mb={4} />
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={`tag-skeleton-${index}`} height="24px" borderRadius="full" />
        ))}
      </SimpleGrid>
    </Box>
  )
}

const AnimeDetailsSkeleton = () => {
  return (
    <Container maxW={'7xl'} py={6}>
      <Flex>
        <Skeleton
          height="300px"
          width="100%"
          borderRadius="md"
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Skeleton
            height={{ base: '30px', sm: '40px', lg: '50px' }}
            width="60%"
            mt={6}
          />
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={
            <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
          }>
          <SkeletonText noOfLines={6} spacing={4} />

          <CharacterListSkeleton />
          <TagListSkeleton />
        </Stack>

        <Button
          rounded={'none'}
          w={'full'}
          mt={8}
          size={'lg'}
          py={'7'}
          bg={useColorModeValue('gray.900', 'gray.50')}
          color={useColorModeValue('white', 'gray.900')}
          textTransform={'uppercase'}
          isDisabled
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}>
          Add to favourites
        </Button>
      </Stack>
    </Container>
  )
}

export default AnimeDetailsSkeleton