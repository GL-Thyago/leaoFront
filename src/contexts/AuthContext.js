import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import jwt from "jwt-decode";
import Router from "next/router";
import {
  getCookie,
  getCookieFromBrowser,
  removeCookie,
  setCookie,
} from "../services/cookies";
import { Box, Button, Stack, Text, useDisclosure, ButtonGroup, Link } from "@chakra-ui/react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
import { CloseIcon } from "@chakra-ui/icons";
import ModalCart from "../../components/ModalCart";
import ModalBuy from "../../components/ModalBuy";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(true);
  const [avaliation, setAvaliation] = useState(true);
  const [enableRating, setEnableRating] = useState(false);
  const [cart, setCart] = useState([]);
  const {isOpen, onOpen, onClose} = useDisclosure();

  function handleBoxActivation(param) {
    const body = document.getElementsByTagName("body")[0];
    // console.log(avaliation);
    if (param) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = getCookieFromBrowser("token");
      if (token) {
        try {
            api.defaults.headers.Authorization = `Bearer ${token}`;

          const user = true;
          if (user) setUser(user);
          
          handleBoxActivation(true);
        } catch (e) {
          // if (401 === e.response.status) {
          //   removeCookie("token");
          //   setUser(null);
          // }
        }
      }else{
        setUser(null);
        
      }
      //   setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email, password, setErrorMessage, setError) => {
    try{
        const { data: response } = await api.post("/loginClienteRifa", {
          email,
          senha: password,
        });

        // console.log({response});

        const token = response.token;

        if (token) {
          setCookie("token", token);
          api.defaults.headers.Authorization = `Bearer ${token}`;
          //   const userData = jwt(token);
          setUser({ id: 1 });
          await Router.push("/");
        }
      }catch(err){
        setError(true);
        setErrorMessage(err.response.data.message);
    }
  };

  const setInCart = async (product) => {
    setCart(prevCart => {
      const productIndex = prevCart.findIndex(item => item.id === product.id);
      if (productIndex !== -1) {
        if (product.quantity === 0) {
          return prevCart.filter(item => item.id !== product.id);
        } else {
          const updatedCart = [...prevCart];
          updatedCart[productIndex] = product;
          return updatedCart;
        }
      } else {
          return [...prevCart, product];
      }
    });
  }

  const getCart = async () => {
    // console.log(cart);
    onOpen();
  }


  const logout = () => {
    removeCookie("token");
    setUser(null);
    Router.push("/");
    // console.log("Deslogado com sucesso");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, setInCart, getCart, setCart }}
    >
      {isOpen && <ModalCart isOpen={isOpen} onClose={onClose} Cart={cart} />}
      {isOpen && <ModalBuy isOpen={isOpen} onClose={onClose} Cart={cart} />}
  
      {avaliation && user && (
        <>
          <Box
            position={"absolute"}
            zIndex={888}
            opacity={0.9}
            height={"100vh"}
            width={"100vw"}
            backgroundColor={"#5b5b5b"}
          />
  
          <Box
            backgroundColor={"#fff"}
            height={"60vh"} // Altura responsiva
            width={"95vw"} // Largura responsiva
            maxH={"80vh"} // Altura máxima responsiva
            position={"absolute"}
            zIndex={999}
            top={"10%"}
            left={"50%"}
            borderRadius={"15px"}
            transform={"translate(-50%, 20%)"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            p={{ base: 4, md: 8 }} // Espaçamento responsivo
          >
            <Box w={"100%"} display={"flex"} justifyContent={"flex-end"}>
              <Button
                onClick={() => {
                  setAvaliation(false);
                  handleBoxActivation(false);
                }}
                size={"xs"}
                variant={"ghost"}
              >
                <CloseIcon />{" "}
              </Button>
            </Box>
  
            <Box
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Stack spacing={4}>
                <Box>
                  <Text
                    fontSize={{ base: "md", md: "lg" }} // Tamanho de fonte responsivo
                    textAlign={"center"}
                    fontWeight={"bold"}
                    letterSpacing={"0.5px"}
                  >
                    Siga nossas redes sociais e fique por dentro.
                  </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }} // Tamanho de fonte responsivo
                    textAlign={"center"}
                    fontWeight={"bold"}
                    letterSpacing={"0.5px"}
                    marginBottom={{ base: 4, md: 8 }} // Margem inferior responsiva
                  >
                    Diversos sorteios gratuitos
                  </Text>
  
                  <ButtonGroup
  justifyContent="center" // Centraliza os botões horizontalmente
  flexDirection={{ base: "column", md: "row" }}
  spacing={{ base: 2, md: 4 }}
  width="100%" // Define a largura total para o ButtonGroup
>
  <Link href="https://wa.me/5511965281517?text=ola%20Preciso%20de%20Suporte%20na%20Rifa" isExternal>
    <Button
      leftIcon={<FaWhatsapp />}
      colorScheme='green'
      mb={{ base: 2, md: 0 }}
      width="100%" // Define a largura total para o botão
    >
      WhatsApp
    </Button>
  </Link>
  <Link href="https://www.facebook.com/profile.php?id=61555804864116&mibextid=ZbWKwL" isExternal>
    <Button
      leftIcon={<FaFacebook />}
      mb={{ base: 2, md: 0 }}
      width="100%" // Define a largura total para o botão
    >
      Facebook
    </Button>
  </Link>
  <Link href="https://www.instagram.com/rifas.leao?igsh=YmxnbWZ5ZTJpbmFx" isExternal>
    <Button
      leftIcon={<FaInstagram />}
      colorScheme='pink'
      mb={{ base: 2, md: 0 }}
      width="100%" // Define a largura total para o botão
    >
      Instagram
    </Button>
  </Link>
  <Link href="https://www.tiktok.com/@rifasleao" isExternal>
    <Button
      leftIcon={<FaTiktok />}
      mb={{ base: 2, md: 0 }}
      width="100%" // Define a largura total para o botão
    >
      TikTok
    </Button>
  </Link>
</ButtonGroup>


                </Box>
              </Stack>
            </Box>
          </Box>
        </>
      )}
  
      {children}
    </AuthContext.Provider>
  );
  
};

export default function useAuth() {
  return useContext(AuthContext);
}
