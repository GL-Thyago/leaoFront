import useAuth from '@/contexts/AuthContext';
import { getCookie } from '@/services/cookies';
import {   
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, Button, HStack, Text, Image, Heading, ButtonGroup, Stack, RadioGroup, Grid, GridItem } from '@chakra-ui/react'
import Head from 'next/head'

import Info from '../../components/InfoComponent';
import AccordionItemProps from '../../components/AcordionItem';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import FooterJSX from '../../components/Footer';
import RadioPlans from '../../components/RadioPlans';
import { useRouter } from 'next/router';
import SegmentedControl from '../../components/SegmentControl';
import { useEffect, useRef, useState } from 'react';
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs';
import api from '../services/api';


export default function Home () {
  const router = useRouter();

  const [rifas, setRifas] = useState([
  //   {
  //   nome: 'Rifa 1',
  //   valor: 10,
  //   premio: 'Iphone 12',
  //   image : 'https://bit.ly/dan-abramov'
  // }
]);

  useEffect(() => {
  const fetchRifas = async () => {
    const allRifas = await api.get('/listRifas');
    setRifas(allRifas.data.rifas);
  }
  fetchRifas();

  }, []);




  return (
    <Box>
      <Head>
        <title>Ação do leão</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main style={{ maxWidth: '1420px', margin: 'auto'}}>
        {/* <Box 
        
        display={'flex'}
        justifyContent={'center'}
        >
            <Text
            fontSize='5xl' 
            textAlign={'center'}
            maxW={'450px'}
            >Rifas</Text>
        </Box>   */}

      <Box 
      mt={10}
      mb={10}
      p={5}
      px={10}
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      >
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>

        {rifas?.map((rifa, index) => {
          return (
            <GridItem
            key={index}
            w={'100%'}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={'#c2c2c2'}
            borderRadius={'10px'}
            >
              <Box
              w={'100%'}
              display={'flex'}
              justifyContent={'center'}
              >
                <Image
             src={api.defaults.img + rifa.imagem}
                sx={{
                  objectFit: 'cover',
                  borderLeftRadius: '10px',
                }}
                width={250}
                height={150}
                />
              </Box>

              <Box
              display={'flex'}
              flexDirection={'column'}
              minW={'160px'}
              px={5}
              >
                <Text
                textAlign={'center'}
                fontSize={'md'}
                >{rifa.nome}</Text>
                <Text
                fontSize={'md'}
                textAlign={'center'}
                >R$ {rifa.valor}</Text>
                <Text
                fontSize={'small'}
                >Prêmio: {rifa.premio}</Text>
                
                <Box display={"flex"} flexDirection={"row"}>
                <Rating
                  emptySymbol={<BsStar size={10} color="#ECC94B" />}
                  fullSymbol={<BsStarFill size={10} color="#ECC94B" />}
                  initialRating={5}
                  readonly
                />

                <Text
                  ml={2}
                  fontSize={"small"}
                  fontWeight={500}
                  color={"gray.600"}
                >
                  
                  ({rifa.disponivel})
                </Text>
              </Box>

                <Button
                colorScheme='linkedin'
                onClick={() => router.push('/login')}
                >Participar</Button>
              </Box>
            </GridItem>
          )
        })}

        </Grid>
        
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
