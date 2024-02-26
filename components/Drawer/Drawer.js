const {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Grid,
  Icon,
  DrawerFooter,
  Text,
  HStack,
  Heading,
  IconButton,
  Divider,
  Tooltip,
  Stack,
  Avatar,
  Box,
  Center,
} = require("@chakra-ui/react");
import { useRouter } from "next/router";
// https://react-icons.github.io/react-icons/icons?name=io5
import {
  IoDocumentText,
  IoSearch,
  IoCart,
  IoFileTrayFull,
  IoCog,
  IoPerson,
  IoExitOutline,
} from "react-icons/io5";
import { AiOutlineRight } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { BsListTask } from "react-icons/bs";
import {IoMdHelp} from "react-icons/io"
import { MoonIcon } from "@chakra-ui/icons";
import useAuth from "@/contexts/AuthContext";

export default function DrawerNavbar({ isOpen, onClose, drawerButtonRef }) {
  const router = useRouter();
  const { logout } = useAuth();

  const links = [
    { title: "Configurações", icon: CiSettings, href: "/profile" },
  ];

  return (
    <>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={drawerButtonRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor={"#fff"}>
          <DrawerHeader display={"flex"}>
            <DrawerCloseButton
              __css={{
                mr: 2,
              }}
            />
            Menu
          </DrawerHeader>

          <Divider mb={3} borderColor={"blackAlpha.300"} />

          <Box
            p={5}
            display={'flex'}
          >
            {/* <Avatar
              // size={"lg"}
              // src="https://th.bing.com/th/id/OIP.q86T2esYe207gNMd1kBE_gHaE6?pid=ImgDet&rs=1"
              // src={require('../../public/logo.png')}
            /> */}
            <Box display={'flex'}
            flexDirection={'column'}
            p={2}
            >
                <Text
                fontWeight={'600'}
                fontSize={'xl'}>AÇÃO DO LEÃO</Text>
                {/* <Text
                 color={'gray.500'}
                 fontWeight={'semibold'}
                >emaildousuario@gmail.com</Text> */}
            </Box>
          </Box>

          <DrawerBody 
          padding={0}>
              {links &&
                links.map((link, index) => {
                  return (
                    <>
                      <Divider borderColor={"blackAlpha.300"} />
                    
                      <Button
                        onClick={() => {
                          onClose();
                          router.push(`${link.href}`)}
                        }
                        rightIcon={<Icon color={'gray.400'} as={AiOutlineRight} />}
                        key={index}
                        variant={'ghost'}
                        display={{ base: 'flex' }}
                        justifyContent={'space-between'}
                        width="100%"
                        height="15%"
                        textTransform="capitalize"
                        >
                        <Center>
                          <Icon color={'gray.800'} as={link.icon} boxSize={6} mr={1} mt={0.5}/>
                          {link.title}
                        </Center>
                      </Button>
                    </>
                  );
                })}

                  <Divider borderColor={"blackAlpha.300"} />         
                    <Button
                      onClick={() => {
                        onClose();
                        logout();
                      }}
                      rightIcon={<Icon color={'gray.400'} as={AiOutlineRight} />}
                      key={'exit'}
                      variant={'ghost'}
                      display={{ base: 'flex' }}
                      justifyContent={'space-between'}
                      width="100%"
                      height="15%"
                      textTransform="capitalize"
                      >
                      <Center>
                        <Icon color={'gray.800'} as={IoExitOutline} boxSize={6} mr={1} mt={0.5}/>
                        Sair
                      </Center>
                    </Button>

              {/* <Button
                display={{base: 'flex', md: 'none'}}
                id='ColorModeButton'
                aria-label='Dark and light mode toggle'
                onClick={toggleColorMode}
                leftIcon={
                  colorMode === 'light' ? (
                    <SunIcon
                      height={'1.2em'}
                      width={'1.2em'}
                      style={{ marginInlineEnd: '0' }}
                    />
                  ) : (
                    <MoonIcon height={'1.2em'} width={'1.2em'} />
                  )
                }
                alignItems='center'
                justifyContent='start'
                paddingTop={20}
                style={{ aspectRatio: '1 / 1' }}
                width='100%'
                height='100%'
                colorScheme='indigo'
              >
                {colorMode === 'dark' ? 'Dark' : 'Light'}
              </Button> */}
          </DrawerBody>

          {/* <DrawerFooter paddingBottom={5} width="100%" flexDirection="column">
            <Divider marginBottom={5} />
            <HStack justifyContent="space-between" width="100%">
              <Tooltip hasArrow label="View profile">
                <Button
                  onClick={() => router.push("/profile")}
                  variant="ghost"
                  leftIcon={<Icon as={IoPerson} />}
                  colorScheme={"gray"}
                >
                  <Text>Profile</Text>
                </Button>
              </Tooltip>

              <Tooltip hasArrow label="Logout">
                <IconButton
                  onClick={() => {
                    onClose();
                    logout();
                  }}
                  variant="ghost"
                  icon={<Icon as={IoExitOutline} boxSize={5} />}
                  colorScheme={"gray"}
                />
              </Tooltip>
            </HStack>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}

function SunIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
      height="1.2em"
      width="1.2em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path>
    </svg>
  );
}
