import { getCookie } from '@/services/cookies';
import {
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, Button, HStack, Text, Image, Heading, ButtonGroup, Stack, RadioGroup, InputGroup, InputLeftElement, Input, Container, Spacer
} from '@chakra-ui/react'
import Head from 'next/head'

import Info from '../../components/InfoComponent';
import AccordionItemProps from '../../components/AcordionItem';
import { AddIcon, MinusIcon, PhoneIcon, WarningTwoIcon } from '@chakra-ui/icons';
import FooterJSX from '../../components/Footer';
import RadioPlans from '../../components/RadioPlans';
import { useRouter } from 'next/router';
import Images from 'next/image'
import SegmentedControl from '../../components/SegmentControl';
import { useRef, useState } from 'react';
import api from '../services/api';
import useAuth from '../contexts/AuthContext';


export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    login,
  } = useAuth();

  const fetchLogin = async () => {
    login(email, password, setErrorMessage, setError);
  }

  return (
    <Box
    >
      <Head>
        <title>Ação do leão</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box width={"100%"} height={"50vh"} backgroundColor={"#c2c2c2"} />
      <Box width={"100%"} height={"50vh"} backgroundColor={"#ffff"} />

      <main style={{ maxWidth: '1420px', margin: 'auto' }}>


        <Box
          mt={10}
          mb={10}
          display={'flex'}
          width={'100%'}
          position={'absolute'}
          top={'25vh'}
          left={'0vw'}
          flexDirection={'column'}
        >
          <Box
            border={'2px solid #c2c2c2'}
            borderRadius={'5px'}
            m={'auto'}
            maxW={'1420px'}
            minW={{ base: 300, md: 400 }}
            maxWidth={600}
            p={5}
            backgroundColor={'#fff'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Text
              fontSize='xl'
              textAlign={'center'}
              fontWeight={'600'}
              letterSpacing={'0.5px'}
            >Acesse sua conta</Text>


            {error && (

              <Box
                mt={5}
                backgroundColor={'pink.100'}
                p={0.5}
                w={280}
                fontWeight={'600'}
                color={'#545454'}
                fontSize={'12px'}
                display={'flex'}
                alignItems={'center'}
                borderRadius={'3px'}
              >
                <WarningTwoIcon
                  w={'12px'}
                  m={2}
                />
                <Text>
                  {errorMessage}
                </Text>
              </Box>
            )}

            <Stack
              p={5}
              w={'100%'}
              spacing={5}
            >

              <Box>

                <Text fontWeight={'semibold'}
                  letterSpacing={'0.5px'}
                >Seu CPF</Text>
                <Input
                  p={2}
                  width={'100%'}
                  size='sm'
                  fontWeight={'semibold'}
                  sx={{
                    _placeholder: {
                      color: '#c2c2c2',
                      fontWeight: '500',
                    }
                  }}
                  textColor={'#000'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='tel' placeholder='Digite seu CPF' />
              </Box>


              <Box>
                <Text fontWeight={'semibold'}
                  letterSpacing={'0.5px'}
                >Sua senha </Text>
                <Input
                  p={2}
                  fontWeight={'semibold'}
                  sx={{
                    _placeholder: {
                      color: '#c2c2c2',
                      fontWeight: '500',
                    }
                  }}
                  textColor={'#000'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  width={'100%'}
                  size='sm'
                  type='password' placeholder='Sua senha aqui' />

              </Box>

              <Button
                backgroundColor={'#000'}
                _hover={{ backgroundColor: '#000' }}
                color={'#fff'}
                // onClick={() => login()}
                onClick={() => fetchLogin()}
              >Entrar</Button>



              <Button
                size={'xs'}
                fontWeight={'700'}
                cursor='pointer'
                color={'blackAlpha.900'}
                letterSpacing='0.1px'
                textTransform='uppercase'
                fontSize={'15'}
                variant={'link'}
                // color={'#000'}
                textDecoration={'underline'}
                onClick={() => router.push('/register')}
              >Cadastra-se
              </Button>
              <Button
                size={'xs'}
                fontWeight={'700'}
                cursor='pointer'
                color={'blackAlpha.900'}
                letterSpacing='0.1px'
                textTransform='uppercase'
                fontSize={'15'}
                variant={'link'}
                // color={'#000'}
                textDecoration={'underline'}
                onClick={() => { router.push('/recover_password') }}
              >Esqueci a senha
              </Button>



            </Stack>

          </Box>
        </Box>
      </main>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const token = getCookie("token", context.req);

  if (token) {

    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  return {
    props: {
    },
  };
}
