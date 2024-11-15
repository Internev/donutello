import { GetAnimeListQuery, useGetAnimeListQuery, Media } from "@/graphql/generated/graphql"
import { Button, Card, Image, Text } from "@chakra-ui/react"

type AnimeMedia = NonNullable<NonNullable<GetAnimeListQuery['Page']>['media']>[number]

const AnimeDetails: React.FC<{ anime: AnimeMedia }> = ({ anime }) => {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image
        src={anime?.coverImage?.medium || ''}
        alt={`${anime?.title?.userPreferred} key image`}
      />
      <Card.Body gap="2">
        <Card.Title>{anime?.title?.userPreferred}</Card.Title>
        <Card.Description>
          {anime?.type}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {anime?.startDate?.year}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        {/* <Button variant="solid">Buy now</Button>
        <Button variant="ghost">Add to cart</Button> */}
      </Card.Footer>
    </Card.Root>
  )
}

export default AnimeDetails


