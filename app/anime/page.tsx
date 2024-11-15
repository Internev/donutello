'use client'

import { useGetAnimeListQuery } from '@/graphql/generated/graphql'
import { Container, SimpleGrid } from "@chakra-ui/react"
import AnimeCard from './AnimeCard'
import Link from 'next/link'

// Anilist API wasn't too robust...
import { response } from '@/app/dummy'
const { data } = response

const AnimeList = () => {
  // const { data, error, loading, fetchMore } = useGetAnimeListQuery({
  //   variables: { offset: 0 }
  // })

  // if (loading) return <div>Loading...</div>
  // if (error) return <div>Error loading data</div>


  const animeList = data?.Page?.media
  return (
    <Container maxW={'6xl'}>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3, lg: 3, xl: 4 }}
        mb={20}
        gap="40px"
      >
        {animeList?.map((anime) => (
          <Link href={`/anime/details/${anime?.id}`} as={`/anime/details/${anime?.id}`} key={anime?.id}>
            <AnimeCard anime={anime} />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default AnimeList