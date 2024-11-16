import { Button, ButtonGroup, Flex, Skeleton } from '@chakra-ui/react'
import { visiblePages } from './AnimePagination'

const PaginationSkeleton: React.FC = () => {
  return (
    <Flex justify="center" align="center" mt={4}>
      <ButtonGroup spacing={2} variant="outline">
        {/* Prev button skeleton */}
        <Skeleton>
          <Button aria-label="Previous page">
            {'<'}
          </Button>
        </Skeleton>

        {/* Page number buttons skeletons */}
        {Array.from({ length: visiblePages }, (_, i) => (
          <Skeleton key={i}>
            <Button aria-label={`Page ${i + 1}`}>
              {i + 1}
            </Button>
          </Skeleton>
        ))}

        {/* Next button skeleton */}
        <Skeleton>
          <Button aria-label="Next page">
            {'>'}
          </Button>
        </Skeleton>
      </ButtonGroup>
    </Flex>
  )
}

export default PaginationSkeleton