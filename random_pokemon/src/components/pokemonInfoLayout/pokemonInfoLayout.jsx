import { Box, Center, Image, Skeleton, Stack } from "@chakra-ui/react";
import LoadinSpinner from "../loadingSpinner/loadingSpinner";
import theme from "../../theme";

function PokemonInfoLayout({ pokemonInfo }) {
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
      <Stack margin={"auto"} h={"88%"} justifyContent={"space-around"} alignItems={"center"} direction={["column", "row"]}>
        {pokemonInfo ? (
          <Box border={"10px solid black"} borderRadius={"5px"} w={["85", "40%"]} h={["40%", "85%"]}>
            <Center
              w={"100%"}
              h={"100%"}
              padding={10}
              borderTop={`25px solid ${firstType}`}
              borderRight={`25px solid ${firstType}`}
              borderBottom={`25px solid ${secondType}`}
              borderLeft={`25px solid ${secondType}`}
            >
              <Image src={URL.createObjectURL(pokemonInfo.image)} h={"100%"} />
            </Center>
          </Box>
        ) : (
          <Box w={["85", "40%"]} h={["40%", "85%"]}>
            <Center
              w={"100%"}
              h={"100%"}
              padding={125}
            >
              <LoadinSpinner size={"100%"} duration={1} />
            </Center>
          </Box>
        )}
        <Skeleton w={["85", "40%"]} h={["40%", "85%"]} />
      </Stack>
    </>
  );
}

export default PokemonInfoLayout;
