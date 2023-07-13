import { Box, Center, Image } from "@chakra-ui/react";
import LoadinSpinner from "../loadingSpinner/loadingSpinner";
import theme from "../../theme";

function PokemonInfoLayout({ pokemonInfo }) {
  console.log(pokemonInfo);
  let firstType = null;
  let secondType = null;

  if (pokemonInfo) {
    firstType = theme.colors.type[pokemonInfo.types[0]];
    secondType = pokemonInfo.types[1]
      ? theme.colors.type[pokemonInfo.types[1]]
      : firstType;
  }

  console.log(firstType);
  console.log(secondType);

  return (
    <>
      {pokemonInfo ? (
        <Center border={"10px solid black"} w={500} h={500}>
          <Center
            w={"100%"}
            h={"100%"}
            padding={10}
            borderTop={`20px solid ${firstType}`}
            borderRight={`20px solid ${firstType}`}
            borderBottom={`20px solid ${secondType}`}
            borderLeft={`20px solid ${secondType}`}
          >
            <Image src={URL.createObjectURL(pokemonInfo.image)} h={"100%"} />
          </Center>
        </Center>
      ) : (
        <Center margin={10} w={400} h={400}>
          <LoadinSpinner size={400} duration={1} />
        </Center>
      )}
    </>
  );
}

export default PokemonInfoLayout;
