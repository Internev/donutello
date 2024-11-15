"use client"

import { HttpLink } from "@apollo/client"
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support"
import { Provider as ChakraProvider } from "@/components/ui/provider"

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://graphql.anilist.co'
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient} >
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </ApolloNextAppProvider>
  )
}