import { Box, Button, ButtonGroup, HStack, Heading, Text } from "@chakra-ui/react";
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
            <Text mb={3} fontWeight={'medium'}>Affiliate Pirate</Text>
            </Box>
            <Box>
            <ul style={{listStyle: 'none'}}>
                <li>Sobre nós</li>
                <li 
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/apply')}>Programa de afiliados</li>
                <li>Termos de uso</li>
                <li>Política de privacidade</li>
            </ul>
            </Box>
        </Box>

        <Box>
            <Box>
            <Text mb={3} fontWeight={'medium'}>Contato</Text>
            </Box>
            <Box>
            <ul style={{listStyle: 'none'}}>
                {/* <li>hello@affiliatepirate.com</li> */}
                <li>Fale com a gente </li>
            </ul>
            </Box>
        </Box>

        <Box>
            <Box>
            <Text mb={3} fontWeight={'medium'}>Ajuda</Text>
            </Box>
            <Box>
            <ul style={{listStyle: 'none'}}>
                <li>Central de ajuda</li>
            </ul>
            </Box>
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
            <Heading
                as='h1'
                size='lg'
                color={'whiteAlpha.900'}
                letterSpacing='1px'
            >
                Logo
            </Heading>
            <Text fontSize={12}>© 2024 W.G-G.L - Todos os direitos reservados</Text>
            </HStack>

            <ButtonGroup variant='outline' spacing='1'>
            <Button colorScheme='blue'>S</Button>
            <Button>C</Button>
            <Button colorScheme='blue'>S</Button>
            <Button>C</Button>
            </ButtonGroup>

        </Box>
        </Box>
);
}
