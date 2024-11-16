"use client"

import { HttpLink } from "@apollo/client"
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support"
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://graphql.anilist.co'
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })
}

// Color palette based on the donut theme
const colors = {
  brand: {
    // Pink from the donut icing
    pink: {
      50: '#FFF5F7',
      100: '#FED7E2',
      200: '#FBB6CE',
      300: '#F687B3',
      400: '#ED64A6',  // This is our primary pink
      500: '#D53F8C',
      600: '#B83280',
      700: '#97266D',
      800: '#702459',
      900: '#521B41',
    },
    // Cream/brown from the dojo
    cream: {
      50: '#FFF8F1',
      100: '#FEEBC8',
      200: '#FBD38D',
      300: '#F6AD55',
      400: '#ED8936',
      500: '#DD6B20',
      600: '#C05621',
      700: '#9C4221',
      800: '#7B341E',
      900: '#652B19',
    },
  },
}

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

// Component style overrides
const components = {
  Button: {
    defaultProps: {
      colorScheme: 'brand.pink',
    },
    variants: {
      solid: (props: any) => ({
        bg: 'brand.pink.400',
        color: 'white',
        _hover: {
          bg: 'brand.pink.500',
        },
        _active: {
          bg: 'brand.pink.600',
        },
      }),
    },
  },
  Heading: {
    baseStyle: {
      color: 'brand.pink.400',
    },
  },
  Card: {
    variants: {
      outline: {
        container: {
          borderColor: 'gray.200',
          _dark: {
            borderColor: 'gray.700',
          },
        },
      },
    },
  },
}

// Create the custom theme
const customTheme = extendTheme({
  colors,
  config,
  components,
  fonts: {
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
      },
    }),
  },
})

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <ChakraProvider theme={customTheme}>
        {children}
      </ChakraProvider>
    </ApolloNextAppProvider>
  )
}