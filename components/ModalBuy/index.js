

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

    const handleSubmit = async () => {
      try {
        const totalGeral = cartItems.reduce((acc, cur) => acc + (cur.preco * cur.quantidade), 0);
  
        const selecoesValidas = Cart.filter((selecao) => selecao.quantidade > 0);
        const dados = selecoesValidas.map((selecao) => ({
          id: selecao.id,
          nome: selecao.nome,
          quantidade: selecao.quantidade,
          total: selecao.preco * selecao.quantidade
        }));
  
  
        const response = await api.post('/criarQrCodeRifa', { dados });
        if (response.data) {
          const qrCode = response.data.emvqrcps;
          const transition = response.data.transactionId;
  
          setValue(qrCode);
          setVerifyTransition(transition);
          verificarPagamento(transition);
        } else {
          alert('Resposta da API não contém os dados esperados:', response.data);
        }
      } catch (error) {
        alert('Erro ao enviar linhas selecionadas:', error);
        console.log('Erro ao enviar linhas selecionadas:', error);
      }
    };
  

    const onPlaceQuantity = async () => {
      try{
        const dados = {
          id: rifa.id,
          quantidade: parseInt(quantity),
          nome:rifa.nome,
          valor:rifa.valor

        }
        setInCart(dados)
        onClose();
      }catch(err){
        // console.log(err);
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
            >Comprar</Text>

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
                }}>Adicionar ao carrinho</Button>

<Button
                w={'100%'}
                isDisabled={quantity <= 0}
                marginY={1}
        

onClick={handleSubmit}
                >Finalizar compra</Button>
              </Box>

            </Stack>

        </ModalBody>

        </ModalContent>
        </Modal>
    )
  }
  