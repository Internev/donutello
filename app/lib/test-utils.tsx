import { ChakraProvider } from '@chakra-ui/react'
import { render } from '@testing-library/react'

import { ReactNode } from 'react'

const AllProviders = ({ children }: { children: ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
)

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }