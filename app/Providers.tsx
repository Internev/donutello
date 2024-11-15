"use client"

import { HttpLink } from "@apollo/client"
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support"
import { ChakraProvider, extendTheme, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react'

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://graphql.anilist.co'
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

const customTheme = extendTheme(withDefaultColorScheme({ colorScheme: 'pink' }))

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient} >
      <ChakraProvider theme={customTheme}>
        {children}
      </ChakraProvider>
    </ApolloNextAppProvider>
  )
}