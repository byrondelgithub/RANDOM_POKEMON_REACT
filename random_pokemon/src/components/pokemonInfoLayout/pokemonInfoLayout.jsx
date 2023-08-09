/**
 * @file File with the hook of the app layout with, here is where all of the info is requested and processed!
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports PokemonInfoLayout
 */
import { Center, Show, Stack } from "@chakra-ui/react";
import PokemonInfoTable from "../pokemonInfoTable/pokemonInfoTable";
import PokemonImage from "../pokemonImage/pokemonImage";
import React, { useState } from "react";
import constants from "../../data/constants";
import {
  getAbilityInfo,
  getMoveInfo,
  getNatureInfo,
  getPokedexInfo,
  getPokemonImage,
  getPokemonInfo,
} from "../../utils/pokemonApiService";
import { PokemonModel } from "../../model/pokemonModel";
import { PokedexModel } from "../../model/pokedexModel";
import { useNavigate, useParams } from "react-router-dom";
import { AbilityModel } from "../../model/abilityModel";
import { MoveModel } from "../../model/moveModel";
import { NatureModel } from "../../model/natureModel";

/**
 * The main component of the app. PokemonInfoLayout is in charge of generating the random pokemon and all of its random info (ability, moves etc).
 *
 * It has the image and table of the pokemon (and some ads hihi).
 * The pokemon and if its shiny or not can be specified via url, using its id or name and 0 or 1 for shiny.
 * @returns {Component}
 */
function PokemonInfoLayout() {
  const [pokemonInfo, setPokemon] = useState(null);
  const { pokemonId, isShiny } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getPokemon = async (id, natureId, shiny) => {
      // react lint says this is better, me monkey, believes it
      setPokemon(null);
      try {
        const pokemonInfo = await getPokemonInfo(id);
        const pokedexInfo = await getPokedexInfo(id);
        const natureInfo = await getNatureInfo(natureId);
        const abilityInfo = await __getAbility(pokemonInfo);
        const movesInfo = await __getRandomMoves(pokemonInfo.moves);
        const pokemonImage = await getPokemonImage(pokemonInfo, shiny);
        const pokemon = new PokemonModel(
          pokemonInfo,
          new PokedexModel(pokedexInfo, "en"),
          movesInfo,
          new AbilityModel(abilityInfo, "en"),
          new NatureModel(natureInfo),
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

/**
 * Function that returns a number between the given parameters. Including min, excluding max
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
function __getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Function in charge of getting one random ability from a pokemon. The last one is always the hidden so
 * first we throw a dice between 0 and constants.hiddenAbilityChance and check if its 0.
 *
 * @param {Object} pokemonInfo
 * @returns {Future} returns the requested info of the selected ability without processing it.
 */
async function __getAbility(pokemonInfo) {
  const hiddenAbility = __getRandomInt(0, constants.hiddenAbilityChance) === 0;
  let ability = 1;
  if (hiddenAbility) {
    ability =
      pokemonInfo.abilities[pokemonInfo.abilities.length - 1].ability.name;
  } else {
    const idx = Math.floor(Math.random() * (pokemonInfo.abilities.length - 1));
    ability = pokemonInfo.abilities[idx].ability.name;
  }
  return getAbilityInfo(ability);
}

/**
 * Function in charge of getting a maximum of four moves from a pokemon.
 *
 * @param {Object} pokemonInfo
 * @returns {List(MoveModel)} returns the requested info of the selected ability processing it.
 */
async function __getRandomMoves(possibleMoves) {
  const moves = [];
  while (moves.length < 4 && possibleMoves.length > 0) {
    let m = possibleMoves.splice(
      Math.floor(Math.random() * possibleMoves.length),
      1
    )[0].move;
    moves.push(new MoveModel(await getMoveInfo(m.name), "en"));
  }
  return moves;
}
