import { GetAnimeListQuery } from "@/graphql/generated/graphql"
import { Card, CardBody, Image, Stack, Text, Box, Tooltip } from "@chakra-ui/react"

/**
 * Card component displaying summary information for an anime entry.
 * 
 * Features:
 * - A/B testing: Popular anime indicator (⭐️) for entries with 5000+ favorites
 * - Fixed dimensions (250px × 400px)
 * - Cover image with hover overlay
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

export type AnimeMedia = NonNullable<NonNullable<GetAnimeListQuery['Page']>['media']>[number]

const makeNiceDate = (startYear: string, endYear: string) => {
  if (startYear === endYear) {
    return startYear
  }
  return `${startYear} - ${endYear}`
}

const makeNiceRating = (rating: number) => {
  const color = rating >= 75 ? 'green.400' : rating >= 50 ? 'yellow.400' : 'red.400'
  return <Text color={color} fontWeight="bold">Rating: {rating}%</Text>
}

const AnimeCard: React.FC<{ anime: AnimeMedia, testGroup: 'A' | 'B' }> = ({ anime, testGroup }) => {
  const showDate = makeNiceDate(anime?.startDate?.year?.toString() || '', anime?.endDate?.year?.toString() || '')
  const isPopular = (anime?.favourites || 0) > 5000

  return (
    <Card maxW='sm' height={'400px'} width={'250px'} variant={'unstyled'}>
      <CardBody position="relative" overflow="hidden" role="group">
        <Box position="relative">
          <Image
            height={'320px'}
            width={'250px'}
            objectFit={'cover'}
            src={anime?.coverImage?.large || ''}
            alt={anime?.title?.userPreferred || 'Anime cover'}
            borderRadius='lg'
          />

          {/* Popular Star - Only shown to group B */}
          {isPopular && testGroup === 'B' && (
            <Tooltip
              label="5000+ favourites!"
              placement="top"
              hasArrow
              bg="yellow.400"
              color="black"
            >
              <Box
                position="absolute"
                top={2}
                right={2}
                borderRadius="full"
                p={2}
                transform="rotate(0deg)"
                transition="transform 0.3s ease"
                _hover={{ transform: 'rotate(180deg)' }}
              >
                <Text>⭐️</Text>
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
            bgGradient="radial(circle at bottom left, blackAlpha.800, transparent 68%)"
            opacity={0}
            transition="all 0.2s"
            _groupHover={{ opacity: 1 }}
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={4}
            borderBottomRadius='lg'
          >
            <Stack spacing={1}>
              <Text color="white">{anime?.type}</Text>
              {makeNiceRating(anime?.averageScore || 50)}
              <Text color="white">♥ {anime?.favourites?.toLocaleString()}</Text>
              <Text color="white" fontSize="sm">{showDate}</Text>
            </Stack>
          </Box>
        </Box>

        <Stack mt="2" spacing="3">
          <Text>
            {anime?.title?.userPreferred?.length &&
              anime?.title?.userPreferred?.length > 50
              ? `${anime?.title?.userPreferred?.substring(0, 47)}...`
              : anime?.title?.userPreferred}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default AnimeCard