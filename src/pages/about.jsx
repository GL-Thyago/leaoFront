import useAuth from '@/contexts/AuthContext';
import { getCookie } from '@/services/cookies';
import {   
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, Button, HStack, Text, Image, Heading, ButtonGroup, Stack, RadioGroup } from '@chakra-ui/react'
import Head from 'next/head'

import Info from '../../components/InfoComponent';
import AccordionItemProps from '../../components/AcordionItem';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import FooterJSX from '../../components/Footer';
import RadioPlans from '../../components/RadioPlans';
import { useRouter } from 'next/router';
import SegmentedControl from '../../components/SegmentControl';
import { useRef, useState } from 'react';


export default function Home () {

  const [isSelected, setIsSelected] = useState(null);

  const handleItemClick = (index) => {
    setIsSelected(index.target.value)
  }

  const [selectedValue1, setSelectedValue1] = useState("complete");

  return (
    <Box>
      <Head>
        <title>Ação do leão</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main style={{ maxWidth: '1420px', margin: 'auto'}}>
        <Box 
        
        display={'flex'}
        justifyContent={'center'}
        >
          <Text
          fontSize='5xl' 
          textAlign={'center'}
          maxW={'450px'}
          >Quem somos nós?</Text>
        </Box>  

      <Box 
      mt={10}
      mb={10}
      display={'flex'}
      width={'100%'}
      alignItems={'center'}
      flexDirection={'column'}
      >
        <Box
        width={{base: '80%', md: '60%'}}
        border={'3px solid #c2c2c2'}
        borderRadius={'15px'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        p={{base: 1, md: 10}}
        >
          <Box p={14}>
            <Text
            fontSize='xl'

            textAlign={'center'}
            maxW={'450px'}
            >ILUSTRAÇÃO</Text>
          </Box>

          <Text
          p={7}
          fontWeight={'600'}
          >
          Somos apenas uma empresa divertida que facilita a vida de afiliados e que odeia o marketing corporativo tanto quanto você. Nossa missão é fazer com que os afiliados consigam encontrar produtos campeões e, assim, criar negócios digitais rentáveis.
            <br/>
            <br/>
        Mas chega de falar sobre nós e nossa história entediante, nos fale sobre você:
          </Text>

          <Box display={'flex'}
          w={'100%'}
        mt={5}
        >
            <Button
            w={'100%'}
            color={'#fff'}
            backgroundColor={"#f3344b"}
            >Escolher plano</Button>
        </Box>

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
