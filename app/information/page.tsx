import { Container, VStack } from "@chakra-ui/react"
import AnimeGrid from './AnimeGrid'
import Pagination from './AnimePagination'
import { Suspense } from 'react'
import AnimeGridFallback from './AnimeGridFallback'
import AnimePagination from "./AnimePagination"

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Discover Anime | Donutello",
  description: "Explore a curated collection of anime series. Find your next favorite show with Donutello's extensive library.",
  openGraph: {
    title: "Discover Anime | Donutello",
    description: "Explore a curated collection of anime series",
    images: [
      {
        url: "/donutV.jpg", // I don't have any other images 🤷
        width: 1200,
        height: 630,
        alt: "Donutello Anime Collection"
      }
    ]
  }
}

const Information = () => {

  return (
    <Container maxW={'6xl'}>
      <VStack spacing={8} width="100%">
        {/* Pagination above grid */}
        <Suspense fallback={<AnimePagination />}>
          <Pagination />
        </Suspense>

        {/* Grid of anime cards */}
        <Suspense fallback={<AnimeGridFallback />}>
          <AnimeGrid />
        </Suspense>
      </VStack>
    </Container>
  )
}

export default Information