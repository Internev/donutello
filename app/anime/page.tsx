'use client'

import { useGetAnimeListQuery } from '@/graphql/generated/graphql'
import { Container, SimpleGrid } from "@chakra-ui/react"
import AnimeCard from './AnimeCard'
import { response } from '@/app/dummy'
import Link from 'next/link'


const AnimeList = () => {
  // const { data, error, loading, fetchMore } = useGetAnimeListQuery({
  //   variables: { offset: 0 }
  // })

  // if (loading) return <div>Loading...</div>
  // if (error) return <div>Error loading data</div>

  const data = response

  console.log('data', data)
  const animeList = data?.Page?.media
  return (
    <Container maxW={'4xl'}>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
        mb={20}
        gap="40px"
      >
        {animeList?.map((anime) => (
          <Link href={`/anime/details/${anime?.id}`} as={`/anime/details/${anime.id}`} key={anime?.id}>
            <AnimeCard anime={anime} />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default AnimeList