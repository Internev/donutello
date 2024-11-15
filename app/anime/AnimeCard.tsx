import { GetAnimeListQuery, useGetAnimeListQuery, Media } from "@/graphql/generated/graphql"
import { Button, Card, Image, Text } from "@chakra-ui/react"

type AnimeMedia = NonNullable<NonNullable<GetAnimeListQuery['Page']>['media']>[number]

const AnimeCard: React.FC<{ anime: any }> = ({ anime }) => {
  return (
    <Card.Root width={180} height={360}>
      <Image
        src={anime?.coverImage?.large || ''}
        alt={`${anime?.title?.userPreferred} key image`}
        rounded="md"
        height="180px"
      />
      <Card.Body gap="2">
        <Card.Title>{anime?.title?.userPreferred}</Card.Title>
        <Card.Description>
          {anime?.type}
        </Card.Description>
        {/* <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $450
        </Text> */}
      </Card.Body>
      <Card.Footer gap="2">
        {/* <Button variant="solid">Buy now</Button>
        <Button variant="ghost">Add to cart</Button> */}
      </Card.Footer>
    </Card.Root>
  )
}

export default AnimeCard


