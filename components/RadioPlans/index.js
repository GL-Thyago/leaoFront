import { Badge, Box, Radio, Text } from "@chakra-ui/react";
import { useState } from "react";


export default function RadioPlans({ activated = false, title = "", price = "" , products = "", value="", isChecked=false, functionExec, ilimited=false  }) {

  

return (
<Box
display={'flex'}
flexDirection={'column'}
borderRadius={10}
border={isChecked ? '3px solid #f3344b': '3px solid #232323'}
p={5}
>
  <Box 
  display={'flex'} 
  justifyContent={'space-between'}
  flexDirection={{base:'column', md: 'row'}}>
    <Box>
      <Radio
      // defaultChecked={activated}
      // defaultValue={}
      isChecked={isChecked  === value}
      onChange={functionExec}
      border={'5px solid gray'}
      _checked={{
        bg: '#ffff',
        borderColor: '#f3344b',
      }}
      
      colorScheme='red'
      value={value}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          {title}
        </Text>
      </Radio>

{activated && (
      <Badge
          h={"20px"}
          mt={3} ml={2}
          w={50}
          textAlign={"center"}
          borderRadius={10}
          backgroundColor={"blackAlpha.900"}
          color={"#fff"}
        >
          Ativo
      </Badge>
)}
    </Box>

    <Box display={'flex'} mt={-4}>
      <Text fontSize={'4xl'} fontWeight={'medium'}>R$ {price}</Text>
      <Text mt={7}
      color={'blackAlpha.500'}
      >por mês</Text>
    </Box>

  </Box>

  <Text ml={6}
  color={'blackAlpha.500'}
  >Até {products} produtos por dia.</Text>

  {ilimited && (
    <Box 
    mt={4}
    width={"100%"}
    borderRadius={4}
    color={'whiteAlpha.900'}
    backgroundColor={'#02b2aa'}
    p={2}
    >Produtos ILIMITADOS a partir do sétimo dia após a assinatura.</Box>

  )}
</Box>
  );
}
