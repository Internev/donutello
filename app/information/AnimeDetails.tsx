'use client'

import { useGetAnimeQuery, GetAnimeQuery, useGetAnimeSuspenseQuery } from "@/graphql/generated/graphql"
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Card,
  CardBody,
  Tag,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

type AnimeDetails = NonNullable<GetAnimeQuery['Media']>

const CharacterList: React.FC<{ characters: AnimeDetails['characters'] }> = ({ characters }) => {
  // It'd be neat to link to the character's page here
  if (!characters?.nodes) return null
  return (
    <Box>
      <Text
        fontSize={{ base: '16px', lg: '18px' }}
        color={useColorModeValue('yellow.500', 'yellow.300')}
        fontWeight={'500'}
        textTransform={'uppercase'}
        mb={'4'}>
        Characters
      </Text>
      <SimpleGrid columns={{ base: 2, md: 3 }}>
        {characters.nodes && characters.nodes
          .slice(0, 12)
          .map((character) => {
            return (
              <Card variant={'unstyled'} key={character?.id}>
                <CardBody>
                  <Text>{character?.name?.userPreferred}</Text>
                </CardBody>
              </Card>
            )
          }
          )}
      </SimpleGrid>
    </Box>
  )
}

const TagList: React.FC<{ tags: AnimeDetails['tags'] }> = ({ tags }) => {
  if (!tags) return null
  return (
    <Box>
      <Text
        fontSize={{ base: '16px', lg: '18px' }}
        color={useColorModeValue('yellow.500', 'yellow.300')}
        fontWeight={'500'}
        textTransform={'uppercase'}
        mb={'4'}>
        Tags
      </Text>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
        {tags.map((tag) => {
          return (
            <Tag>{tag?.name}</Tag>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

const AnimeDetails: React.FC = () => {
  const pathName = usePathname()
  const id = pathName.split('/').pop()

  if (!id || isNaN(Number(id))) {
    // I'd do something nicer in real life, like show a timed error message then redirect
    const router = useRouter()
    router.push('/information')
    return null
  }
  const { data } = useGetAnimeSuspenseQuery({ variables: { id: Number(id) } })

  const sanitizeDescription = (description: string) => {
    return description.replace(/<[^>]*>?/gm, '')
  }

  const anime = data?.Media
  return (
    <Container maxW={'7xl'} py={6}>
      <Flex>
        <Image
          rounded={'md'}
          alt={`${anime?.title?.userPreferred} banner`}
          src={anime?.bannerImage || ''}
          w={'100%'}
        />
      </Flex>
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={'header'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
            {anime?.title?.userPreferred}
          </Heading>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={'column'}
          divider={
            <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
          }>
          <Text fontSize={'lg'}>
            {sanitizeDescription(anime?.description || '')}
          </Text>

          <CharacterList characters={anime?.characters} />
          <TagList tags={anime?.tags} />
        </Stack>

        <Button
          rounded={'none'}
          w={'full'}
          mt={8}
          size={'lg'}
          py={'7'}
          bg={useColorModeValue('gray.900', 'gray.50')}
          color={useColorModeValue('white', 'gray.900')}
          textTransform={'uppercase'}
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}>
          Add to favourites
        </Button>
      </Stack>
    </Container>
  )
}

export default AnimeDetails
