

import {
  Box,
  Button,
  Center,
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
import { QRCodeCanvas } from 'qrcode.react';
export default function ModalCart({ isOpen, onClose, Cart }) {
  const [value, setValue] = useState(false);
  const [verifyTransition, setVerifyTransition] = useState('');

  const verificarPagamento = async (transition) => {
    let execucoes = 0;
    const MAX_EXECUCOES = 12;

    while (execucoes < MAX_EXECUCOES) {
      try {
        const response = await api.get(`/verificarPagamentoRifa/${transition}`);
        console.log('Dados da resposta:', response.data);
        const { status, message, stop, comprovante } = response.data;

        if (stop) {
          if (status === 'APROVADO') {
            alert('Pagamento aprovado!');
            return;
          } else {
            alert('Pagamento reprovado:', message);
            return;
          }
          break;
        } else {
          // console.log('Pagamento pendente, aguardando...');
        }
      } catch (error) {
        console.log('Erro ao verificar pagamento:', error);
      }

      execucoes++;
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    if (execucoes === MAX_EXECUCOES) {
      Alert.alert('Limite de tentativas atingido', 'Não foi possível confirmar o pagamento.');
    }
  };

  const handleSubmit = async () => {
    try {
      const selecoesValidas = Cart.filter((selecao) => selecao.quantidade > 0);
      const dados = selecoesValidas.map((selecao) => ({
        id: selecao.id,
        quantidade: selecao.quantidade,
        total: selecao.preco * selecao.quantidade
      }));

      // Calculando o total geral somando os totais de todas as seleções
      const totalGeral = dados.reduce((acc, cur) => acc + cur.total, 0);


      const response = await api.post('/criarQrCodeRifa', { dados });
      console.log({ response })
      console.log('Resposta da API não contém os dados esperados:', dados);

      if (response.data) {
        const qrCode = response.data.emvqrcps;
        const transition = response.data.transactionId;

        setValue(qrCode);
        setVerifyTransition(transition);
        verificarPagamento(transition);
      } else {
        alert('Resposta da API não contém os dados esperados:', response.data);
        console.log('Resposta da API não contém os dados esperados:', response.data);
      }
    } catch (error) {
      alert('Erro ao enviar linhas selecionadas:', error);
      console.log('Erro ao enviar linhas selecionadas:', error);
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
          >Compra</Text>

        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            spacing={4}
            p={5}>
            <Box w={'100%'}>
              {!value ? (
                <Center flexDirection={'column'} w={'100%'}>
                  <Text>Finalizar suas</Text>
                  {Cart.map((item, index) => (
                    <Text key={index}>
                      Produto: {item.nome}, Quantidade: {item.quantidade}, Preço: {item.preco}
                    </Text>
                  ))}

                  <Button
                    onClick={handleSubmit}
                    w={'100%'}>
                    Submit
                  </Button>
                </Center>
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

            </Box>

          </Stack>

        </ModalBody>

      </ModalContent>
    </Modal>
  )
}
