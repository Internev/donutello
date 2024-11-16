import AnimeDetails from "@/app/information/AnimeDetails"
import DetailsModal from "./DetailsModal"
import AnimeDetailsSkeleton from "@/app/information/AnimeDetailsFallback"
import { Suspense } from "react"

const AnimeDetailsPage = () => {
  return (
    <DetailsModal>
      <Suspense fallback={<AnimeDetailsSkeleton />}>
        <AnimeDetails />
      </Suspense>
    </DetailsModal>
  )
}

export default AnimeDetailsPage