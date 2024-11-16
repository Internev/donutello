'use client'

import { useGetAnimeListQuery } from '@/graphql/generated/graphql'
import { Container, SimpleGrid } from "@chakra-ui/react"
import AnimeList from './AnimeList'
import { Suspense } from 'react'
import AnimeListFallback from './AnimeListFallback'

// Anilist API wasn't too robust...
// import { response } from '@/app/dummy'
// const { data } = response

const Information = () => {
  return (
    <Container maxW={'6xl'}>
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3, lg: 3, xl: 4 }}
        mb={20}
        gap="40px"
      >
        <Suspense fallback={<AnimeListFallback />}>
          <AnimeList />
        </Suspense>
      </SimpleGrid>
    </Container>
  )
}

export default Information