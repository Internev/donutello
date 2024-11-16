import Link from "next/link"
import { Card, CardBody, Stack, Show, Skeleton, SkeletonText } from '@chakra-ui/react'

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

const AnimeListFallback = () => {
  const animeList = Array(30).fill('')
  return animeList?.map((_, i) => (
    <Link href="#" key={`skeleton-${i}`}>
      <AnimeCardSkeleton />
    </Link>
  ))
}

export default AnimeListFallback