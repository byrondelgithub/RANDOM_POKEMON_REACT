/**
 * @file File with the hook of the pokemon movement shown in a grid in pokemonInfoTable
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports PokemonMovement
 */

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Center,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import theme from "../../theme";
import { MdHelp } from "react-icons/md";
import { useRef } from "react";
import physicalIcon from "../../assets/imgs/physical-move-icon.png";
import specialIcon from "../../assets/imgs/special-move-icon.png";

/**
 * A simple clickable component for pokemon movements.
 *
 * It has differents color depending of the theme mode and when clicked some extra info of the movement is shown.
 * @returns {Component}
 */
function PokemonMovement({ move }) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const borderColor = colorMode === "light" ? "black" : "grey";

  return (
    <>
      <Link _hover={{ textDecoration: "none" }} onClick={onOpen}>
        <Box
          bg={theme.colors.type[move.type]}
          border={`3px ${borderColor} solid`}
          borderRadius={7}
          w={"100%"}
          h={"100%"}
          maxH={65}
          transition={"0.2s"}
          _hover={{ filter: "brightness(0.9)", w: "101%", maxH: 70 }}
          alignSelf={"center"}
        >
          <Center h={"100%"} flexDirection={"column"} position={"relative"}>
            <Box position={"absolute"} top={1} left={1} fontSize={[16, 22]}>
              <MdHelp color={"white"} />
            </Box>
            <Text
              fontSize={[16, 20]}
              fontWeight={"bold"}
              textAlign={"center"}
              color={"white"}
            >
              {move.name.charAt(0).toUpperCase() +
                move.name.slice(1).replaceAll("-", " ")}
            </Text>
            <Text
              fontSize={[11, 12]}
              fontWeight={"bold"}
              position={"absolute"}
              color={"white"}
              right={2}
              bottom={1}
            >
              PP: {move.pp}/{move.pp}
            </Text>
          </Center>
        </Box>
      </Link>
      <AlertDialog
        size={["md", "5xl"]}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent border={`5px ${borderColor} solid`}>
          <AlertDialogCloseButton />
          <AlertDialogHeader
            textAlign={"center"}
            fontSize={32}
            borderBottom={`5px ${borderColor} solid`}
            bg={"pokemon.red"}
            color={"white"}
          >
            {move.name.charAt(0).toUpperCase() +
              move.name.slice(1).replaceAll("-", " ")}
          </AlertDialogHeader>
          <AlertDialogBody w={"100%"}>
            <Stack w={"100%"} spacing={"3px"}>
              <Center w={"100%"} padding={"5px"} flexDirection={"column"}>
                <Heading size={"md"}>Move description</Heading>
                <Text textAlign={"center"}>
                  {move.moveEntries[
                    move.moveEntries.length - 1
                  ].flavor_text.replaceAll("\n", " ")}
                </Text>
              </Center>
              <Box w={"100%"} borderBottom={"2px grey solid"} />
              <Stack
                w={"100%"}
                padding={"5px"}
                direction={"row"}
                justifyContent={"space-around"}
              >
                <Center w={"100%"} padding={"5px"} flexDirection={"column"}>
                  <Heading size={"md"}>Type</Heading>
                  <Box
                    bg={theme.colors.type[move.type]}
                    border={`3px ${borderColor} solid`}
                    borderRadius={7}
                    w={"100%"}
                    maxW={140}
                    h={"45px"}
                    marginTop={"10px"}
                    transition={"0.2s"}
                    _hover={{ filter: "brightness(0.9)", maxW: 145 }}
                    alignSelf={"center"}
                  >
                    <Center
                      h={"100%"}
                      fontSize={18}
                      fontWeight={"bold"}
                      textAlign={"center"}
                      color={"white"}
                    >
                      {move.type.charAt(0).toUpperCase() + move.type.slice(1)}
                    </Center>
                  </Box>
                </Center>
                <Center w={"100%"} padding={"5px"} flexDirection={"column"}>
                  <Heading size={"md"}>Category</Heading>
                  <Tooltip
                    label={move.damageClass}
                    aria-label="damage catagory"
                  >
                    <Image
                      src={
                        move.damageClass === "special"
                          ? specialIcon
                          : physicalIcon
                      }
                      w={"80px"}
                      marginTop={"10px"}
                    />
                  </Tooltip>
                </Center>
                <Center w={"100%"} padding={"5px"} flexDirection={"column"}>
                  <Heading size={"md"}>PP</Heading>
                  <Text textAlign={"center"} marginTop={"5px"}>
                    {move.pp}
                  </Text>
                </Center>
              </Stack>
              <Box w={"100%"} borderBottom={"2px grey solid"} />
              <Stack
                w={"100%"}
                padding={"5px"}
                direction={"row"}
                justifyContent={"space-around"}
              >
                <Center w={"100%"} padding={"5px"} flexDirection={"column"}>
                  <Heading size={"md"}>Power</Heading>
                  <Text textAlign={"center"} marginTop={"5px"}>
                    {move.power ? move.power : "—"}
                  </Text>
                </Center>
                <Center w={"100%"} padding={"5px"} flexDirection={"column"}>
                  <Heading size={"md"}>Accuracy</Heading>
                  <Text textAlign={"center"} marginTop={"5px"}>
                    {move.accuracy ? move.accuracy : "♾️"}
                  </Text>
                </Center>
              </Stack>
              <Text textAlign={"end"}>
                More info{" "}
                <Link
                  target="_blank"
                  href={`https://pokemondb.net/move/${move.name}`}
                  textColor={"pokemon.red"}
                >
                  here
                </Link>
              </Text>
            </Stack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default PokemonMovement;
