import { SearchIcon } from "@chakra-ui/icons";
import {
  Text,
  Divider,
  IconButton,
  Box,
  Tag,
  TagLabel,
  Grid,
  GridItem,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Rating from "react-rating";
//   import { AiOutlineHeart, AiFillCheckCircle } from "react-icons/ai";
import { BsStarFill, BsStar } from "react-icons/bs";
import ModalBuy from "../ModalBuy";
import ModalCompradas from "../ModalCompradas";

import api from '../../src/services/api';

export default function ItemList({
  rifa,
  pending = false,
  title = "",
  propietes = {},
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenBuyModal, onOpen: onOpenBuyModal, onClose: onCloseBuyModal } = useDisclosure();
  const { isOpen: isOpenCompradasModal, onOpen: onOpenCompradasModal, onClose: onCloseCompradasModal } = useDisclosure();

  return (
    <GridItem sx={{
      overflow: 'hidden'
    }}>
     {/* {isOpen && <ModalBuy rifa={rifa} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}
     {isOpen && <ModalCompradas rifa={rifa} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />} */}
     {isOpenBuyModal && <ModalBuy rifa={rifa} isOpen={isOpenBuyModal} onOpen={onOpenBuyModal} onClose={onCloseBuyModal} />}
     {isOpenCompradasModal && <ModalCompradas rifa={rifa} isOpen={isOpenCompradasModal} onOpen={onOpenCompradasModal} onClose={onCloseCompradasModal} />}

      <Divider
        borderColor={"blackAlpha.600"}
        mt={{ base: 4, md: 0 }}
        marginBottom={{ base: 4, md: 2 }}
      />
      
      <Grid
        mb={{ base: 5, md: 3 }}
        templateAreas={{
          base: `"bodyArea"
          "paymentArea"
        `,
          md: `"imageArea bodyArea paymentArea"`,
        }}
        maxWidth={"1280px"}
        gridTemplateRows={"145px"}
        gridTemplateColumns={{ base: "1fr", md: "1.5fr 5fr 2.5fr" }}
        gap={1}
      >
        <GridItem
          area={"imageArea"}
          display={{ base: "none", md: "block" }}
          borderRadius={14}
          p={1}
        >
          <IconButton
            backgroundColor={"transparent"}
            sx={{
              _hover: {
                cursor: "pointer",
                backgroundColor: "transparent",
              },
            }}
            position={"relative"}
            ml={100}
            aria-label="favorite"
            onClick={() => setIsFavorited(!isFavorited)}
            icon={
              isFavorited ? (
                <AiFillHeart color="red" />
              ) : (
                <AiOutlineHeart color="red" />
              )
            }
          />

          <img
            style={{
              marginTop: "-40px",
              borderRadius: 4,
            }}
            width={{ base: "60%", xl: "100%" }}
             height={"100%"}
      src={`${api.defaults.img}${rifa.imagem}`}

          />
        </GridItem>
        <GridItem
          area={"bodyArea"}
          borderRadius={14}
          display={"flex"}
          flexDirection={"row"}
          alignItems={'end'}
          justifyContent={"space-between"}
        >
          <Box width={"100%"}
          display={'flex'}
          flexDirection={'column'}
          alignItems={{base: 'center', md: 'flex-start'}}
          >
            <Box minH={'60px'} ml={3}>
              <Text fontSize="xl" fontFamily={"sans-serif"} fontWeight={"600"}>
                {rifa.nome}
              </Text>
              
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-around"}
            >
              <Box mx={2}>
                <Text fontWeight={"400"} color={"blackAlpha.700"}>
                  Preço
                </Text>
                <Text fontWeight={"bold"} color={"blackAlpha.800"}>
                  {rifa.valor}
                </Text>
              </Box>

              <Box>
                <Text fontWeight={"400"} color={"blackAlpha.700"}>
                  Compradas
                </Text>
                <Text 
                textAlign={'center'}
                fontWeight={"bold"} color={rifa.aberto ? "blackAlpha.800" : "red.500"}>
                  {rifa.quantidade_numeros - rifa.disponivel}/{rifa.quantidade_numeros}
                </Text>
              </Box>
           

            </Box>
            <Tag 
            w={"85%"}
            colorScheme={rifa.aberto ? "whatsapp" : "orange"} mt={2} ml={{ base: 1,}}>
              <TagLabel
              w={"100%"}
              textAlign={'center'}
              fontWeight={'bold'}
              color={"green.900"}>
                {rifa.aberto ? "ANDAMENTO" : "REALIZADO"}
              </TagLabel>
            </Tag>
          </Box>
          <Divider
            display={{ base: "none", md: "block" }}
            borderColor={"blackAlpha.600"}
            orientation="vertical"
            height={"100%"}
          />
        </GridItem>

        <GridItem
          area={"paymentArea"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={14}
        >
          <Button backgroundColor={"#dec5ff"} color={"#8227f4"} w={"85%"}
          onClick={onOpenCompradasModal}

            >
            Meus palpites

          </Button>
          <Button
            mt={3}
            mb={3}
            backgroundColor={"#fff"}
            border={"1px solid #8227f4"}
            color={"#8227f4"}
            w={"85%"}
            onClick={onOpenBuyModal}
            
          >
            Comprar
          </Button>
          <Box display={"flex"} flexDirection={"row"}>
            <Rating
              emptySymbol={<BsStar size={13} color="#ECC94B" />}
              fullSymbol={<BsStarFill size={13} color="#ECC94B" />}
              initialRating={3}
              readonly
            />

            <Text
              ml={2}
              fontSize={"small"}
              fontWeight={500}
              color={"gray.600"}
            >
              {/* (100.000) */}
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </GridItem>
  );
}
