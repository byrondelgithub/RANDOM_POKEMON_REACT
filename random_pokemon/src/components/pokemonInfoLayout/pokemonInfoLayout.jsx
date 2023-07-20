import { Stack } from "@chakra-ui/react";
import PokemonInfoTable from "../pokemonInfoTable/pokemonInfoTable";
import PokemonImage from "../pokemonImage/pokemonImage";
import React, { useState } from "react";
import constants from "../../data/constants";
import {
  getAbilityInfo,
  getNatureInfo,
  getPokedexInfo,
  getPokemonImage,
  getPokemonInfo,
} from "../../utils/pokemonApiService";
import { PokemonModel } from "../../model/pokemonModel";
import { PokedexModel } from "../../model/pokedexModel";
import { useNavigate, useParams } from "react-router-dom";
import { AbilityModel } from "../../model/abilityModel";

function PokemonInfoLayout() {
  const [pokemonInfo, setPokemon] = useState(null);
  const { pokemonId, isShiny } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getPokemon = async (id, natureId, shiny) => {
      // react lint says this is better, me monkey, believes it
      setPokemon(null);
      try {
        const pokemoninfo = await getPokemonInfo(id);
        const pokedexInfo = await getPokedexInfo(id, "en");
        const natureInfo = await getNatureInfo(natureId);
        const abilityInfo = await __getAbility(pokemoninfo);
        const pokemonImage = await getPokemonImage(pokemoninfo, shiny);
        const pokemon = new PokemonModel(
          pokemoninfo,
          new PokedexModel(pokedexInfo, "en"),
          new AbilityModel(abilityInfo, "en"),
          natureInfo.name,
          pokemonImage,
          shiny
        );
        setPokemon(pokemon);
      } catch (error) {
        console.error(error);
        navigate("/error_page", { relative: "path" });
      }
    };

    let pokeId =
      pokemonId === undefined
        ? __getRandomInt(1, constants.totalPokemons + 1)
        : pokemonId.toLowerCase();
    let shiny =
      isShiny === undefined
        ? __getRandomInt(0, constants.shinyChance) === 0
        : isShiny === "1";
    const natureId = __getRandomInt(1, constants.totalNatures + 1);
    getPokemon(pokeId, natureId, shiny);
  }, [pokemonId, isShiny, navigate]);

  return (
    <>
      <Stack
        margin={"auto"}
        h={"88%"}
        justifyContent={"space-around"}
        alignItems={"center"}
        direction={["column", "row"]}
      >
        <PokemonImage pokemonInfo={pokemonInfo} />
        <PokemonInfoTable pokemonInfo={pokemonInfo} />
      </Stack>
    </>
  );
}

export default PokemonInfoLayout;

function __getRandomInt(min, max) {
  // including min, excluding max
  return Math.floor(Math.random() * (max - min)) + min;
}

async function __getAbility(pokemoninfo) {
  const hiddenAbility = __getRandomInt(0, constants.hiddenAbilityChance) === 0;
  let ability = 1;
  if (hiddenAbility) {
    // 1/250 to be the hidden one
    ability =
      pokemoninfo.abilities[pokemoninfo.abilities.length - 1].ability.name;
  } else {
    const idx = Math.floor(Math.random() * (pokemoninfo.abilities.length - 1));
    ability = pokemoninfo.abilities[idx].ability.name;
  }
  return getAbilityInfo(ability, "en");
}
