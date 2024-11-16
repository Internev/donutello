'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button, ButtonGroup, Flex, useColorModeValue, Text } from '@chakra-ui/react'
import { useGetAnimeListSuspenseQuery } from '@/graphql/generated/graphql'

export const visiblePages = 5

/**
 * A paginated navigation component for browsing anime listings.
 * 
 * Features:
 * - Displays a configurable number of page buttons (default: 5)
 * - Previous/Next navigation buttons
 * - Automatically adjusts visible page numbers based on current page
 * - Updates URL query parameters for page state
 * - Uses suspense-enabled query for anime list data
 * 
 * @example
 * <AnimePagination />
 * 
 * @remarks
 * - Relies on URL search params for page state
 * - Uses Apollo Client cache to avoid redundant queries
 * - Accessibility: Includes ARIA labels and current page indicators
 */

const Pagination = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')

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

  // Theme colors
  const buttonBg = useColorModeValue('white', 'gray.800')
  const buttonBorder = useColorModeValue('gray.200', 'gray.600')
  const activeButtonBg = 'brand.pink.400'
  const activeButtonColor = 'white'
  const buttonHoverBg = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Flex
      justify="center"
      align="center"
      mt={4}
      mb={4}
      flexDir="column"
      gap={3}
    >
      <ButtonGroup
        spacing="2"
        variant="outline"
        bg={useColorModeValue('white', 'gray.800')}
        p={2}
        borderRadius="lg"
        boxShadow="sm"
      >
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage <= 1}
          aria-label="Previous page"
          bg={buttonBg}
          borderColor={buttonBorder}
          _hover={{ bg: buttonHoverBg }}
        >
          {'<'}
        </Button>

        {getPageNumbers().map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            bg={currentPage === page ? activeButtonBg : buttonBg}
            color={currentPage === page ? activeButtonColor : undefined}
            borderColor={buttonBorder}
            _hover={currentPage === page ?
              { bg: 'brand.pink.500' } :
              { bg: buttonHoverBg }
            }
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
          bg={buttonBg}
          borderColor={buttonBorder}
          _hover={{ bg: buttonHoverBg }}
        >
          {'>'}
        </Button>
      </ButtonGroup>

      <Text
        color={textColor}
        fontSize="sm"
        fontWeight="medium"
      >
        Page {currentPage} of {totalPages}
      </Text>
    </Flex>
  )
}

export default Pagination