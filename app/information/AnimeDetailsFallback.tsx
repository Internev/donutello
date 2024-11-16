import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Skeleton,
  SkeletonText,
  VStack,
} from '@chakra-ui/react'

const AnimeStatsSkeleton = () => {

  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={4}
      mb={8}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Box
          key={`stat-skeleton-${index}`}
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          gridColumn={index === 2 ? { base: '1/3', md: 'auto' } : 'auto'}
        >
          <VStack>
            <Skeleton height="24px" width="60%" />
            <Skeleton height="16px" width="80%" />
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  )
}

const CharacterListSkeleton = () => {

  return (
    <Box>
      <Skeleton height="24px" width="120px" mb={4} />
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4 }}
        spacing={4}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Box
            key={`character-skeleton-${index}`}
            p={3}
            borderRadius="md"
            borderWidth="1px"
          >
            <Skeleton height="20px" />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

const TagListSkeleton = () => {
  return (
    <Box>
      <Skeleton height="24px" width="120px" mb={4} />
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4 }}
        spacing={2}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton
            key={`tag-skeleton-${index}`}
            height="24px"
            borderRadius="full"
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

const AnimeDetailsSkeleton = () => {

  return (
    <Container maxW="7xl" py={8}>
      {/* Banner Image Skeleton */}
      <Box
        position="relative"
        mb={8}
        borderRadius="xl"
        overflow="hidden"
      >
        <Skeleton height="400px" width="100%" />
      </Box>

      {/* Content */}
      <VStack spacing={6} align="stretch">
        {/* Title */}
        <Skeleton height="36px" width="60%" />

        {/* Stats */}
        <AnimeStatsSkeleton />

        {/* Description */}
        <Box
          p={6}
          borderRadius="lg"
          borderWidth="1px"
        >
          <SkeletonText noOfLines={6} spacing={4} skeletonHeight="4" />
        </Box>

        {/* Characters and Tags */}
        <Stack
          spacing={8}
          divider={<StackDivider />}
        >
          <CharacterListSkeleton />
          <TagListSkeleton />
        </Stack>

        {/* Action Button */}
        <Skeleton height="48px" borderRadius="md" />
      </VStack>
    </Container>
  )
}

export default AnimeDetailsSkeleton