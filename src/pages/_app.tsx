import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
import { createUrlqClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
          initialColorMode: 'dark',
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

// Set ssr to false to switch to client side rendering
export default withUrqlClient(createUrlqClient, { ssr: false })(MyApp)
