import {
  Link,
  Heading,
  Text,
  HStack,
  useColorMode,
  Stack,
  Divider,
  IconButton,
  Box,
  Tag,
  Avatar,
  TagLabel,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiFillCheckCircle } from "react-icons/ai";

export default function Plataform({ activated = false, favoriteCount = 0 , isFavorites = false, functionExec  }) {
  return (
    <Box
      backgroundColor={"#f1f4f6"}
      onClick={functionExec}
      py={9}
      px={10}
      maxHeight={10}
      mb={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      maxWidth={120}
      minWidth={120}
      borderTop={activated && "1px solid"}
      borderLeft={activated && "1px solid"}
      borderRight={activated && "3px solid"}
      borderBottom={activated && "2px solid"}
      borderColor={activated && "#8227f4"}
      borderRadius={10}
      position={"relative"}
      sx={{
        _hover: {
          cursor: "pointer",
        },
        ...(activated && {
          _before: {
            content: '""',
            position: "absolute",
            width: 1,
            height: 1,
            marginLeft: "6.9rem",
            marginBottom: "4.3rem",
            borderTop: "6px solid #fff",
            borderRight: "6px solid #fff",
          },
        }),
      }}
      m={2}
    >
      {activated && (
        <AiFillCheckCircle
          style={{
            position: "absolute",
            marginLeft: "7rem",
            zIndex: 10,
            marginBottom: "4.3rem",
          }}
          color="#8227f4"
          size={"1.3rem"}
        />
      )}
      LOGO
      {favoriteCount > 0 && isFavorites && (
        <Tag
          position={"absolute"}
          px={3}
          marginTop={7}
          marginBottom={-10}
          size="xs"
          backgroundColor={"whiteAlpha.900"}
          border={"1px solid"}
          fontSize={12}
          borderColor={"blackAlpha.300"}
          borderRadius="full"
        >
          <AiOutlineHeart color="red" />
          <TagLabel color={"blackAlpha.900"}>{favoriteCount}</TagLabel>
        </Tag>
      )}
    </Box>
  );
}
