import { useEffect, useState } from 'react';
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
  Wrap,
  Center,
  Spinner,
  WrapItem,
} from '@chakra-ui/react';
import api from '../../src/services/api';

export default function ModalCompradas({ isOpen, onClose, rifa }) {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [palpites, setPalpites] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchMeusPalpitesPorRifa();
    }
  }, [isOpen]);

  const fetchMeusPalpitesPorRifa = async () => {
    try {
      setLoading(true);
      const response = await api.get(`meusPalpitesPorRifa/${rifa.id}`);
      setPalpites(response.data.palpites.palpites);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao consultar meus palpites:', error);
      setLoading(false);
    }
  };

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
      <ModalOverlay />
      <ModalContent backgroundColor={'#fff'} maxW="800px">
        <ModalHeader textAlign="center">
          <Text fontSize="4xl" fontWeight="bold">
            Meus Palpites
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={5}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              {/* Palpites Comprados: */}
            </Text>
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : palpites.length === 0 ? (
              <Text>Nenhum palpite comprado.</Text>
            ) : (
              <Wrap spacing={4}>
                {palpites.map((palpite, index) => (
                  <WrapItem key={index} width="100px">
                    <Box
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      p={4}
                      boxShadow="md" // Adiciona sombreamento ao card
                    >
                      <Text fontSize="lg">{palpite}</Text>
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
