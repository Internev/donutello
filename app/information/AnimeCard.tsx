import { GetAnimeListQuery, useGetAnimeListQuery, Media } from "@/graphql/generated/graphql"
import { Button, Card, CardBody, CardFooter, Heading, Image, Popover, PopoverContent, PopoverTrigger, Show, Stack, Text } from "@chakra-ui/react"

type AnimeMedia = NonNullable<NonNullable<GetAnimeListQuery['Page']>['media']>[number]

const makeNiceDate = (startYear: string, endYear: string) => {
  if (startYear === endYear) {
    return startYear
  }
  return `${startYear} - ${endYear}`
}

const makeNiceRating = (rating: number) => {
  const color = rating >= 75 ? 'green.500' : rating >= 50 ? 'yellow.500' : 'red.500'
  return <Text color={color}>Average Rating: {rating}%</Text>
}

const AnimeCard: React.FC<{ anime: any }> = ({ anime }) => { // TODO: max sure I turn types back on for deployment!
  const showDate = makeNiceDate(anime.startDate?.year || '', anime.endDate?.year || '')

  const CardDisplay = () => {
    return (
      <CardBody>
        <Image
          height={'320px'}
          src={anime?.coverImage?.large || ''}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='2' spacing='3'>
          <Text>
            {anime?.title.userPreferred.length > 50 ? `${anime?.title.userPreferred.substring(0, 47)}...` : anime?.title.userPreferred}
          </Text>
        </Stack>
      </CardBody>
    )
  }

  return (
    <Card maxW='sm' height={'400px'} variant={'unstyled'}>
      <Show above="md">
        <Popover
          trigger="hover"
          placement="right-start"
          gutter={4}
        >
          <PopoverTrigger>
            <CardDisplay />
          </PopoverTrigger>
          <PopoverContent>
            <Stack spacing='3' p={3}>
              <Text>{anime?.type}</Text>
              {makeNiceRating(anime?.averageScore)}
              <Text>Favourites: {anime?.favourites}</Text>
              <Text>{showDate}</Text>
              <Button variant="ghost">View Details</Button>
            </Stack>
          </PopoverContent>
        </Popover>
      </Show>
      <Show below="md">
        <CardDisplay />
      </Show>
    </Card >
  )
}

export default AnimeCard
