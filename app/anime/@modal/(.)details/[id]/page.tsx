'use client'

import { GetAnimeListQuery, useGetAnimeListQuery, Media } from "@/graphql/generated/graphql"
import { Button, Card, Image, Text } from "@chakra-ui/react"
import { useSearchParams, usePathname } from 'next/navigation'
import DetailsModal from "./DetailsModal"

type AnimeMedia = NonNullable<NonNullable<GetAnimeListQuery['Page']>['media']>[number]

const AnimeDetails: React.FC<{ id: string }> = ({ id }) => {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  console.log('searchParams', searchParams)
  console.log('pathName', pathName)
  return (
    <DetailsModal active>
      <div>hi modal</div>
    </DetailsModal>
  )
}

export default AnimeDetails
