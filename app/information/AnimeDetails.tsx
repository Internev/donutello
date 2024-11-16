'use client'

import { GetAnimeQuery, useGetAnimeSuspenseQuery } from "@/graphql/generated/graphql"
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Tag,
  VStack,
} from '@chakra-ui/react'
import { useRouter, usePathname } from 'next/navigation'

type AnimeMedia = NonNullable<GetAnimeQuery['Media']>

const CharacterList = ({ characters }: { characters: AnimeMedia['characters'] }) => {

  const bgCard = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  if (!characters?.nodes) return null

  return (
    <Box>
      <Heading
        size="md"
        mb={4}
        color="brand.pink.400"
      >
        Characters
      </Heading>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4 }}
        spacing={4}
      >
        {characters.nodes
          .slice(0, 12)
          .map((character) => (
            <Box
              key={character?.id}
              p={3}
              bg={bgCard}
              borderRadius="md"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
            >
              <Text fontSize="sm" fontWeight="medium">
                {character?.name?.userPreferred}
              </Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  )
}

const TagList = ({ tags }: { tags: AnimeMedia['tags'] }) => {
  if (!tags) return null

  return (
    <Box>
      <Heading
        size="md"
        mb={4}
        color="brand.pink.400"
      >
        Tags
      </Heading>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4 }}
        spacing={2}
      >
        {tags.map((tag) => (
          <Tag
            key={tag?.id}
            size="md"
            variant="subtle"
            colorScheme="pink"
            justifyContent="center"
          >
            {tag?.name}
          </Tag>
        ))}
      </SimpleGrid>
    </Box>
  )
}

const AnimeStats = ({ anime }: { anime: AnimeMedia }) => {
  const bgBox = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={4}
      mb={8}
    >
      <Box
        p={4}
        bg={bgBox}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <VStack>
          <Text fontWeight="bold">{anime?.favourites?.toLocaleString()}</Text>
          <Text fontSize="sm" color="gray.500">Favorites</Text>
        </VStack>
      </Box>
      <Box
        p={4}
        bg={bgBox}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <VStack>
          <Text fontWeight="bold">{anime?.averageScore}%</Text>
          <Text fontSize="sm" color="gray.500">Rating</Text>
        </VStack>
      </Box>
      <Box
        p={4}
        bg={bgBox}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        gridColumn={{ base: '1/3', md: 'auto' }}
      >
        <VStack>
          <Text fontWeight="bold">
            {anime?.startDate?.year || 'TBA'}
            {anime?.endDate?.year && anime?.endDate?.year !== anime?.startDate?.year
              ? ` - ${anime?.endDate?.year}`
              : ''}
          </Text>
          <Text fontSize="sm" color="gray.500">Year</Text>
        </VStack>
      </Box>
    </SimpleGrid>
  )
}

const AnimeDetails = () => {
  const pathName = usePathname()
  const id = pathName.split('/').pop()
  const router = useRouter()

  const bgBox = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.700', 'gray.300')

  if (!id || isNaN(Number(id))) {
    router.push('/information')
  }

  const { data } = useGetAnimeSuspenseQuery({ variables: { id: Number(id) } })
  const anime = data?.Media

  const sanitizeDescription = (description: string) => {
    return description.replace(/<[^>]*>?/gm, '')
  }

  if (!id || isNaN(Number(id))) {
    return null
  }
  return (
    <Container maxW="7xl" py={8}>
      {/* Banner Image */}
      <Box
        position="relative"
        mb={8}
        borderRadius="xl"
        overflow="hidden"
      >
        <Image
          src={anime?.bannerImage || ''}
          alt={`${anime?.title?.userPreferred} banner`}
          objectFit="cover"
        />
      </Box>

      {/* Title and Stats */}
      <VStack spacing={6} align="stretch">
        <Heading
          size="2xl"
          color="brand.pink.400"
        >
          {anime?.title?.userPreferred}
        </Heading>

        {anime && <AnimeStats anime={anime} />}

        {/* Description */}
        <Box
          p={6}
          bg={bgBox}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Text
            fontSize="lg"
            color={textColor}
            lineHeight="tall"
          >
            {sanitizeDescription(anime?.description || '')}
          </Text>
        </Box>

        {/* Characters and Tags */}
        <Stack
          spacing={8}
          divider={<StackDivider borderColor={borderColor} />}
        >
          <CharacterList characters={anime?.characters} />
          <TagList tags={anime?.tags} />
        </Stack>

        {/* Action Button */}
        <Button
          size="lg"
          width="full"
          colorScheme="pink"
          _hover={{
            transform: 'translateY(-2px)',
            shadow: 'lg',
          }}
        >
          Add to favorites
        </Button>
      </VStack>
    </Container>
  )
}

export default AnimeDetails