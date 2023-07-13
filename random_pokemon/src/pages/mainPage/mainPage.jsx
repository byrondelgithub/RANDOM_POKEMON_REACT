import React, { useState } from "react";
import Header from "../../components/header/header";
import {
  getNatureInfo,
  getPokemonImage,
  getPokedexInfo,
  getPokemonInfo,
} from "../../utils/pokemonApiService";
import { PokemonModel } from "../../model/pokemonModel";
import constants from "../../data/constants";
import { PokedexModel } from "../../model/pokedexModel";
import PokemonInfoLayout from "../../components/pokemonInfoLayout/pokemonInfoLayout";

function MainPage() {
  const [pokemon, setPokemon] = useState(null);

  React.useEffect(() => {
    const pokeId = __getRandomInt(1, constants.totalPokemons + 1);
    const natureId = __getRandomInt(1, constants.totalNatures + 1);
    const isShiny = __getRandomInt(0, constants.shinyChance) === 0;
    const hiddenAbility =
      __getRandomInt(0, constants.hiddenAbilityChance) === 0;
    getPokemon(pokeId, natureId, isShiny, hiddenAbility);
  }, []);

  const getPokemon = async (id, natureId, shiny, hiddenAbility) => {
    const pokemoninfo = await getPokemonInfo(id);
    const pokedexInfo = await getPokedexInfo(id, "en");
    const natureInfo = await getNatureInfo(natureId);
    const pokemonImage = await getPokemonImage(pokemoninfo, shiny);
    const pokemon = new PokemonModel(
      pokemoninfo,
      new PokedexModel(pokedexInfo, "en"),
      natureInfo.name,
      pokemonImage,
      shiny,
      hiddenAbility
    );
    setPokemon(pokemon);
  };

  return (
    <>
      <Header />
      <PokemonInfoLayout pokemonInfo={pokemon} />
    </>
  );
}

export default MainPage;

function __getRandomInt(min, max) {
  // including min, excluding max
  return Math.floor(Math.random() * (max - min)) + min;
}
