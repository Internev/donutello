import AnimeDetails from "@/app/information/AnimeDetails"
import { Suspense } from "react"
import AnimeDetailsSkeleton from "@/app/information/AnimeDetailsFallback"

const AnimeDetailsPage = () => {
  return (
    <Suspense fallback={<AnimeDetailsSkeleton />}>
      <AnimeDetails />
    </Suspense>
  )
}

export default AnimeDetailsPage