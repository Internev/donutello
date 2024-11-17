'use client'

import { useGetAnimeListSuspenseQuery } from '@/graphql/generated/graphql'
import AnimeCard from './AnimeCard'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { SimpleGrid, Container } from '@chakra-ui/react'

/**
 * Displays a responsive grid of anime cards with data from the AniList API.
 * 
 * Features:
 * - Responsive layout (1-4 columns based on viewport)
 * - Suspense-enabled data fetching
 * - Pagination support via URL parameters
 * - Links to detailed view for each anime
 * 
 * @example
 * <Suspense fallback={<AnimeGridFallback />}>
 *   <AnimeGrid />
 * </Suspense>
 * 
 * @remarks
 * - Grid layout adjusts columns based on breakpoints: base(1), md(3), xl(4)
 * - Handles page-based data fetching using URL search params
 */

const AnimeGrid = ({ testGroup }: { testGroup: 'A' | 'B' }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = searchParams.get('page')
  let currentPage = page ? parseInt(page) : 1
  if (!currentPage || currentPage < 1) {
    currentPage = 1
    router.push('/information?page=1')
  }
  const { data } = useGetAnimeListSuspenseQuery({
    variables: { offset: currentPage - 1 },
  })

  const handleAnimeClick = (animeId: number, testGroup: 'A' | 'B') => {
    // In real implementation, send to analytics service
    // with more detailed information
    console.log('Card click:', {
      animeId,
      testGroup,
      timestamp: new Date().toISOString(),
      event: 'card_click',
      page: currentPage
    })
  }

  const animeList = data?.Page?.media
  return (
    <Container
      maxW="7xl"
      px={{ base: 2, sm: 4, md: 6 }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 4, md: 6 }}
        width="100%"
        justifyItems="center"
      >
        {animeList?.map((anime) => (
          <Link
            href={`/information/details/${anime?.id}`}
            key={anime?.id}
            style={{ width: '100%' }}
            onClick={() => handleAnimeClick(anime?.id || -1, testGroup)}
          >
            <AnimeCard anime={anime} testGroup={testGroup} />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default AnimeGrid