import {
  Avatar,
    Box,
    Button,
    Code,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Stack,
    Switch,
    Text,
    useDisclosure,
  } from "@chakra-ui/react";
  import Head from "next/head";
  import Plataform from "../../components/Plataform";
  import { useState, useEffect } from "react";
  import ItemList from "../../components/ItemList";
  import { useRouter } from 'next/router'
  import { PhoneIcon } from "@chakra-ui/icons";
import useAuth from "@/contexts/AuthContext";
import api from "../services/api"
  
  export default function Dashboard() {
    const { logout } = useAuth();
    const router = useRouter();
  const [dadosCliente, setDadosCliente] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const listDadosCliente = async () => {
    try {
      const response = await api.get(`/listDadosCliente`);
      console.log('Dados da resposta:', response.data);
      const cliente = response.data.cliente;
      setDadosCliente(cliente);
      setIsLoading(false);
    } catch (error) {
      console.log('Erro ao verificar pagamento:', error);
      setError(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listDadosCliente();
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }


  const handleCopy = () => {
    const baseUrl = window.location.origin;
    const registerUrl = `${baseUrl}/register?afiliado=${dadosCliente.afiliado}`;
    navigator.clipboard.writeText(registerUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
      })
      .catch((error) => console.error('Erro ao copiar:', error));
  };


    return (
        <main>
            <Grid
            margin={"auto"}
            templateAreas={
              {base:
                `
                "top top"
                "side side"
                "body body"
                "info info"`,
                md:`
                "top top"
                "side body"
                "side body"
                "side info"`
              }
            }
            h="100%"
            maxWidth={"1280px"}
            gridTemplateColumns={"1.4fr 5fr"}
            gap={2}
            p={10}
          >
            <GridItem area={"top"} display={'flex'} justifyContent={'space-between'}>
             <Box>
                <Text fontSize='2xl' ml={{base: '1vw', md: '6vw'}} mt={5} fontWeight={"500"}>Configurações</Text>
             </Box>

             <Button 
             onClick={() => logout()}
             mt={5} w={"100px"}>Sair</Button>
            </GridItem>

            <GridItem area={"side"} display={'flex'} justifyContent={'end'}>
             <Box display={"flex"}
             flexDirection={'column'}
             ml={{base: -50, md: 0}}
             alignItems={'end'}
             w={{base:'80%', md:"70%"}}
             minWidth={"200px"}
             textAlign={'left'}
             
             >

              <Box minWidth={"250px"} mt={3} h={"40px"}
              backgroundColor={'gray.100'}
              fontSize={'2xl'}
              fontWeight={'500'}
              borderRadius={4}
              mb={2}
              p={1}
              sx={{
                _hover: {
                  cursor: "pointer",
                }
              }}
              onClick={() => router.push('/profile')}
              >
                Geral
              </Box>

              <Box  h={"40px"}
              minWidth={"250px"}
              backgroundColor={'gray.50'}
              fontSize={'2xl'}
              fontWeight={'500'}
              borderRadius={4}
              mb={2}
              p={1}
              sx={{
                _hover: {
                  cursor: "pointer",
                }
              }}
              onClick={() => router.push('/billing')}
              >
                Pagamentos
              </Box>

             </Box>
            </GridItem>

            

            <GridItem area={"body"} height={"100%"} bg="#ffff" borderRadius={14}>
             <Box p={2} >
                <Stack spacing={6} mt={2} ml={5}>
                  <Text fontSize={'xl'} fontWeight={'500'}>Dados</Text>
                  <Box display={'flex'}
                  >

                    <Avatar 
                    size={"xl"}
                    src={"https://picsum.photos/200/300"} />

                    <Box sx={{
      ml: 5,
      fontSize: '0.9em',
      _hover: {
        cursor: "pointer",
      }
    }} colorScheme='yellow' onClick={handleCopy}>
      {isCopied ? 'Copiado!' : 'Link de afiliado'}
    </Box>

                  </Box>
                  
                  <Stack spacing={3} >

                  <Box maxWidth={"600px"}>
                      <Text ml={1}>Nome</Text>
                      <InputGroup minWidth={"150px"}
                      >
                        <InputLeftElement pointerEvents='none'>
                          <PhoneIcon color='gray.900' />
                        </InputLeftElement>
                        <Input fontWeight={'400'} />
                      </InputGroup>
                    </Box>

                    <Box maxWidth={"600px"}>
                      <Text >E-mail atual</Text>
                      <Text fontWeight={'400'}>{dadosCliente.email}</Text>
                    </Box>
                    <Box maxWidth={"600px"}>
                    <Text ml={1}>Novo e-mail</Text>
                    <InputGroup minWidth={"200px"}>
                      <InputLeftElement pointerEvents='none'>
                        <PhoneIcon color='gray.900' />
                      </InputLeftElement>
                      <Input fontWeight={'400'} />
                    </InputGroup>
                  </Box>
                  <Box maxWidth={"600px"}>
                      <Text >Telefone atual</Text>
                      <Text fontWeight={'400'}>{dadosCliente.telefone}</Text>
                    </Box>
                    <Box maxWidth={"600px"}>
                    <Text ml={1}>Novo telefoen</Text>
                    <InputGroup minWidth={"200px"}>
                      <InputLeftElement pointerEvents='none'>
                        <PhoneIcon color='gray.900' />
                      </InputLeftElement>
                      <Input fontWeight={'400'} />
                    </InputGroup>
                  </Box>

                  <Divider borderColor={"blackAlpha.200"} p={0.5}  w={"97%"} margin={'auto'} />
                  <Text fontSize={'2xl'} fontWeight={'500'}>Senha</Text>

                  <Stack spacing={3} >
                      <Box maxWidth={"600px"}>
                        <Text ml={1}>Senha atual</Text>
                        <InputGroup minWidth={"200px"}>
                          <InputLeftElement pointerEvents='none'>
                            <PhoneIcon color='gray.900' />
                          </InputLeftElement>
                          <Input fontWeight={'400'} />
                        </InputGroup>
                      </Box>

                    <Box maxWidth={"600px"}>
                      <Text ml={1}>Nova senha</Text>
                      <InputGroup  minWidth={"200px"}>
                        <InputLeftElement pointerEvents='none'>
                          <PhoneIcon color='gray.900' />
                        </InputLeftElement>
                        <Input fontWeight={'400'} />
                      </InputGroup>
                    </Box>

                  <Box maxWidth={"600px"}>
                    <Text ml={1}>Repita a nova senha</Text>
                    <InputGroup  mb={3} minWidth={"200px"}>
                      <InputLeftElement pointerEvents='none'>
                        <PhoneIcon color='gray.900' />
                      </InputLeftElement>
                      <Input fontWeight={'400'} />
                    </InputGroup>
                  </Box>

                  <Box w={'100%'} display={'flex'} justifyContent={{base: 'center', md: 'end'}}>
                    <Button w={"240px"} 
                    backgroundColor={'#f3344b'}
                    _hover={{backgroundColor: '#f3344b'}}
                    color={'#fff'}
                    fontWeight={'bold'}
                    mr={{base: 0, md: 10}}>Salvar</Button>
                  </Box>

                </Stack>
                  
                  </Stack>
                </Stack>
             </Box>
            </GridItem>

            <GridItem area={"info"} bg="#ffff" p={2} borderRadius={14}>
             <Box 
              minHeight={'130px'}
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-around'}
              >
                
                <Box>
                  <Text fontSize={'2xl'} fontWeight={'500'}>Deletar conta</Text>
                  <Text fontSize={'x-small'} fontWeight={'hairline'}>Essa ação não pode ser desfeita</Text>
                </Box>

                {/*DIV SEPARAR */}
                <Box></Box>
                <Box></Box>


                <Button 
                backgroundColor={'#f3344b'}
                _hover={{backgroundColor: '#f3344b'}}
                >Deletar conta</Button>
             
             </Box>
            </GridItem>

          </Grid>
        </main>
    );
  }