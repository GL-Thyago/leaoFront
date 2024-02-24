import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  Select,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import Plataform from "../../components/Plataform";
import { useState } from "react";
import ItemList from "../../components/ItemList";
import { useRouter } from "next/router";
import { PhoneIcon } from "@chakra-ui/icons";
import { FaEllipsisV } from 'react-icons/fa'

export default function Dashboard() {
  const router = useRouter();
  const {
    isOpen: isOpenBilling,
    onOpen: onOpenBilling,
    onClose: onCloseBilling,
  } = useDisclosure();
  return (
    <main>
      
      <Modal isOpen={isOpenBilling} onClose={onCloseBilling}>
              <ModalOverlay />
              <ModalContent bgColor={'whitesmoke'}>
                <ModalHeader>Adicionar Fundos</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onCloseBilling}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

      <Grid
        margin={"auto"}
        templateAreas={{
          base: `
                  "top top"
                  "side side"
                  "body body"
                  `,
          md: `
                  "top top"
                  "side body"
                  "side body"
                  "side body"`,
        }}
        h="100%"
        maxWidth={"1280px"}
        gridTemplateColumns={"1.4fr 5fr"}
        gap={2}
        p={10}
      >
        <GridItem
          area={"top"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box>
            <Text
              fontSize="2xl"
              ml={{ base: "1vw", md: "6vw" }}
              mt={5}
              fontWeight={"500"}
            >
              Configurações
            </Text>
          </Box>

        </GridItem>

        <GridItem area={"side"} display={"flex"} justifyContent={"end"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            ml={{ base: -50, md: 0 }}
            alignItems={"end"}
            w={{ base: "80%", md: "70%" }}
            minWidth={"200px"}
            textAlign={"left"}
          >
            <Box
              minWidth={"250px"}
              mt={3}
              h={"40px"}
              backgroundColor={"gray.50"}
              fontSize={"2xl"}
              fontWeight={"500"}
              borderRadius={4}
              mb={2}
              p={1}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
              onClick={() => router.push('/profile')}
            >
              Geral
            </Box>

            <Box
              h={"40px"}
              minWidth={"250px"}
              backgroundColor={"gray.100"}
              fontSize={"2xl"}
              fontWeight={"500"}
              borderRadius={4}
              mb={2}
              p={1}
              sx={{
                _hover: {
                  cursor: "pointer",
                },
              }}
              onClick={() => router.push('/billing')}
            >
              Pagamentos
            </Box>

          </Box>
        </GridItem>

        <GridItem area={"body"} height={"100%"} bg="#ffff" borderRadius={14}>
          <Box p={2}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-around"}
              alignContent={"center"}
              mt={10}
            >
              <Box display={"flex"} flexDirection={"row"}>
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  Suas compras
                </Text>
                <Badge
                  h={"20px"}
                  mt={2} ml={2}
                  w={50}
                  textAlign={"center"}
                  borderRadius={10}
                  backgroundColor={"blackAlpha.900"}
                  color={"#fff"}
                >
                  Ativo
                </Badge>
              </Box>

              {/* DIV IMAGINARIA*/}
                <Box></Box>
                <Box></Box>
                <Box></Box>
              {/* DIV IMAGINARIA*/}

              <Box>

                <Box display={'flex'} mt={-4}>
                  <Text fontSize={'4xl'}>R$ 50</Text>
                  <Text mt={7}
                  color={'blackAlpha.500'}
                  > saldo</Text>
                  </Box>
                <Button 
                w={'100%'}
                onClick={() => {
                  onOpenBilling();
                }}
                colorScheme={'red'}>Depositar</Button>

                </Box>
            </Box>

            {/* LIMITE ATINGIDO */}
            <Box p={10} mb={-5}>
                

              <Text>Você não possui nenhuma compra 🤨</Text>

            </Box>


          </Box>
        </GridItem>
      </Grid>
    </main>
  );
}
