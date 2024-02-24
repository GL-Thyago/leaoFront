import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '@/contexts/AuthContext'
import RootLayout from '../../layouts/RootLayout/RootLayout'
import theme from '../contexts/_theme'

export default function App ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
      </AuthProvider>  
    </ChakraProvider>
  )
}
