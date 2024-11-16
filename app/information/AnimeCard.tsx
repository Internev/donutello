import { GetAnimeListQuery } from "@/graphql/generated/graphql"
import { Card, CardBody, Image, Stack, Text, Box, Tooltip, useColorModeValue } from "@chakra-ui/react"

type AnimeMedia = NonNullable<NonNullable<GetAnimeListQuery['Page']>['media']>[number]

/**
 * Card component displaying summary information for an anime entry.
 * 
 * Features:
 * - Fixed dimensions (250px × 400px)
 * - Cover image with hover overlay
 * - Popular anime indicator (⭐️) for entries with 5000+ favorites
 * - Rating display with color coding (green/yellow/red)
 * - Title truncation for long names (>50 chars)
 * 
 * @param {Object} props
 * @param {AnimeMedia} props.anime - Anime data object from AniList API
 * 
 * @example
 * <AnimeCard anime={animeData} />
 * 
 * @remarks
 * - Hover overlay shows additional information (type, rating, favorites, date)
 * - Color-coded ratings: green (≥75%), yellow (≥50%), red (<50%)
 * - Responsive image handling with fallback support
 */

const makeNiceDate = (startYear: string, endYear: string) => {
  if (startYear === endYear) {
    return startYear
  }
  return `${startYear} - ${endYear}`
}

const makeNiceRating = (rating: number) => {
  const getColor = (score: number) => {
    if (score >= 75) return 'green.400'
    if (score >= 50) return 'yellow.400'
    return 'red.400'
  }

  return <Text color={getColor(rating)} fontWeight="semibold">Rating: {rating}%</Text>
}

const AnimeCard: React.FC<{ anime: AnimeMedia }> = ({ anime }) => {
  const showDate = makeNiceDate(anime?.startDate?.year?.toString() || '', anime?.endDate?.year?.toString() || '')
  const isPopular = (anime?.favourites || 0) > 5000

  // Theme colors
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const starBg = useColorModeValue('yellow.100', 'yellow.900')
  const starColor = useColorModeValue('yellow.500', 'yellow.200')

  return (
    <Card
      maxW='sm'
      height='400px'
      width='100%'
      variant='outline'
      borderColor={cardBorder}
      bg={cardBg}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
    >
      <CardBody position="relative" overflow="hidden" role="group">
        <Box position="relative">
          <Image
            height='320px'
            width='100%'
            objectFit='cover'
            src={anime?.coverImage?.large || ''}
            alt={anime?.title?.userPreferred || 'Anime cover'}
            borderRadius='lg'
            fallbackSrc="https://via.placeholder.com/250x320?text=Loading..."
          />

          {/* Popular Star */}
          {isPopular && (
            <Tooltip
              label="5000+ favourites!"
              placement="top"
              hasArrow
              bg={starBg}
              color={starColor}
            >
              <Box
                position="absolute"
                top={2}
                right={2}
                borderRadius="full"
                p={2}
                bg="rgba(255, 255, 255, 0.9)"
                backdropFilter="blur(4px)"
                transform="rotate(0deg)"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'rotate(180deg)',
                  bg: 'rgba(255, 255, 255, 1)'
                }}
              >
                <Text fontSize="xl">⭐️</Text>
              </Box>
            </Tooltip>
          )}

          {/* Hover Overlay */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="70%"
            bgGradient="linear(to-t, blackAlpha.900, blackAlpha.700, transparent)"
            opacity={0}
            transition="all 0.3s ease"
            _groupHover={{ opacity: 1 }}
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={4}
            borderBottomRadius='lg'
          >
            <Stack spacing={2}>
              <Text color="white" fontWeight="medium">{anime?.type}</Text>
              {makeNiceRating(anime?.averageScore || 50)}
              <Text color="white" fontSize="sm">♥ {anime?.favourites?.toLocaleString()}</Text>
              <Text color="white" fontSize="sm" opacity={0.8}>{showDate}</Text>
            </Stack>
          </Box>
        </Box>

        <Stack mt="1" spacing="1">
          <Text
            color={textColor}
            fontSize="md"
            fontWeight="medium"
            noOfLines={2}
          >
            {anime?.title?.userPreferred}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default AnimeCard