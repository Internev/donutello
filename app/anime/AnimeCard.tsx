import { GetAnimeListQuery, useGetAnimeListQuery, Media } from "@/graphql/generated/graphql"
import { Button, Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react"

type AnimeMedia = NonNullable<NonNullable<GetAnimeListQuery['Page']>['media']>[number]

const AnimeCard: React.FC<{ anime: any }> = ({ anime }) => {
  return (
    // <Card.Root width={180} height={360}>
    //   <Image
    //     src={anime?.coverImage?.large || ''}
    //     alt={`${anime?.title?.userPreferred} key image`}
    //     rounded="md"
    //     height="180px"
    //   />
    //   <Card.Body gap="2">
    //     <Card.Title>{anime?.title?.userPreferred}</Card.Title>
    //     <Card.Description>
    //       {anime?.type}
    //     </Card.Description>
    //     {/* <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
    //       $450
    //     </Text> */}
    //   </Card.Body>
    //   <Card.Footer gap="2">
    //     {/* <Button variant="solid">Buy now</Button>
    //     <Button variant="ghost">Add to cart</Button> */}
    //     Footer
    //   </Card.Footer>
    // </Card.Root>
    <Card maxW='sm'>
      <CardBody>
        <Image
          src={anime?.coverImage?.large || ''}
          alt={`${anime?.title?.userPreferred} key image`}
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{anime?.title?.userPreferred}</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design with a
            sprinkle of vintage design.
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            $450
          </Text>
        </Stack>
      </CardBody>
      {/* <Divider /> */}
      {/* <CardFooter>
      <ButtonGroup spacing='2'>
        <Button variant='solid' colorScheme='blue'>
          Buy now
        </Button>
        <Button variant='ghost' colorScheme='blue'>
          Add to cart
        </Button>
      </ButtonGroup>
    </CardFooter> */}
    </Card>
  )
}

export default AnimeCard


