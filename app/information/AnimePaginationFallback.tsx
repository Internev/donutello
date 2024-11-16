import { ButtonGroup, Flex, Skeleton } from '@chakra-ui/react'
import { visiblePages } from './AnimePagination'

const PaginationSkeleton = () => {
  return (
    <Flex justify="center" align="center" mt={4} mb={4}>
      <ButtonGroup
        spacing="2"
        variant="outline"
        p={2}
        borderRadius="lg"
        boxShadow="sm"
      >
        {/* Prev button skeleton */}
        <Skeleton
          height="40px"
          width="40px"
          borderRadius="md"
        />

        {/* Page number buttons skeletons */}
        {Array.from({ length: visiblePages }, (_, i) => (
          <Skeleton
            key={i}
            height="40px"
            width="40px"
            borderRadius="md"
          />
        ))}

        {/* Next button skeleton */}
        <Skeleton
          height="40px"
          width="40px"
          borderRadius="md"
        />
      </ButtonGroup>
    </Flex>
  )
}

export default PaginationSkeleton