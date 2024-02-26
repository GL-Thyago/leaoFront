

import {
  Box,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
  } from '@chakra-ui/react'
import { useState } from 'react';
import api from '../../src/services/api';
import useAuth from '../../src/contexts/AuthContext';
  export default function ModalBuy ({ isOpen, onClose, rifa }) {
    const [quantity, setQuantity] = useState(0);
    const [placeQuantity, setPlaceQuantity] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
      setInCart
    } = useAuth();

  

    const onPlaceQuantity = async () => {
      try{
        const dados = {
          id: rifa.id,
          quantidade: parseInt(quantity)
        }
        setInCart(dados)
        onClose();
      }catch(err){
        console.log(err);
      }
    }
  
    return (
        <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        >
        <ModalOverlay />
        <ModalContent
        backgroundColor={'#fff'}
        maxW="300px">
        <ModalHeader>
            <Text
            ml={7}
            fontSize={'4xl'}
            fontWeight={'bold'}
            >Compra</Text>

            </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Stack 
            spacing={4}
            p={5}>
              <Box>

              <Input type="number" 
              value={quantity}
              placeholder="Quantidade" onChange={(e) => {
                  const val = e.target.value;
                  if (val >= 0 && Number.isInteger(Number(val))) {
                    setQuantity(val);
                  }
                }} />
                <Button
                w={'100%'}
                isDisabled={quantity <= 0}
                marginY={1}
                onClick={() => {
                  if (quantity <= 0) {
                    return;
                  }

                  onPlaceQuantity();
                }}>Comprar</Button>
              </Box>

            </Stack>

        </ModalBody>

        </ModalContent>
        </Modal>
    )
  }
  