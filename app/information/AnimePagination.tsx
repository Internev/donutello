'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button, ButtonGroup, Flex } from '@chakra-ui/react'
import { useGetAnimeListSuspenseQuery } from '@/graphql/generated/graphql'

export const visiblePages = 5

const Pagination: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')

  // I believe that reusing the query here will be more efficient
  // because Apollo will figure out that the query is already in the cache
  // and do something tricky to avoid the race condition.
  const { data } = useGetAnimeListSuspenseQuery({
    variables: { offset: 0 },
  })

  const totalPages = data?.Page?.pageInfo?.total || 33

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2))
    const endPage = Math.min(startPage + visiblePages - 1, totalPages)

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1)
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    )
  }

  return (
    <Flex justify="center" align="center" mt={4}>
      <ButtonGroup spacing={2} variant="outline">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage <= 1}
          aria-label="Previous page"
        >
          {'<'}
        </Button>

        {getPageNumbers().map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            colorScheme={currentPage === page ? 'blue' : 'gray'}
            variant={currentPage === page ? 'solid' : 'outline'}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          {'>'}
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

export default Pagination