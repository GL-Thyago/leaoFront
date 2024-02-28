

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
  Center
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import api from '../../src/services/api';
import useAuth from '../../src/contexts/AuthContext';
import { useRouter } from 'next/router';
import { QRCodeCanvas } from 'qrcode.react';


export default function ModalBuy({ isOpen, onClose, rifa }) {
  const router = useRouter();

  const [quantity, setQuantity] = useState(0);
  const [placeQuantity, setPlaceQuantity] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(false);
  const [verifyTransition, setVerifyTransition] = useState('');

  const { setInCart, setCart, Cart } = useAuth();
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    setCartItems(Cart);
    // console.log('mudou')
  }, [Cart]);

  const handleDeleteProduct = (index) => {
    const updatedCart = [...Cart];
    updatedCart.splice(index, 1);
    // setCartItems(updatedCart);
    setCart(updatedCart);
  };

  const verificarPagamento = async (transition) => {
    let execucoes = 0;
    const MAX_EXECUCOES = 36;

    while (execucoes < MAX_EXECUCOES) {
      try {
        const response = await api.get(`/verificarPagamentoRifa/${transition}`);
        const { status, message, stop, comprovante } = response.data;

        if (stop) {
          if (status === 'APROVADO') {
      onClose();

            alert('Pagamento aprovado!');
            router.push('/dashboard');
            return;
          } else {
      onClose();

            alert('Pagamento reprovado:', message);
            router.push('/dashboard');
            return;
          }
          break;
        } else {
          // console.log('Pagamento pendente, aguardando...');
        }
      } catch (error) {
      onClose();
        console.log('Erro ao verificar pagamento:', error);
      }

      execucoes++;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (execucoes === MAX_EXECUCOES) {
      onClose();
      alert('Limite de tentativas atingido', 'Não foi possível confirmar o pagamento.');
      router.push('/dashboard');
    }
  };


  const handleSubmit = async (dados) => {
    try {
      // const totalGeral = cartItems.reduce((acc, cur) => acc + (cur.preco * cur.quantidade), 0);
      // const selecoesValidas = Cart.filter((selecao) => selecao.quantidade > 0);
      // const dados = selecoesValidas.map((selecao) => ({
      //   id: selecao.id,
      //   nome: selecao.nome,
      //   quantidade: selecao.quantidade,
      //   total: selecao.preco * selecao.quantidade
      // }));
      const arrayDeDados = [dados];
      console.log(dados)

      const response = await api.post('/criarQrCodeRifa', { dados: arrayDeDados });
      if (response.data) {
        const qrCode = response.data.emvqrcps;
        const transition = response.data.transactionId;

        setValue(qrCode);
        setVerifyTransition(transition);
        verificarPagamento(transition);
        setCart([]);

      } else {
        setCart([]);
      onClose();

        alert('Resposta da API não contém os dados esperados:', response.data);
      }
    } catch (error) {
      setCart([]);
      onClose();

      alert('Erro ao enviar linhas selecionadas:', error);
      console.log('Erro ao enviar linhas selecionadas:', error);
    }
  };


  const onPlaceQuantity = async () => {

    try {
      const dados = {
        id: rifa.id,
        quantidade: parseInt(quantity),
        nome: rifa.nome,
        valor: rifa.valor

      }

      setInCart(dados)

      handleSubmit(dados);
    } catch (err) {
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
        {!value ? (
          <><ModalHeader>
            <Text
              ml={7}
              fontSize={'4xl'}
              fontWeight={'bold'}
            >Comprar</Text>

          </ModalHeader><ModalCloseButton /><ModalBody>
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
                    onClick={() => {
                      if (quantity <= 0) {
                        return;
                      }
                      onPlaceQuantity(); // Chamando a primeira função

                      // handleSubmit(); // Chamando a segunda função
                    }}
                  >Finalizar compra</Button>
                </Box>

              </Stack>

            </ModalBody></>
        ) : (
          <Center flexDirection={'column'}>
            <Text>QrCode</Text>
            <QRCodeCanvas
              style={{
                margin: 5
              }}
              value={value} />

            <Button
              onClick={() => {
                navigator.clipboard.writeText(value);
              }}
            >Copia e Cola</Button>
          </Center>
        )}
      </ModalContent>

    </Modal>
  )
}
