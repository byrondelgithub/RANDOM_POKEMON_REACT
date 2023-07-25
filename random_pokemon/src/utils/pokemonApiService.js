/**
 * @file File with global asynchronous functions to get information from differents APIs, all of this functions uses axios to request info.
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports getPokemonInfo
 * @exports getNatureInfo
 * @exports getPokedexInfo
 * @exports getAbilityInfo
 * @exports getMoveInfo
 * @exports getPokemonImage
 */
import axios from "axios";
import constants from "../data/constants";

/**
 * Function that returns general information about a Pokemon using pokeAPI API. Some of this information is processed like the name
 * which has a complex proccess to delete slashes so images can be found using other APIs.
 * Some pokemons also have different names depending of its form, Deoxys for example {@link https://pokeapi.co/api/v2/deoxys-normal} has a different name
 * useless when getting the image, this is also fixed here.
 * @function
 * @async
 * @param {Number|string} pokemonId Pokemon id or name (not reccomended)
 * @returns {Object} Processed responsed of the get request
 * @example
 * const pokeInfo = await getPokemonInfo(1)
 * const pokeInfo2 = await getPokemonInfo("bulbasaur")
 */
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

/**
 * Function that returns the nature information of the natureId given by parameter using pokeAPI API. An example of a request could be {@link https://pokeapi.co/api/v2/nature/sassy} or
 * {@link https://pokeapi.co/api/v2/nature/24}
 * @function
 * @async
 * @param {Number|string} natureId Nature id or name (not reccomended)
 * @returns {Object} Processed responsed of the get request
 * @example
 * const natureInfo = await getNatureInfo(1)
 * const natureInfo2 = await getNatureInfo("sassy")
 */
export const getNatureInfo = async (natureId) => {
  let natureInfo;
  await axios.get(`/pokeapi/nature/${natureId}`).then((response) => {
    natureInfo = response.data;
  });
  return natureInfo;
};

/**
 * Function that returns the pokedex information of a pokemon using the pokemonId given by parameter using pokeAPI API. An example of a request could be {@link https://pokeapi.co/api/v2/pokemon-species/bulbasaur} or
 * {@link https://pokeapi.co/api/v2/pokemon-species/1}
 * @function
 * @async
 * @param {Number|string} pokemonId Pokemon id or name (not reccomended)
 * @returns {Object} Processed responsed of the get request
 * @example
 * const pokedexInfo = await getPokedexInfo(1)
 * const pokedexInfo2 = await getPokedexInfo("bulbasaur")
 */
export const getPokedexInfo = async (pokemonId) => {
  let pokedexInfo;
  await axios.get(`/pokeapi/pokemon-species/${pokemonId}`).then((response) => {
    pokedexInfo = response.data;
  });
  return pokedexInfo;
};

/**
 * Function that returns the ability information of using the ability given by parameter using pokeAPI API. An example of a request could be {@link https://pokeapi.co/api/v2/ability/overgrow} or
 * {@link https://pokeapi.co/api/v2/ability/65}
 * @function
 * @async
 * @param {Number|string} ability Ability id or name (not reccomended)
 * @returns {Object} Processed responsed of the get request
 * @example
 * const abilityInfo = await getAbilityInfo(65)
 * const abilityInfo2 = await getAbilityInfo("overgrow")
 */
export const getAbilityInfo = async (ability) => {
  let abilityInfo;
  await axios.get(`/pokeapi/ability/${ability}`).then((response) => {
    abilityInfo = response.data;
  });
  return abilityInfo;
};

/**
 * Function that returns the move information of using the move given by parameter using pokeAPI API. An example of a request could be {@link https://pokeapi.co/api/v2/move/pound} or
 * {@link https://pokeapi.co/api/v2/move/1}
 * @function
 * @async
 * @param {Number|string} move Move id or name (not reccomended)
 * @returns {Object} Processed responsed of the get request
 * @example
 * const moveInfo = await getMoveInfo(1)
 * const moveInfo2 = await getMoveInfo("pound")
 */
export const getMoveInfo = async (move) => {
  let moveInfo;
  await axios.get(`/pokeapi/move/${move}`).then((response) => {
    moveInfo = response.data;
  });
  return moveInfo;
};

/**
 * Function that get the pokemon Image through a pretty complex and hardcoded proccess, but it always works!
 * The steps of getting and image are the following:
 * - Obtain the processed pokemon name and whether it is shiny or not
 * - First try to get the best quality images (sword and shield big animated sprites) from pkParaiso
 *    - Is it shiny?
 *       - If not the used link is /pkParaiso/espada_escudo/sprites/animados-gigante/${pokemonName}.gif (proxy) example: {@link https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/abomasnow.gif}
 *       - If the pokemon is shiny the used link is /pkParaiso/espada_escudo/sprites/animados-gigante/${pokemonName}-s.gif (proxy) example: {@link https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/abomasnow-s.gif}
 *    - If we got an image we return its list of bytes.
 *  - Second try getting a pokemon x-y sun-moon like animated sprited from projectPokemon (in reality projectPokemon has the same sprites of pkParais bu it just works better)
 *    - Is it shiny?
 *       - If not the used link is /projectPokemon/shiny-sprite/${pokemonName}.gif (proxy) example: {@link https://projectpokemon.org/images/shiny-sprite/bulbasaur.gif}
 *       - If the pokemon is shiny the used link is /projectPokemon/normal-sprite/${pokemonName}.gif (proxy) example: {@link https://projectpokemon.org/images/normal-sprite/bulbasaur.gif}
 *    - If we got an image we return its list of bytes.
 *  - Third and last try, if the pokemon exists in pokeAPI this method should always work, this methos uses pokemons ids instead of names so it is more secure.
 *    - Is it shiny?
 *       - If the pokemon is shiny the used link is https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonInfo.id}.png example: {@link https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png}
 *          - If we got an image we return the image if not we will just retry the non shiny one
 *       - If the pokemon is not shiny or the shiny request failed the used link is https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png example: example: {@link https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png}
 * @function
 * @async
 * @param {Object|PokemonModel} pokemonInfo PokemonInfo JSON or model
 * @param {boolean} shiny Whether the pokemon is shiny or not
 * @returns {BytesList} Blob response of the requests or null
 * @example
 * const id = 1;
 * const pokemonInfo = await getPokemonInfo(id);
 * const pokemonImage = await getPokemonImage(pokemonInfo, true);
 */
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

/**
 * Function to get the blob response of an image request using the given url. It catches all errors and just continues
 * @function
 * @async
 * @param {string} url Url to request
 * @returns {BytesList} Response of the request or null
 */
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
