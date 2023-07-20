import axios from "axios";
import constants from "../data/constants";

export const getPokemonInfo = async (pokemonId) => {
  let pokemonInfo;
  await axios.get(`/pokeapi/pokemon/${pokemonId}`).then((response) => {
    pokemonInfo = response.data;
    const slashPos = pokemonInfo.name.indexOf("-"); // get rid of variants or bad names
    if (
      slashPos !== -1 &&
      !constants.specialNamesIds.includes(pokemonInfo.id)
    ) {
      if (constants.replaceWithDownSlashIds.includes(pokemonInfo.id)) {
        pokemonInfo.name = pokemonInfo.name.replaceAll("-", "_");
      } else if (
        constants.replaceWithPointDownSlashIds.includes(pokemonInfo.id)
      ) {
        pokemonInfo.name = pokemonInfo.name.replaceAll("-", "._");
      } else if (constants.deleteSlashIds.includes(pokemonInfo.id)) {
        pokemonInfo.name = pokemonInfo.name.replaceAll("-", "");
      } else {
        pokemonInfo.name = pokemonInfo.name.substring(0, slashPos);
      }
    }
  });
  return pokemonInfo;
};

export const getNatureInfo = async (natureId) => {
  let natureInfo;
  await axios.get(`/pokeapi/nature/${natureId}`).then((response) => {
    natureInfo = response.data;
  });
  return natureInfo;
};

export const getPokedexInfo = async (pokemonId) => {
  let pokedexInfo;
  await axios.get(`/pokeapi/pokemon-species/${pokemonId}`).then((response) => {
    pokedexInfo = response.data;
  });
  return pokedexInfo;
};

export const getAbilityInfo = async (ability) => {
  let pokedexInfo;
  await axios.get(`/pokeapi/ability/${ability}`).then((response) => {
    pokedexInfo = response.data;
  });
  return pokedexInfo;
};

export const getPokemonImage = async (pokemonInfo, shiny) => {
  let image;
  const pokemonName = pokemonInfo.name;
  let urlName = shiny
    ? `/pkParaiso/espada_escudo/sprites/animados-gigante/${pokemonName}-s.gif`
    : `/pkParaiso/espada_escudo/sprites/animados-gigante/${pokemonName}.gif`; // pkParaiso Sword and shield attempt (sometimes down or dont exists)

  image = await __getImageFromUrl(urlName);
  if (image) {
    return image;
  }

  urlName = shiny
    ? `/projectPokemon/shiny-sprite/${pokemonName}.gif`
    : `/projectPokemon/normal-sprite/${pokemonName}.gif`; // projectPokemon attempt ( all sprites except gen 9>, always up )

  image = await __getImageFromUrl(urlName);
  if (image) {
    return image;
  }

  if (shiny) {
    // official art attempt ( all sprites except for some shinies, always up )
    image = await __getImageFromUrl(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonInfo.id}.png`
    );
  }
  if (!image) {
    // last chance for not found shinies and non shinies
    image = await __getImageFromUrl(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`
    );
  }

  return image;
};

async function __getImageFromUrl(url) {
  let image;
  await axios
    .get(url, { responseType: "blob" })
    .then((response) => {
      image = response.data;
    })
    .catch((e) => {});
  return image;
}
