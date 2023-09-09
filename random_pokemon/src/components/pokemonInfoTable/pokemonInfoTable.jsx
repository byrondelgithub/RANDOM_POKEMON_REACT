/**
 * @file File with the hook of the pokemon table with all of its info used in PokemonInfoLayout
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports PokemonInfoTable
 */

import {
  Box,
  Center,
  Grid,
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
import PokemonMovement from "../pokemonMovement/pokemonMovement";
import PokemonStatBar from "../pokemonStatBar/pokemonStatBar";

/**
 * The bigger component of the entire app. It represents all of the pokemon info (PokemonModel) given by parameter using
 * some Chakra native components and some custom ones.
 *
 * It has differents color depending of the theme mode and when clicked some extra info of the movement is shown.
 *
 * The pokemon info must be given by pokemonInfoLayout.
 *
 * When no pokemonInfo is undefined an Skeleton with the same size as the table is shown.
 * @returns {Component}
 */
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
            <Heading size={["lg", "xl"]} color={"white"}>
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
              <Text textAlign={"center"} marginTop={2}>
                {pokemonInfo.pokedexInfo}
              </Text>
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
                {pokemonInfo.types.map((type, i) => (
                  <Box
                    bg={theme.colors.type[type]}
                    border={`3px ${borderColor} solid`}
                    borderRadius={7}
                    w={"100%"}
                    maxW={140}
                    h={"40px"}
                    marginTop={3}
                    transition={"0.2s"}
                    _hover={{ filter: "brightness(0.9)", maxW: 145 }}
                    alignSelf={"center"}
                    key={i}
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
              <Text textAlign={"center"} marginTop={2}>
                {pokemonInfo.nature.name.charAt(0).toUpperCase() +
                  pokemonInfo.nature.name.slice(1)}
              </Text>
              <Text textAlign={"center"} fontSize={"13"}>
                {constants.natureDescriptions[pokemonInfo.nature.name]}
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
              <Text textAlign={"center"} marginTop={2}>{`${(
                pokemonInfo.height / 10
              ).toFixed(1)} m`}</Text>
            </Center>
            <Center
              w={"100%"}
              padding={"5px"}
              borderBottom={`4px ${borderColor} solid`}
              flexDirection={"column"}
              bg={colorMode === "light" ? "#00000011" : "#FFFFFF11"}
            >
              <Heading size={"md"} marginTop={2}>
                Weight
              </Heading>
              <Text textAlign={"center"}>{`${(pokemonInfo.weight / 10).toFixed(
                1
              )} kg`}</Text>
            </Center>
            <Center
              w={"100%"}
              padding={"5px"}
              borderBottom={`4px ${borderColor} solid`}
              flexDirection={"column"}
            >
              <Heading size={"md"}>Moves</Heading>
              <Grid
                w={["95%", "80%"]}
                templateColumns={`repeat(${
                  pokemonInfo.moves.length > 1 ? 2 : 1
                }, ${pokemonInfo.moves.length === 1 ? "100" : "50"}%)`}
                templateRows={
                  pokemonInfo.moves.length > 2
                    ? "repeat(2, 70px)"
                    : "repeat(1, 70px)"
                }
                gap={2}
                marginTop={"10px"}
              >
                {pokemonInfo.moves.map((move, i) => (
                  <PokemonMovement move={move} key={i} />
                ))}
              </Grid>
            </Center>
            <Center
              w={"100%"}
              padding={"5px 20px 20px 20px"}
              borderBottom={`4px ${borderColor} solid`}
              flexDirection={"column"}
              bg={colorMode === "light" ? "#00000011" : "#FFFFFF11"}
            >
              <Stack
                direction={"row"}
                h="100%"
                align={"center"}
                marginBottom={-2}
              >
                <Heading size={"md"}>Stats (level 50)</Heading>
                <HelpPopover
                  size={25}
                  title={"Stats explanations"}
                  body={
                    "The stats being shown are calculated using the original formula from pokemon (without EVs). The colors determines how good is a stat using its base and maximum value (255): Red=Bad, Yellow=Normal, Light green=Good, Green=Very good. If a stat name is bolded congratulations, that means a perfect stat (31 IVs)."
                  }
                  footer={
                    <Text>
                      More info{" "}
                      <Link
                        color={"pokemon.red"}
                        href={`https://gamefaqs.gamespot.com/boards/696959-pokemon-x/68539129`}
                        target="_blank"
                      >
                        here
                      </Link>
                      .
                    </Text>
                  }
                />
              </Stack>
              <Text
                w={"100%"}
                textAlign={"end"}
                marginRight={["0%", "5%"]}
                fontWeight={"bold"}
              >
                Max
              </Text>
              {pokemonInfo.stats.map((stat, i) => (
                <PokemonStatBar stat={stat} key={i} />
              ))}
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
