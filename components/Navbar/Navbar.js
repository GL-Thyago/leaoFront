import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
  ButtonGroup,
  Link
} from '@chakra-ui/react'
import { SunIcon, MoonIcon, HamburgerIcon, Icon } from '@chakra-ui/icons'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useRef } from 'react'
import DrawerNavbar from '../Drawer/Drawer'
import { RiDashboardLine } from 'react-icons/ri'
import useAuth from '@/contexts/AuthContext'
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Navbar() {

  const { isAuthenticated, getCart } = useAuth();

  // Hooks
  const router = useRouter()


  // Drawer
  const { isOpen, onOpen, onClose } = useDisclosure()
  const drawerButtonRef = useRef()

  return (
    <HStack id='Navbar' as='nav' justifyContent='center' margin={'auto'} maxW={1420} width='100%'>
      <Box
        id='container'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        padding={8}
        // backgroundColor={colorMode === 'dark' ? 'whiteAlpha.500': 'gray.700'}
        backgroundColor={'#ffff'}
        height='70px'
      >
        <HStack width={'100%'}>
          <HStack id='logo'
            display={
              isAuthenticated ? { base: 'none', md: 'flex' } : { base: 'flex' }}
            onClick={() => router.push('/')} cursor='pointer'>
            <Image
              width={80}
              // src={require('../../public/logo.png')}
              src={require('../../public/logo.png')}

            />
            {/* <Heading
              as='h1'
              size='lg'
              color={'blackAlpha.900'}
              letterSpacing='3.75px'
              textTransform='uppercase'
            >
              Logo
            </Heading> */}
          </HStack>


          {!isAuthenticated && (
            <HStack
              display={'flex'}
              flexDirection={'row'}
              width={'100%'}
              justifyContent={'space-between'}
            >
              <Box display={'flex'}
                ml={'5%'}
                gap={5}
              >
                <Heading
                  cursor='pointer'
                  onClick={() => router.push('/rifas')}
                  size={'xs'}
                  color={'blackAlpha.900'}
                  letterSpacing='0.1px'
                  fontWeight={'700'}
                  textTransform='uppercase'
                >
                  Rifas
                </Heading>

                <Heading
                  cursor='pointer'
                  onClick={() => router.push('/about')}
                  size={'xs'}
                  color={'blackAlpha.900'}
                  letterSpacing='0.1px'
                  fontWeight={'700'}
                  textTransform='uppercase'
                  marginEnd={'20'}
                >
                  Sobre nós
                </Heading>

                <Heading
                  cursor='pointer'
                  onClick={() => router.push('/about')}
                  size={'xs'}
                  color={'blackAlpha.900'}
                  letterSpacing='0.1px'
                  fontWeight={'700'}
                  textTransform='uppercase'
                >

<ButtonGroup variant='outline' spacing='1'>
    <Link href="https://wa.me/5511965281517?text=ola%20Preciso%20de%20Suporte%20na%20Rifa" isExternal>
      <Button leftIcon={<FaWhatsapp />} colorScheme='green'>WhatsApp</Button>
    </Link>
    <Link href="https://www.facebook.com/profile.php?id=61555804864116&mibextid=ZbWKwL" isExternal>
      <Button leftIcon={<FaFacebook />} >Facebook</Button>
    </Link>
    <Link href="https://www.instagram.com/rifas.leao?igsh=YmxnbWZ5ZTJpbmFx" isExternal>
      <Button leftIcon={<FaInstagram />} colorScheme='pink'>Instagram</Button>
    </Link>
    <Link href="https://www.tiktok.com/@rifasleao" isExternal>
      <Button leftIcon={<FaTiktok />} >TikTok</Button>
    </Link>
  </ButtonGroup>

                </Heading>
              </Box>


              <Box>

                <Heading
                  cursor='pointer'
                  onClick={() => router.push('/register')}
                  size={'xs'}
                  color={'blackAlpha.900'}
                  letterSpacing='0.1px'
                  fontWeight={'700'}
                  textTransform='uppercase'
                >
                  Cadastre-se
                </Heading>

                <Heading
                  cursor='pointer'
                  onClick={() => router.push('/login')}
                  size={'xs'}
                  color={'blackAlpha.900'}
                  letterSpacing='0.1px'
                  fontWeight={'700'}
                  textTransform='uppercase'
                >
                  Login
                </Heading>
              </Box>
            </HStack>
          )}


          {isAuthenticated && (
            <>

              <Box
              >
                {router.route === '/' ?
                  null :
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    paddingX={2}
                    borderRadius={2}
                    color={'blackAlpha.900'}
                    fontWeight={600}
                    fontSize={16}
                    position={'relative'}
                    sx={{
                      _before: {
                        content: '""',
                        display: { base: 'block', md: 'none' },
                        position: 'absolute',
                        bottom: -7,
                        opacity: 0.8,
                        display: 'inline-block',
                        width: '100%',
                        height: '5px',
                        ml: '-8px',
                        borderRadius: '2px',
                        backgroundColor: '#f03c21',
                      },
                    }}
                  >
                    <RiDashboardLine />
                    {router.route.replace("/", "").charAt(0).toUpperCase() + router.route.replace("/", "").slice(1)}
                  </Box>
                }
              </Box>

              {/* <Text>Saldo R$ 50,00</Text> */}

            </>
          )}


        </HStack>

        <HStack id='buttons' alignItems='center' justifyContent='flex-end'>
          {isAuthenticated && (
            <Box
              onClick={getCart}
              cursor='pointer'
            >
              <Text >
                Carrinho
              </Text>
            </Box>
          )}
          {/* <IconButton
            display={{ base: 'none', md: 'flex' }}
            id='ColorModeButton'
            aria-label='Dark and light mode toggle'
            variant='ghost'
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <SunIcon color={'blackAlpha.900'} /> : <MoonIcon />}
          /> */}

          {/* <HStack display={{ base: 'none', md: 'flex' }}> */}
          {/* <Button variant='outline' onClick={() => router.push('/')}>
              Secondary
            </Button> */}

          {/* <Button colorScheme='indigo' onClick={() => router.push('/')}>
              Primary
            </Button> */}

          {/* </HStack> */}

          {isAuthenticated && (
            <IconButton
              display={{ base: 'flex' }}
              aria-label='Open sidebar menu'
              ref={drawerButtonRef}
              variant='ghost'
              onClick={onOpen}
              icon={<HamburgerIcon color={'blackAlpha.900'} width={'1.5em'} height={'1.5em'} />}
            />
          )}
        </HStack>
      </Box>

      <DrawerNavbar
        isOpen={isOpen}
        onClose={onClose}
        drawerButtonRef={drawerButtonRef}
      />


    </HStack>
  )
}
