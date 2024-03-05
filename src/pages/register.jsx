import useAuth from '@/contexts/AuthContext';
import { getCookie } from '@/services/cookies';
import {
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box, Button, HStack, Text, Image, Heading, ButtonGroup, Stack, RadioGroup, InputGroup, InputLeftElement, Input, Select, Container, Spacer, Flex
} from '@chakra-ui/react'
import Head from 'next/head'
import api from '../services/api';

import Info from '../../components/InfoComponent';
import AccordionItemProps from '../../components/AcordionItem';
import { AddIcon, MinusIcon, PhoneIcon, WarningTwoIcon } from '@chakra-ui/icons';
import FooterJSX from '../../components/Footer';
import RadioPlans from '../../components/RadioPlans';
import { useRouter } from 'next/router';
import Images from 'next/image'
import SegmentedControl from '../../components/SegmentControl';
import { useRef, useState } from 'react';
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";


export default function Home() {
  const { login } = useAuth();
  const [isSelected, setIsSelected] = useState(null);
  const router = useRouter();
  const [isAlert, setIsAlert] = useState(null);
  const [messageAlert, setMessageAlert] = useState(null);
  // get a query parameter from the url
  const { afiliado = null } = router.query
  const codigo = afiliado !== null ? afiliado : '0';

  const estados = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const post = await api.post('/cadastroClinteRifa', {
        email: data.email,
        nome: data.nome,
        cpf: data.cpf.replace(/[.-]/g, ''),
        dataNascimento: data.dataNascimento,
        cep: data.cep,
        telefone: data.telefone,
        senha: data.senha,
        uf: data.uf,
        codigo: codigo
      });

      if (post.status === 200) {
        setIsAlert(true);
        setMessageAlert(post.data.msg);
      }

    } catch (e) {
      setIsAlert(false);
      setMessageAlert(e.response.data.msg);
    }
  }

  // const validateAge = (value) => {
  //   const currentDate = new Date();
  //   const birthDate = new Date(value);
  //   const age = currentDate.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  //   if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age >= 18 || 'Você deve ter mais de 18 anos.';
  // };

  return (
    <Box
    >
      <Head>
        <title>Rifa do leão</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <Box width={"100%"} height={"50vh"} backgroundColor={"#c2c2c2"} /> */}
      {/* <Box width={"100%"} height={"50vh"} backgroundColor={"#ffff"} /> */}
      <main style={{ maxWidth: '1420px', margin: 'auto' }}>
        <Box
          mt={10}
          mb={10}
          mx={'auto'}
          maxW={{ base: '100%', md: '1420px' }}
          px={5}
        >
          <Box
            border='2px solid #c2c2c2'
            borderRadius='5px'
            p={5}
            backgroundColor='#fff'
          >
            <Text
              fontSize='xl'
              textAlign='center'
              fontWeight='600'
              letterSpacing='0.5px'
            >Crie sua conta</Text>

            {isAlert !== null && (
              <Box
                mt={5}
                backgroundColor={isAlert ? 'green.100' : 'pink.100'}
                p={3}
                fontWeight='600'
                color='#545454'
                fontSize='sm'
                display='flex'
                alignItems='center'
                borderRadius='3px'
                justifyContent='center'
              >
                <WarningTwoIcon
                  w={'16px'}
                />
                <Text>
                  {messageAlert}
                </Text>
              </Box>
            )}

            <form
              onError={errors => console.log(errors)}
              onSubmit={handleSubmit(onSubmit)}>
              <Stack
                p={5}
                w={'100%'}
                spacing={5}
              >

                <Flex
                  w={'100%'}
                  justifyContent={'space-around'}
                >
                  <Box>
                    <Text fontWeight={'semibold'}
                      letterSpacing={'0.5px'}
                    >Seu e-mail</Text>
                    <Input
                      p={2}
                      size='sm'
                      fontWeight='semibold'
                      {...register('email', {
                        required: true,
                        pattern: {
                          value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                          message: 'Digite um email válido.'
                        }
                      })}
                      type='email' placeholder='Digite seu e-mail' />
                    {errors.email && <Text color={'red'} fontSize={'xs'}>Por favor, digite um email válido.</Text>}
                  </Box>

                  <Box>
                    <Text fontWeight={'semibold'}
                      letterSpacing={'0.5px'}
                    >Seu nome</Text>
                    <Input
                      p={2}
                      size='sm'
                      fontWeight='semibold'
                      sx={{
                        _placeholder: {
                          color: '#c2c2c2',
                          // fontWeight: '500',
                        }
                      }}
                      {...register('nome', {
                        required: true,
                      })}
                      type='text' placeholder='Digite seu nome' />
                    {errors.nome && <Text color={'red'} fontSize={'2xs'}>Por favor, digite um nome válido.</Text>}
                  </Box>
                </Flex>

                <Flex
                  justifyContent={'space-around'}
                >
                  <Box
                  >
                    <Text fontWeight={'semibold'}
                      letterSpacing={'0.5px'}
                    >Senha</Text>
                    <Input
                      p={2}
                      size='sm'
                      fontWeight='semibold'
                      sx={{
                        _placeholder: {
                          color: '#c2c2c2',
                          fontWeight: '500',
                        }
                      }}
                      {...register('senha', {
                        required: true,
                        pattern: {
                          //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                          //   message: 'Digite uma senha válida.'
                          value: 6,
                        }
                      })}
                      type='password' placeholder='Senha' />
                    {errors.senha && <Text color={'red'} fontSize={'2xs'}>Sua senha deve conter campos válidos.</Text>}
                  </Box>

                  <Box
                  >
                    <Text fontWeight={'semibold'}
                      letterSpacing={'0.5px'}
                    >CPF</Text>
                    <Input
                      type='tel'
                      p={2}
                      size='sm'
                      as={InputMask} mask="999.999.999-99"
                      maskChar={'_'}
                      fontWeight={'semibold'}
                      {...register('cpf', {
                        required: true,
                        pattern: {
                          value: /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/,
                          message: 'Digite um CPF válido.'
                        }
                      })
                      }
                      sx={{
                        _placeholder: {
                          color: '#c2c2c2',
                          fontWeight: '500',
                        }
                      }}
                      placeholder='Digite seu CPF' />
                    {errors.cpf && <Text color={'red'} fontSize={'2xs'}>Por favor, digite um CPF válido.</Text>}
                  </Box>
                </Flex>
                <Flex
                  justifyContent={'space-around'}
                >
                  <Box
                    // marginX={2}
                  >
                    <Text fontWeight={'semibold'}
                      letterSpacing={'0.5px'}
                    >CEP </Text>
                    <Input
                      as={InputMask} mask="99999-999"
                      maskChar={'_'}
                      p={2}
                      fontWeight={'semibold'}
                      {...register('cep', {
                        required: true,
                        pattern: {
                          value: /^[0-9]{5}-[0-9]{3}$/,
                          message: 'Digite um CEP válido.'
                        }
                      })
                      }
                      sx={{
                        _placeholder: {
                          color: '#c2c2c2',
                          fontWeight: '500',
                        }
                      }}
                      size='sm'
                      placeholder='Seu CEP aqui' />
                    {errors.cep && <Text color={'red'} fontSize={'xs'}>Por favor, digite um CEP válido.</Text>}
                  </Box>
                  <Box>
                    <Text fontWeight='semibold' letterSpacing='0.5px'>
                      UF
                    </Text>
                    <Select
                      p={2}
                      size='sm'
                      fontWeight='semibold'
                      {...register('uf', { required: true })}
                      placeholder='Selecione a UF'
                    >
                      {estados.map((estado) => (
                        <option key={estado.value} value={estado.value}>
                          {estado.label}
                        </option>
                      ))}
                    </Select>
                    {errors.uf && (
                      <Text color='red' fontSize='xs'>
                        Por favor, selecione uma UF.
                      </Text>
                    )}
                  </Box>

                </Flex>
                <Flex
                  justifyContent={'space-around'}
                >

                  <Box
                    // marginX={2}
                  >
                    <Text fontWeight={'semibold'}
                      letterSpacing={'0.5px'}
                    >Data Nascimento </Text>
                    {/* <Input
                      p={2}
                      fontWeight={'semibold'}
                      sx={{
                        _placeholder: {
                          color: '#c2c2c2',
                          fontWeight: '500',
                        }
                      }}
                      width={'100%'}
                      {...register('dataNascimento', {
                          required: true,
                        })
                      }
                      size='sm'
                      type='date' placeholder='Sua data de nascimento aqui' />
                      {errors.dataNascimento &&  <Text color={'red'} fontSize={'2xs'}>Por favor, digite uma data válida.</Text>} */}
                   
                   
                    <Input
                      as={InputMask}   mask="99/99/9999"
                      maskChar={'_'}
                      p={2}
                      fontWeight={'semibold'}
                      {...register('dataNascimento', {
                        required: true,
                        pattern: {
                          value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                          message: 'Digite uma data de nascimento válida no formato dd/mm/aaaa.'
                        }
                      })
                      }
                      sx={{
                        _placeholder: {
                          color: '#c2c2c2',
                          fontWeight: '500',
                        }
                      }}
                      size='sm'
                      placeholder= 'Data de nascimento' />
                    {errors.dataNascimento && <Text color={'red'} fontSize={'xs'}>Digite um data valida.</Text>}

                  </Box>
                  <Box>
                    <Text fontWeight={'semibold'}
                      letterSpacing={'0.5px'}
                    >Telefone</Text>
                    <Input
                      as={InputMask} mask="(99) 99999-9999"
                      maskChar={'_'}
                      {...register('telefone', {
                        required: true,
                        pattern: {
                          value: /^\([1-9]{2}\) [0-9]{5}-[0-9]{4}$/,
                          message: 'Digite um telefone válido.'
                        }
                      })
                      }
                      p={2}
                      fontWeight={'semibold'}
                      sx={{
                        _placeholder: {
                          color: '#c2c2c2',
                          fontWeight: '500',
                        }
                      }}
                      width={'100%'}
                      size='sm'
                      placeholder='Seu telefone' />
                    {errors.telefone && <Text color={'red'} fontSize={'2xs'}>Por favor, digite uma telefone válido.</Text>}
                  </Box>
                </Flex>
                <Button
                  backgroundColor={'#000'}
                  _hover={{ backgroundColor: '#000' }}
                  color={'#fff'}
                  type='submit'
                >Criar</Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </main>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const token = getCookie("token", context.req);

  if (token) {

    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  return {
    props: {
    },
  };
}
