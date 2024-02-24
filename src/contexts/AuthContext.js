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
import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
import { CloseIcon } from "@chakra-ui/icons";
import ModalCart from "../../components/ModalCart";
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
    console.log(avaliation);
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

        console.log({response});

        const token = response.token;

        if (token) {
          setCookie("token", token);
          api.defaults.headers.Authorization = `Bearer ${token}`;
          //   const userData = jwt(token);
          setUser({ id: 1 });
          await Router.push("/");
          console.log("Logado com sucesso");
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
    console.log(cart);
    onOpen();
  }


  const logout = () => {
    removeCookie("token");
    setUser(null);
    Router.push("/");
    console.log("Deslogado com sucesso");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, setInCart, getCart }}
    >

     {isOpen && <ModalCart isOpen={isOpen} onClose={onClose} Cart={cart} />}

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
            height={"40vh"}
            minW={"350px"}
            maxW={"60vw"}
            maxH={"60vh"}
            position={"absolute"}
            zIndex={999}
            top={"10%"}
            left={"50%"}
            borderRadius={"15px"}
            transform={"translate(-50%, 20%)"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            p={4}
          >
            <Box w={"100%"} display={"flex"} justifyContent={"end"}>
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
              display={"flex"}
              height={"100%"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Stack spacing={4}>
                <Box>
                  <Text
                    fontSize="xl"
                    textAlign={"center"}
                    fontWeight={"bold"}
                    letterSpacing={"0.5px"}
                  >
                    Está gostando?
                  </Text>

                  <Text
                    fontWeight={"600"}
                    color={"#545454"}
                    fontSize={"14px"}
                    textAlign={"center"}
                  >
                    Qual nota você nos dá?
                  </Text>
                </Box>

                <Rating
                  onClick={(e) => {
                    if (e === 5) {
                      setAvaliation(false);
                      setEnableRating(true);
                    } else {
                      setAvaliation(false);
                      handleBoxActivation(false);
                    }
                  }}
                  emptySymbol={<BsStar size={35} color="#ECC94B" />}
                  fullSymbol={<BsStarFill size={35} color="#ECC94B" />}
                  initialRating={0}
                />
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
