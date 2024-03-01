import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Select,
  Spacer,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import Plataform from "../../components/Plataform";
import { useEffect, useState } from "react";
import ItemList from "../../components/ItemList";
import { AiOutlineDown } from "react-icons/ai";
import SideMenu from "../../components/SideMenu";
import ModalSideMenu from "../../components/SideMenu/MdalSideMenu";
import api from "../services/api";

export default function Dashboard() {
  const [isFavorites, setIsFavorites] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rifasList, setRifas] = useState([]);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    const fetchRifas = async () => {
      try {
        const allRifas = await api.get('/listRifas');
        setRifas(allRifas.data.rifas);
      }catch (err){
        // console.log(err);
      }
    }
    fetchRifas();
    }, []);
    
  return (
    <>
      {/* <ModalSideMenu  isOpen={isOpen} onOpen={onOpen} onClose={onClose}/> */}
      <main>
        <Grid
          // margin={"auto"}
          templateAreas={{
            base: `"top top"
                  "body body"`,
            xl: `"top top"
                "body body"
                "body body"`,
          }}
          h="100%"
          // p={{base: 2, md:10}}
          maxWidth={"1280px"}
          // gridTemplateRows={{ base: "190px", xl: "180px" }}
          gridTemplateColumns={"1fr 6fr"}
          gap={3}
        >
          {/* <GridItem area={"top"} bg="#ffff" borderTopRadius={14}>
            <Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Text mt={3} mb={3} ml={5} fontWeight={"500"} fontSize="xl">
                  Escolha a categoria
                </Text>

                <Box>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    mt={4}
                    mr={10}
                  >
                    <FormLabel
                      fontWeight={400}
                      color={"gray.600"}
                      htmlFor="email-alerts"
                      mb="0"
                    >
                      Apenas favoritos
                    </FormLabel>
                    <Switch
                      size={"md"}
                      onChange={() => setIsFavorites(!isFavorites)}
                      id="filters"
                    />
                  </FormControl>
                </Box>
              </Box>
              <Divider borderColor={"blackAlpha.600"} />
            </Box>

            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              height={{ base: "65%" }}
              overflow={"auto"}
            >
              <Plataform
                isFavorites={isFavorites}
                favoriteCount={20}
                activated={selectedItem === 0}
                functionExec={() => handleItemClick(0)}
              />
              <Plataform
                isFavorites={isFavorites}
                favoriteCount={22}
                activated={selectedItem === 1}
                functionExec={() => handleItemClick(1)}
              />
              <Plataform
                isFavorites={isFavorites}
                favoriteCount={5}
                activated={selectedItem === 2}
                functionExec={() => handleItemClick(2)}
              />
              <Plataform
                isFavorites={isFavorites}
                favoriteCount={2}
                activated={selectedItem === 3}
                functionExec={() => handleItemClick(3)}
              />
            </Box>
          </GridItem> */}
{/* 
          <GridItem
            area={"side"}
            display={{base:'none', xl:'block'}}
            minW={{ base: "100%", xl: "300px" }}
            maxW={{ base: "100%", xl: "300px" }}
          >
            <SideMenu  />
          </GridItem> */}

          <GridItem
            area={"body"}
            borderRadius={14}
            bg="#ffff"
            p={6}
            position={"relative"}
          >
           
            <Box p={2} maxW={{
              base: "100%",
            }}>
              <Box
                display={"flex"}
                flexDirection={{base:'column', sm:'row'}}
              >
                {/* <Box display={"flex"}
                 p={4}>
                  <Text fontSize={"large"} fontWeight={600}>
                    Resultados
                  </Text>
                  <Text mt={1} ml={1} fontWeight={500} color={"gray.600"}>
                    (100.000)
                  </Text>
                </Box> */}

                <Spacer display={{base: 'none', md: 'block'}}/>

                {/* <Select
                  variant="outline"
                  border={"1px solid gray"}
                  mt={2}
                  placeholder="Mais recentes"
                  // fontSize={'14px'}
                  fontWeight={400}
                  w={{ base: "100%", md: "270px" }}
                />
                 */}
              </Box>

              <Grid templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                
              }} gap={6}>
                {rifasList?.map(rifa => {
                    return (
                            <ItemList rifa={rifa}  />
                      );
                })}

              </Grid>

              <Divider mt={70} w={"100%"} borderColor={"blackAlpha.300"} />
            </Box>
          </GridItem>
        </Grid>
      </main>
    </>
  );
}
