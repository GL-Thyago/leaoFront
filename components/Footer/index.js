import { Box, Button, ButtonGroup, HStack, Heading, Text, Link, } from "@chakra-ui/react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

import { useRouter } from "next/router";

export default function FooterJSX() {


    const router = useRouter()

    return (
        <Box w={'100%'}
            p={10}
            maxW={1520}
            marginLeft={'auto'}
            marginRight={'auto'}
            color={'whiteAlpha.900'}
            backgroundColor={"blackAlpha.900"}
        >
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-around'}
            >
                <Box>
                    <Box>
                        {/* <Text mb={3} fontWeight={'medium'}>Affiliate Pirate</Text> */}
                    </Box>
                    <Box>
                        <ul style={{ listStyle: 'none' }}>
                            <li>Sobre nós</li>
                            {/* <li 
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/apply')}>Programa de afiliados</li> */}
                        </ul>
                    </Box>
                </Box>

                <Box>
                    {/* <Box>
            <Text mb={3} fontWeight={'medium'}>Contato</Text>
            </Box> */}
                    <Box>
                        <ul style={{ listStyle: 'none' }}>
                            {/* <li>hello@affiliatepirate.com</li> */}
                        </ul>
                    </Box>
                </Box>

                <Box>
                <li>Termos de uso</li>

                    {/* <ButtonGroup variant='outline' spacing='2' >
    <Link href="https://wa.me/5511965281517?text=ola%20Preciso%20de%20Suporte%20na%20Rifa" isExternal>
      <Button leftIcon={<FaWhatsapp fontSize="30px" />} colorScheme='green'></Button>
    </Link>
    <Link href="https://www.facebook.com/profile.php?id=61555804864116&mibextid=ZbWKwL" isExternal>
      <Button leftIcon={<FaFacebook fontSize="30px"/>} colorScheme='blue'></Button>
    </Link>
    <Link href="https://www.instagram.com/rifas.leao?igsh=YmxnbWZ5ZTJpbmFx" isExternal>
      <Button leftIcon={<FaInstagram fontSize="30px"/>} colorScheme='pink'></Button>
    </Link>
    <Link href="https://www.tiktok.com/@rifasleao" isExternal>
      <Button leftIcon={<FaTiktok fontSize="30px"/>} colorScheme='white'></Button>
    </Link>
  </ButtonGroup> */}
                    {/* <Box>
            <Text mb={3} fontWeight={'medium'}>Ajuda</Text>
            </Box> */}
                    {/* <Box>
            <ul style={{listStyle: 'none'}}>
                <li>Central de ajuda</li>
            </ul>
            </Box> */}
                </Box>
            </Box>

            <Box display={'flex'}
                mt={5}
                justifyContent={'space-around'}
            >

                <HStack
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'end'}
                    id='logo' onClick={() => router.push('/')} cursor='pointer'>
                    {/* <Heading
                as='h1'
                size='lg'
                color={'whiteAlpha.900'}
                letterSpacing='1px'
            >
                Logo
            </Heading> */}
                    <Text fontSize={12}>© 2024 W.G-G.L - Todos os direitos reservados</Text>
                </HStack>

            </Box>
        </Box>
    );
}
