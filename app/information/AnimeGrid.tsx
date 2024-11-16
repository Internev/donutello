'use client'

import { useGetAnimeListSuspenseQuery } from '@/graphql/generated/graphql'
import AnimeCard from './AnimeCard'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { SimpleGrid, Container } from '@chakra-ui/react'

const AnimeGrid = () => {
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const currentPage = page ? parseInt(page) : 1
  const { data } = useGetAnimeListSuspenseQuery({
    variables: { offset: currentPage - 1 },
  })

  const animeList = data?.Page?.media

  return (
    <Container
      maxW="7xl"
      px={{ base: 2, sm: 4, md: 6 }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 4, md: 6 }}
        width="100%"
        justifyItems="center"
      >
        {animeList?.map((anime) => (
          <Link
            href={`/information/details/${anime?.id}`}
            key={anime?.id}
            style={{ width: '100%' }}
          >
            <AnimeCard anime={anime} />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default AnimeGrid