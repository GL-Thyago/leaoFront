

import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  CloseButton,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import api from '../../src/services/api';
import useAuth from '../../src/contexts/AuthContext';
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter } from 'next/router';

export default function ModalCart({ isOpen, onClose, Cart }) {
  const router = useRouter();

  // const history = useHistory();
  const [value, setValue] = useState(false);
  const [verifyTransition, setVerifyTransition] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const { setCart, setInCart } = useAuth();
  const [copied, setCopied] = useState(false);


  // const onCopyToClipboard = () => {
  //   navigator.clipboard.writeText(value);
  //   setCopied(true);
  //   setTimeout(() => {
  //     setCopied(false);
  //   }, 5000);
  // };

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
      })
      .catch((error) => console.error('Erro ao copiar:', error));
  };

  useEffect(() => {
    setCartItems(Cart);
  }, [Cart]);

  const handleDeleteProduct = (index) => {
    const updatedCart = [...cartItems];
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
            alert('Pagamento aprovado!');
            router.push('/dashboard');
         onClose();

            return;
          } else {
            alert('Pagamento reprovado:', message);
            router.push('/dashboard');
         onClose();

            return;
          }
          break;
        } else {
          // console.log('Pagamento pendente, aguardando...');
        }
      } catch (error) {
      }

      execucoes++;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (execucoes === MAX_EXECUCOES) {
      alert('Limite de tentativas atingido', 'Não foi possível confirmar o pagamento.');
      router.push('/dashboard');
      onClose();
    }
  };

  const handleSubmit = async () => {
    try {
      // const totalGeral = cartItems.reduce((acc, cur) => acc + (cur.valor * cur.quantidade), 0);
      const selecoesValidas = Cart.filter((selecao) => selecao.quantidade > 0);
      const dados = selecoesValidas.map((selecao) => ({
        id: selecao.id,
        nome: selecao.nome,
        quantidade: selecao.quantidade,
        total: selecao.valor * selecao.quantidade
      }));

      const response = await api.post('/criarQrCodeRifa', { dados });
      if (response.data) {
        const qrCode = response.data.emvqrcps;
        const transition = response.data.transactionId;

        // console.log('valor aqu', qrCode)
// console.log('valor aqui', value)
// if()

        setVerifyTransition(transition);
        setValue(response.data.emvqrcps);
        verificarPagamento(transition);
         setCart([]);
        //  onClose();
      } else {
        alert('Resposta da API não contém os dados esperados:', response.data);
         setCart([]);
         onClose();
      }
    } catch (error) {
      setCart([]);
      onClose();
      alert('Erro ao enviar linhas selecionadas:', error);
    }
  };

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
        maxW="700px">
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
            <Box w={'100%'}>
              {!value ? (
                <Center flexDirection={'column'} w={'100%'} >
                  {/* <Text>{}</Text> */}
                  {cartItems.map((item, index) => (
                    // <Text key={index}>
                    //   Produto: {item.nome}, Quantidade: {item.quantidade}, Preço: {item.preco}
                    // </Text>
                    <Box key={index} borderWidth="3px" borderRadius="lg" p="2" mb="2" borderColor="gray.200" w="250px">
                      <Text fontSize="lg" fontWeight="bold">Ação: {item.nome}</Text>
                      <Text>Preço: {item.valor}</Text>
                      <Text>Quantidade: {item.quantidade}</Text>
                      <Box>

                        <CloseButton
                        // position="absolute"
                        // top="0"
                        // right="0"
                        onClick={() => handleDeleteProduct(index)}
                      />
                      </Box>
                      
                    </Box>
                  ))}

                  <Button
                    onClick={handleSubmit}
                    w={'100%'}
                    bg="red.500" 
                    color="white" 
                    _hover={{ bg: 'red.600' }} 
                  >
                    Finalizar compras
                  </Button>
                </Center>
              ) : (
                <Center flexDirection={'column'}>
                  <Text>QrCode</Text>
                  <QRCodeCanvas
                    style={{
                      margin: 5
                    }}
              size={256}

                    value={value} />

                  {/* <Button
                    onClick={() => {
                      navigator.clipboard.writeText(value);
                    }}
                  >Copia e Cola</Button> */}

<Button onClick={() => onCopyToClipboard(value)}>
              {copied ? 'Copiado!' : 'Copia?'}
            </Button>
                  
                </Center>
              )}

            </Box>

          </Stack>

        </ModalBody>

      </ModalContent>
    </Modal>
  )
}
