import Link from "next/link"
import { Card, CardBody, Stack, Show, Skeleton, SkeletonText, SimpleGrid, Box } from '@chakra-ui/react'

const AnimeCardSkeleton = () => {
  const CardDisplaySkeleton = () => {
    return (
      <CardBody>
        <Skeleton
          height="320px"
          borderRadius="lg"
        />
        <Stack mt="2" spacing="3">
          <SkeletonText noOfLines={2} />
        </Stack>
      </CardBody>
    )
  }

  return (
    <Card maxW="sm" height="400px" variant="unstyled">
      <CardDisplaySkeleton />
    </Card>
  )
}

const AnimeGridFallback = () => {
  const animeList = Array(30).fill('')
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 3, lg: 3, xl: 4 }}
      gap="40px"
      width="100%"
    >
      {animeList?.map((_, i) => (
        <Link href="#" key={`skeleton-${i}`}>
          <AnimeCardSkeleton />
        </Link>
      ))}
    </SimpleGrid>
  )
}

export default AnimeGridFallback


