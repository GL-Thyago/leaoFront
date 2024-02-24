

import {
    Box,
    Button,
    Center,
    Heading,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
    Text,
    useColorMode,
    useDisclosure
  } from '@chakra-ui/react'
import SideMenu from './index'
  
  export default function ModalSideMenu ({FilterName = 'Monetizze', isOpen, onOpen, onClose }) {
  
    return (

        <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset='slideInBottom'
        >
        <ModalOverlay   display={{base: 'flex', xl: 'none',}} />
        <ModalContent
        backgroundColor={'#fff'}
        display={{base: 'flex', xl: 'none',}}
        ml={{base: '', sm: '35vw', md: '45vw'}}
        marginTop={{base: '', sm: '-10vh', md: ''}}
        >
        <ModalHeader>
            <Text
            ml={7}
            fontSize={'xl'}
            fontWeight={'bold'}
            >Filtros da {FilterName}</Text>
            </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <SideMenu />
        </ModalBody>

        </ModalContent>
        </Modal>


    )
  }
  