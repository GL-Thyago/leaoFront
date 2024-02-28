import useAuth from '@/contexts/AuthContext';
import { getCookie } from '@/services/cookies';
import {   
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, Button, HStack, Text, Image, Heading, ButtonGroup, Stack, RadioGroup, Grid, GridItem, Progress } from '@chakra-ui/react'
import Head from 'next/head'

import Info from '../../../components/InfoComponent';
import AccordionItemProps from '../../../components/AcordionItem';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import FooterJSX from '../../../components/Footer';
import RadioPlans from '../../../components/RadioPlans';
import { useRouter } from 'next/router';
import SegmentedControl from '../../../components/SegmentControl';
import { useRef, useState } from 'react';
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs';


export default function Home () {
  const router = useRouter();


  const [rifas, setRifas] = useState([{
    nome: 'Rifa 1',
    valor: 10,
    premio: 'Iphone 12',
    image : 'https://bit.ly/dan-abramov'
  },{
    nome: 'Rifa 1',
    valor: 10,
    premio: 'Iphone 12',
    image : 'https://bit.ly/dan-abramov'
  },{
    nome: 'Rifa 1',
    valor: 10,
    premio: 'Iphone 12',
    image : 'https://bit.ly/dan-abramov'
  },{
    nome: 'Rifa 1',
    valor: 10,
    premio: 'Iphone 12',
    image : 'https://bit.ly/dan-abramov'
  },{
    nome: 'Rifa 1',
    valor: 10,
    premio: 'Iphone 12',
    image : 'https://bit.ly/dan-abramov'
  },{
    nome: 'Rifa 1',
    valor: 10,
    premio: 'Iphone 12',
    image : 'https://bit.ly/dan-abramov'
  },{
    nome: 'Rifa 1',
    valor: 10,
    premio: 'Iphone 12',
    image : 'https://bit.ly/dan-abramov'
  },{
    nome: 'Rifa 1',
    valor: 10,
    premio: 'Iphone 12',
    image : 'https://bit.ly/dan-abramov'
  },{
    nome: 'Rifa 1',
    valor: 10,
    premio: 'Iphone 12',
    image : 'https://bit.ly/dan-abramov'
  }]);

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
      flexDirection={'column'}
      >
        <Grid   
        templateColumns='380px 1fr'
        >
          <GridItem>
            <Image
              src={'https://bit.ly/dan-abramov'}
              sx={{
                objectFit: 'cover',
                borderRadius: '10px'
              }}
              width={370}
              height={250}
              />
          </GridItem>

          <GridItem>
              <Heading>
                Rifa 1
              </Heading>
              <Text>Progresso</Text>
            <Progress hasStripe={true} value={64} />
            <Text>Descrição</Text>
            <Text>Prêmio: Iphone 12</Text>
            <Text>Valor: R$ 10,00</Text>
            <Text>Informação Adicionais</Text>
            <Button 
            mt={2}
            bgColor={'#000'}
            _hover={{
              bgColor: '#000'
            }}
            >Comprar</Button>
          </GridItem>


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
