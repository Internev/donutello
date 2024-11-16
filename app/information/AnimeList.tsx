'use client'

import { useGetAnimeListSuspenseQuery } from '@/graphql/generated/graphql'
import AnimeCard from './AnimeCard'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Anilist API wasn't too robust...
// import { response } from '@/app/dummy'
// const { data } = response

const AnimeList = () => {
  const searchParams = useSearchParams()
  let page = searchParams.get('page')

  const { data, error } = useGetAnimeListSuspenseQuery({
    variables: { offset: page ? parseInt(page) - 1 : 0 },
  })

  const animeList = data?.Page?.media
  return animeList?.map((anime) => (
    <Link href={`/information/details/${anime?.id}`} as={`/information/details/${anime?.id}`} key={anime?.id}>
      <AnimeCard anime={anime} />
    </Link>
  ))
}

export default AnimeList