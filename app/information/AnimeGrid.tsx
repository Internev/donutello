'use client'

import { useGetAnimeListSuspenseQuery } from '@/graphql/generated/graphql'
import AnimeCard from './AnimeCard'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { SimpleGrid } from '@chakra-ui/react'

// Anilist API wasn't too robust...
// import { response } from '@/app/dummy'
// const { data } = response

// When fetching more data, the suspense isn't shown.
// I went back and forth on whether it's better UX
// to remain on the same page or to show the skeleton.
// The suspense query doesn't seem to provide a "pending"
// and I couldn't find a nice way to show a little spinner
// on more data fetch, though I'm sure there is one.
const AnimeGrid = () => {
  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const currentPage = page ? parseInt(page) : 1
  const { data } = useGetAnimeListSuspenseQuery({
    variables: { offset: currentPage - 1 },
  })

  const animeList = data?.Page?.media

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 3, lg: 3, xl: 4 }}
      gap="40px"
      width="100%"
    >
      {animeList?.map((anime) => (
        <Link
          href={`/information/details/${anime?.id}`}
          key={anime?.id}
        >
          <AnimeCard anime={anime} />
        </Link>
      ))}
    </SimpleGrid>
  )
}

export default AnimeGrid