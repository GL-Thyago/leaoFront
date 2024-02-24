import { Box, Button, Divider } from "@chakra-ui/react";

const SideMenu = ({  setCreditsOver, onOpen }) => {
  return (
    <Box
      borderRadius={14}
      p={2}
      bg="#ffff"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Divider borderColor={"blackAlpha.600"} />
      <Button
        mt={3}
        mb={1}
        width={"85%"}
        backgroundColor={"#8227f4"}
        borderRadius={4}
        color={"#fff"}
        sx={{
          _hover: {
            backgroundColor: "#8227f4",
          },
        }}
      >
        Aplicar filtros
      </Button>

      <Button
        variant={"link"}
        textDecoration={"underline"}
        color={"#6321f4"}
      >
        Limpar filtros
      </Button>
    </Box>
  );
};

export default SideMenu;
