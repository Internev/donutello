'use client'

import { GetAnimeListQuery, useGetAnimeListQuery, Media } from "@/graphql/generated/graphql"
import { Button, Card, Image, Text } from "@chakra-ui/react"
import { useSearchParams } from 'next/navigation'

type AnimeMedia = NonNullable<NonNullable<GetAnimeListQuery['Page']>['media']>[number]

const AnimeDetails: React.FC<{ id: string }> = ({ id }) => {
  const searchParams = useSearchParams()
  console.log('searchParams', searchParams)
  return (
    <div>hi full view</div>
  )
}

export default AnimeDetails


