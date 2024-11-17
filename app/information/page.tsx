import { Container, VStack } from "@chakra-ui/react"
import AnimeGrid from './AnimeGrid'
import Pagination from './AnimePagination'
import { Suspense } from 'react'
import AnimeGridFallback from './AnimeGridFallback'
import AnimePagination from "./AnimePagination"

import type { Metadata } from 'next'
import { auth } from "@/auth"

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

// Simple function to get roughly 50/50 test group based on user ID
const getTestGroup = (userId: string) => {
  // Take first 4 chars of userId and sum their char codes
  const sum = userId.slice(0, 4).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  // This will give us a pretty even 50/50 split
  return sum % 2 === 0 ? 'A' : 'B'
}

const Information = async () => {
  const session = await auth()
  const userId = session?.user?.id || null
  const testGroup = userId ? getTestGroup(userId) : 'A'

  return (
    <Container maxW={'6xl'}>
      <VStack spacing={8} width="100%">
        {/* Pagination above grid */}
        <Suspense fallback={<AnimePagination />}>
          <Pagination />
        </Suspense>

        {/* Grid of anime cards */}
        <Suspense fallback={<AnimeGridFallback />}>
          <AnimeGrid testGroup={testGroup} />
        </Suspense>
      </VStack>
    </Container>
  )
}

export default Information