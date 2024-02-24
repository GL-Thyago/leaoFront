import { useRouter } from 'next/router';
import FooterJSX from '../../components/Footer'
import Navbar from '../../components/Navbar/Navbar'
import { Box, Grid, GridItem, useColorMode, VStack } from '@chakra-ui/react'
import useAuth from '@/contexts/AuthContext';


export default function RootLayout ({ children }) {
  const router = useRouter();
  // const { colorMode } = useColorMode()
  const { isAuthenticated } = useAuth();
  return (
    <Grid
  templateAreas={`"header header"
                  "body body"
                  "footer footer"
                  `}
  gridTemplateRows={'70px 1fr'}
  // gridTemplateColumns={'150px 1fr'}
  // h='200px'
  w={'100vw'}
  h={'100vh'}
  gap='1'
  color={''}
  backgroundColor={'whiteAlpha.800'}
  fontWeight='bold'
>
<GridItem area={'header'} w={'100vw'}>
  <Navbar />
</GridItem>

<GridItem
area={'body'}
w={'100vw'}
display={'flex'}
flexDirection={'column'}
backgroundColor={
  isAuthenticated ||
  router.route === '/apply'
  
  ? '#f5f6f8' : '#fff'}
justifyContent={
  router.route === '/billing' ? 'flex-start' :
  'center'}
>
      {children}
</GridItem>

<GridItem area={'footer'}
backgroundColor={'#000'}
>
{
router.route === '/login' || 
router.route === '/recover_password' ||
router.route === '/dashboard' ||
router.route === '/plans' ||
router.route === '/billing' ||
router.route === '/profile' 
?

null : <FooterJSX />}

</GridItem>


</Grid>
  )
}
