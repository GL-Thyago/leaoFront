import { useState } from "react";
import { Box, HStack, Text, Image, Button } from '@chakra-ui/react';


export default function Info({alternate= true, button=false, title="", description=""}) {
return (

    <Box
      display={'flex'}
      p={10}
      mt={5}
      flexDirection={{base:'column', md: 'row'}}
      alignItems={{base: 'center', md: ''}}
      justifyContent={{base: 'center', md:'space-around'}}
    >
        {alternate ? (
                <>
                 
                 <HStack
                  w={{base: '100%', md:'50%'}}
                  alignItems={{base: 'center', md:'start'}}
                  flexDirection={'column'}
                  display={'flex'}
                >
                  <Text
                    fontSize='4xl'
                    lineHeight={'9'}
                    mb={2}
                    maxW={{base:'100%', md:250}}
                    textAlign={{base:'center', md: 'left'}}
                  >
                    {title}
                    
                  </Text>
              
                  <Text
                    fontWeight={'400'}
                    maxW={320}
                    textAlign={{base:'center', md: 'left'}}

                  >
                    {description}
                  </Text>
                  {button && (    
                    <Button
                    w={{base:'100%', md:'60%'}}
                    px={10}
                    color={'#fff'}
                    backgroundColor={'#f11f56'}
                    >Confira meus planos</Button>
                )}
                </HStack>

                </>
        ): (
            <Box
            height={'160px'}
            width={'350px'}
          >
            <Image
            borderRadius={10}
              src="https://th.bing.com/th/id/OIP.q86T2esYe207gNMd1kBE_gHaE6?pid=ImgDet&rs=1"
              alt="Imagem"
              objectFit="cover"
              height="100%"
              width="100%"
            />
          </Box>
        )}



      {!alternate ? (
                  <HStack
                  w={{base: '100%', md:'50%'}}
                  alignItems={{base: 'center', md:'end'}}
                  flexDirection={'column'}
                  display={'flex'}
                >

                  <Text
                    fontSize='4xl'
                    lineHeight={'9'}
                    mb={2}
                    maxW={{base:'100%', md:250}}
                    textAlign={{base:'center', md: 'left'}}
                    mr={{base: 0, md: 20}}
                    >
                    {title}
                  </Text>
              
                  <Text
                    fontWeight={'400'}
                    maxW={320}
                    textAlign={{base:'center', md: 'left'}}
                  >
                    {description}
                  </Text>
                </HStack>
        ): (
            <Box
            height={'160px'}
            width={'350px'}
          >
            <Image
            mt={{base: 5, md: 0}}
            borderRadius={10}
              src="https://th.bing.com/th/id/OIP.q86T2esYe207gNMd1kBE_gHaE6?pid=ImgDet&rs=1"
              alt="Imagem"
              objectFit="cover"
              height="100%"
              width="100%"
            />
          </Box>
        )}

    </Box>
    

  );
}
