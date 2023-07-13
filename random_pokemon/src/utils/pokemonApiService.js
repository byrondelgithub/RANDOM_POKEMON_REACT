import axios from "axios";
import constants, { pkParaisoGens } from "../data/constants";

export const getPokemonInfo = async (pokemonId) => {
  let pokemonInfo;
  await axios.get(`/pokeapi/pokemon/${pokemonId}`).then((response) => {
    pokemonInfo = response.data;
    const slashPos = pokemonInfo.name.indexOf("-"); // get rid of variants (not for tapus of course)!
    if (slashPos !== -1 && !constants.specialNamesIds.includes(pokemonId)) {
      if (constants.replaceWithDownSlashIds.includes(pokemonId)) {
        pokemonInfo.name = pokemonInfo.name.replaceAll("-", "_");
      } else if (constants.replaceWithPointDownSlashIds.includes(pokemonId)) {
        pokemonInfo.name = pokemonInfo.name.replaceAll("-", "._");
      } else if (constants.deleteSlashIds.includes(pokemonId)) {
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

export const getPokedexInfo = async (pokemonId, language) => {
  let pokedexInfo;
  await axios.get(`/pokeapi/pokemon-species/${pokemonId}`).then((response) => {
    pokedexInfo = response.data;
  });
  return pokedexInfo;
};

export const getPokemonImage = async (pokemonInfo, shiny) => {
  let image;
  let urlName = "";
  const pokemonName = pokemonInfo.name;
  for (let index = 0; index < pkParaisoGens.length; index++) {
    const gen = pkParaisoGens[index];
    if (shiny) {
      urlName = `/pkParaiso/${gen}/sprites/animados/${pokemonName.replace(
        " ",
        "-"
      )}-s.gif`; // first shiny attempt
    } else {
      urlName = `/pkParaiso/${gen}/sprites/${
        gen === "espada_escudo" ? "animados-gigante" : "animados"
      }/${pokemonName.replace(" ", "-")}.gif`; // normal pokemon
    }
    image = await __getImageFromUrl(urlName);
    if (!image && shiny) {
      urlName = `/pkParaiso/${gen}/sprites/animados-shiny/${pokemonName.replace(
        " ",
        "-"
      )}.gif`; // second shiny attempt
      image = await __getImageFromUrl(urlName);
    }

    if (image) {
      return image;
    }
  }

  if (shiny) {
    // last resource for shiny
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
