'use client'

import AnimeDetails from "@/app/information/AnimeDetails"
import AnimeDetailsSkeleton from "@/app/information/AnimeDetailsFallback"
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Suspense, useEffect, useState } from "react"

const AnimeDetailsPage = () => {
  // Only render on client side
  // hack to make the suspense stop
  // complaining about hydration issues.
  // I wouldn't do this in a real app.
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Box
      as="main"
      bg={useColorModeValue('gray.50', 'gray.900')}
      minH="calc(100vh - 64px)"
    >
      {isMounted ? (
        <Suspense fallback={<AnimeDetailsSkeleton />}>
          <AnimeDetails />
        </Suspense>
      ) : (
        <AnimeDetailsSkeleton />
      )}
    </Box>
  )
}

export default AnimeDetailsPage