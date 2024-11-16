'use client'

import { useGetAnimeListQuery } from '@/graphql/generated/graphql'
import { Container, SimpleGrid } from "@chakra-ui/react"
import AnimeCard from './AnimeCard'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Anilist API wasn't too robust...
// import { response } from '@/app/dummy'
// const { data } = response

const AnimeList = () => {
  const searchParams = useSearchParams()
  let page = searchParams.get('page')

  // if (!page) {
  //   const url = new URL(window.location.href)
  //   url.searchParams.set('page', '1')
  //   window.history.replaceState(null, '', url.toString())
  //   page = '1'
  // }
  const { data, error, loading, fetchMore } = useGetAnimeListQuery({
    variables: { offset: page ? parseInt(page) - 1 : 0 }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  console.log('data', data)

  const animeList = data?.Page?.media
  return (
    <Container maxW={'6xl'}>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3, lg: 3, xl: 4 }}
        mb={20}
        gap="40px"
      >
        {animeList?.map((anime) => (
          <Link href={`/information/details/${anime?.id}`} as={`/information/details/${anime?.id}`} key={anime?.id}>
            <AnimeCard anime={anime} />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default AnimeList