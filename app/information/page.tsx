import { Container, VStack } from "@chakra-ui/react"
import AnimeGrid from './AnimeGrid'
import Pagination from './AnimePagination'
import { Suspense } from 'react'
import AnimeGridFallback from './AnimeGridFallback'
import AnimePagination from "./AnimePagination"

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