import Link from "next/link"
import {
  Card,
  CardBody,
  Stack,
  Skeleton,
  SkeletonText,
  SimpleGrid,
  Container,
} from '@chakra-ui/react'

const AnimeCardSkeleton = () => {
  return (
    <Card
      maxW='sm'
      height='400px'
      width='250px'
      variant='outline'
    >
      <CardBody>
        <Skeleton
          height='320px'
          width='250px'
          borderRadius='lg'
        />
        <Stack mt="3" spacing="1">
          <SkeletonText
            noOfLines={2}
            spacing="2"
          />
        </Stack>
      </CardBody>
    </Card>
  )
}

const AnimeGridFallback = () => {
  const animeList = Array(30).fill('')

  return (
    <Container
      maxW="7xl"
      px={{ base: 2, sm: 4, md: 6 }}
    >
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
    </Container>
  )
}

export default AnimeGridFallback