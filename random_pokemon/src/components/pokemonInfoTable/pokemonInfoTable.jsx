import {
  Box,
  Center,
  Heading,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import shinyIcon from "../../assets/imgs/shiny.png";
import HelpPopover from "../helpPopover/helpPopover";
import constants from "../../data/constants";
import theme from "../../theme";

function PokemonInfoTable({ pokemonInfo }) {
  let genderIcon = null;
  const { colorMode } = useColorMode();

  const borderColor = colorMode === "light" ? "black" : "grey";

  if (pokemonInfo && pokemonInfo.gender) {
    genderIcon =
      pokemonInfo.gender === "male" ? (
        <TbGenderMale size={"37px"} color="#5d8ee4" />
      ) : (
        <TbGenderFemale size={"37px"} color="pink" />
      );
  }

  return (
    <>
      {pokemonInfo ? (
        <Box
          border={`8px solid ${borderColor}`}
          borderRadius={"5px"}
          w={["80%", "40%"]}
          h={["55%", "85%"]}
        >
          <Center
            w={"100%"}
            h={"80px"}
            borderBottom={`8px ${borderColor} solid`}
            bgColor={"pokemon.red"}
          >
            {pokemonInfo.isShiny ? (
              <Image
                transition={"0.3s"}
                src={shinyIcon}
                alt="shiny"
                w={"55px"}
              />
            ) : (
              <></>
            )}
            <Heading size={"xl"} color={"white"}>
              {pokemonInfo.name.charAt(0).toUpperCase() +
                pokemonInfo.name.slice(1)}
            </Heading>
            <Link
              href={`https://www.pokemon.com/es/pokedex/${pokemonInfo.id}`}
              target="_blank"
            >
              <Heading size={"md"} marginLeft={"7px"} color={"blue"}>
                {"#" + pokemonInfo.id}
              </Heading>
            </Link>
            <Box marginLeft={genderIcon ? "12px" : "0px"}>{genderIcon}</Box>
          </Center>
          <Stack spacing={"0"} overflowY={"auto"} h={"calc(100% - 80px)"}>
            <Center
              w={"100%"}
              padding={"7px"}
              borderBottom={`4px ${borderColor} solid`}
              flexDirection={"column"}
            >
              <Heading size={"md"}>Pokedex entry</Heading>
              <Text textAlign={"center"}>{pokemonInfo.pokedexInfo}</Text>
            </Center>
            <Center
              w={"100%"}
              padding={"5px"}
              borderBottom={`4px ${borderColor} solid`}
              flexDirection={"column"}
              bg={colorMode === "light" ? "#00000011" : "#FFFFFF11"}
            >
              <Heading size={"md"}>
                Type{pokemonInfo.types.length > 1 ? "s" : ""}
              </Heading>
              <Stack direction={"row"} w={"100%"} justify={"center"}>
                {pokemonInfo.types.map((type) => (
                  <Box
                    bg={theme.colors.type[type]}
                    border={`3px ${borderColor} solid`}
                    borderRadius={7}
                    w={"100%"}
                    maxW={140}
                    h={"40px"}
                    marginTop={"10px"}
                    transition={"0.2s"}
                    _hover={{ filter: "brightness(1.1)", maxW: 145 }}
                    alignSelf={"center"}
                  >
                    <Center
                      h={"100%"}
                      fontSize={18}
                      fontWeight={"bold"}
                      textAlign={"center"}
                      color={"white"}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Center>
                  </Box>
                ))}
              </Stack>
            </Center>
            <Center
              w={"100%"}
              padding={"5px"}
              borderBottom={`4px ${borderColor} solid`}
              flexDirection={"column"}
            >
              <Heading size={"md"}>Nature</Heading>
              <Text textAlign={"center"}>
                {pokemonInfo.nature.charAt(0).toUpperCase() +
                  pokemonInfo.nature.slice(1)}
              </Text>
              <Text textAlign={"center"} fontSize={"13"}>
                {constants.natureDescriptions[pokemonInfo.nature]}
              </Text>
            </Center>
            <Center
              w={"100%"}
              padding={"5px"}
              borderBottom={`4px ${borderColor} solid`}
              flexDirection={"column"}
              bg={colorMode === "light" ? "#00000011" : "#FFFFFF11"}
            >
              <Heading size={"md"}>Ability</Heading>
              <Stack direction={"row"}>
                <Center>
                  <Text textAlign={"center"} marginEnd={"1"}>
                    {pokemonInfo.ability.name.charAt(0).toUpperCase() +
                      pokemonInfo.ability.name.slice(1)}
                  </Text>
                  <HelpPopover
                    size={25}
                    title={`${
                      pokemonInfo.ability.name.charAt(0).toUpperCase() +
                      pokemonInfo.ability.name.slice(1)
                    } description`}
                    body={
                      pokemonInfo.ability.abilityEntries.length ? (
                        pokemonInfo.ability.abilityEntries[
                          pokemonInfo.ability.abilityEntries.length - 1
                        ].effect.replaceAll("\n", " ")
                      ) : (
                        <Text>
                          There is no description for this ability in pokeApi.{" "}
                          <Link
                            target="_blank"
                            href={`https://pokemondb.net/ability/${pokemonInfo.ability.name}`}
                            textColor={"pokemon.red"}
                          >
                            Please use this link to see an advanced ability
                            description.
                          </Link>
                        </Text>
                      )
                    }
                    footer={
                      pokemonInfo.ability.abilityEntries.length ? (
                        <>
                          <Text>
                            More info{" "}
                            <Link
                              target="_blank"
                              href={`https://pokemondb.net/ability/${pokemonInfo.ability.name}`}
                              textColor={"pokemon.red"}
                            >
                              here
                            </Link>
                          </Text>
                        </>
                      ) : (
                        <></>
                      )
                    }
                  />
                </Center>
              </Stack>
            </Center>
            <Center
              w={"100%"}
              padding={"5px"}
              borderBottom={`4px ${borderColor} solid`}
              flexDirection={"column"}
            >
              <Heading size={"md"}>Height</Heading>
              <Text textAlign={"center"}>{`${(pokemonInfo.height / 10).toFixed(
                1
              )} m`}</Text>
            </Center>
            <Center
              w={"100%"}
              padding={"5px"}
              borderBottom={`4px ${borderColor} solid`}
              flexDirection={"column"}
              bg={colorMode === "light" ? "#00000011" : "#FFFFFF11"}
            >
              <Heading size={"md"}>Weight</Heading>
              <Text textAlign={"center"}>{`${(pokemonInfo.weight / 10).toFixed(
                1
              )} kg`}</Text>
            </Center>
          </Stack>
        </Box>
      ) : (
        <Skeleton w={["80%", "40%"]} h={["55%", "85%"]} />
      )}
    </>
  );
}

export default PokemonInfoTable;
