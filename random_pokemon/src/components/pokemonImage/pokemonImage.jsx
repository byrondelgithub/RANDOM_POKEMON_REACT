import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Center,
  Image,
  Link,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import theme from "../../theme";
import LoadinSpinner from "../loadingSpinner/loadingSpinner";
import React from "react";
import shinyIcon from "../../assets/imgs/shiny.png";

function PokemonImage({ pokemonInfo }) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  let firstType = null;
  let secondType = null;

  if (pokemonInfo) {
    firstType = theme.colors.type[pokemonInfo.types[0]];
    secondType = pokemonInfo.types[1]
      ? theme.colors.type[pokemonInfo.types[1]]
      : firstType;
  }

  return (
    <>
      {pokemonInfo ? (
        <Box
          border={`10px solid ${colorMode === "light" ? "black" : "grey"}`}
          borderRadius={"5px"}
          w={["85", "40%"]}
          h={["40%", "85%"]}
        >
          {pokemonInfo.isShiny ? (
            <Box w={["85", "40%"]} position={"absolute"} padding={10}>
              <Image
                marginStart={"auto"}
                marginRight={5}
                src={shinyIcon}
                w={"15%"}
                filter={colorMode === "light" ? "invert(1)" : ""}
              />
            </Box>
          ) : (
            <></>
          )}
          <Box
            w={"100%"}
            h={"100%"}
            padding={10}
            borderTop={`25px solid ${secondType}`}
            borderRight={`25px solid ${secondType}`}
            borderBottom={`25px solid ${firstType}`}
            borderLeft={`25px solid ${firstType}`}
          >
            <Link onClick={onOpen}>
              <Center w={"100%"} h={"100%"}>
                <Image
                  src={URL.createObjectURL(pokemonInfo.image)}
                  h={"100%"}
                  objectFit={"contain"}
                />
              </Center>
            </Link>
          </Box>
          <AlertDialog
            size={"5xl"}
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent w={"100%"} h={"100%"}>
              <AlertDialogCloseButton />
              <Center w={"100%"} h={"100%"}>
                <Image
                  src={URL.createObjectURL(pokemonInfo.image)}
                  h={"100%"}
                  padding={"50px"}
                  objectFit={"contain"}
                />
              </Center>
            </AlertDialogContent>
          </AlertDialog>
        </Box>
      ) : (
        <Box w={["85", "40%"]} h={["40%", "85%"]}>
          <Center w={"100%"} h={"100%"} padding={100}>
            <LoadinSpinner size={"100%"} duration={1} />
          </Center>
        </Box>
      )}
    </>
  );
}

export default PokemonImage;
