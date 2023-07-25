/**
 * @file File with models about pokemon general information
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports PokemonModel
 */
import { StatsModel } from "./statsModel";

/**
 * Model with all the information of a pokemon, is the combinations of all of the other models + some info from pokeAPI. Please check example
 * @example
 * const pokemonInfo = await getPokemonInfo(id);
 *       const pokedexInfo = await getPokedexInfo(id);
 *       const natureInfo = await getNatureInfo(natureId);
 *       const abilityInfo = await __getAbility(pokemonInfo);
 *       const movesInfo = await __getRandomMoves(pokemonInfo.moves);
 *       const pokemonImage = await getPokemonImage(pokemonInfo, shiny);
 *       const pokemon = new PokemonModel(
 *         pokemonInfo,
 *         new PokedexModel(pokedexInfo, "en"),
 *         movesInfo,
 *         new AbilityModel(abilityInfo, "en"),
 *         new NatureModel(natureInfo),
 *         pokemonImage,
 *         shiny
 *       );
 */
export class PokemonModel {
  /**
   * Id of the pokemon
   * @type {Number}
   */
  id = 0;
  /**
   * Name of the pokemon
   * @type {string}
   */
  name = "";
  /**
   * PokedexModel of the pokemon
   * @type {PokedexModel}
   */
  pokedexInfo = null;
  /**
   * List of MoveModels of the pokemon. Previously filtered to be a maximum of 4 moves
   * @type {List}
   */
  moves = [];
  /**
   * Types of the pokemon
   * @type {List}
   */
  types = [];
  /**
   * List of StatModels of the pokemon
   * @type {List}
   */
  stats = [];
  /**
   * AbilityModel of the pokemon
   * @type {AbilityModel}
   */
  ability = null;
  /**
   * NatureModel of the pokemon
   * @type {NatureModel}
   */
  nature = null; //
  /**
   * Height of the pokemon in decimeters
   * @type {Number}
   */
  height = 0;
  /**
   * Weight of the pokemon in hectogrames
   * @type {Number}
   */
  weight = 0;
  /**
   * Gender of the pokemon (male or female), null if genderless
   * @type {string}
   */
  gender = null;
  /**
   * Image bytes of the pokemon
   * @type {BytesList}
   */
  image = null;
  /**
   * Whether the pokemon is shiny or not
   * @type {boolean}
   */
  isShiny = false; //

  /**
   * PokemonModel constructor description
   * @param {Object} pokemonJSON pokemon JSON received from pokeAPI
   * @param {PokedexModel} pokedexInfo PokedexModel previously created through getPokedexInfo
   * @param {List} movesInfo List of MovesModels previously created through getMoveInfo
   * @param {AbilityModel} abilityInfo AbilityModel previously created through getAbilityInfo
   * @param {NatureModel} nature NatureModel previously created
   * @param {BytesList} image Image bytes previously obtained through getPokemonImage
   * @param {boolean} shiny Whether the pokemon is shiny or not
   */
  constructor(
    pokemonJSON,
    pokedexInfo,
    movesInfo,
    abilityInfo,
    nature,
    image,
    isShiny
  ) {
    this.id = pokemonJSON.id;
    this.name = pokemonJSON.name;
    this.pokedexInfo = pokedexInfo.pokedexEntries[ // We only need the last pokedex intro, we also format it deleting line jumps
      pokedexInfo.pokedexEntries.length - 1
    ].flavor_text
      .replaceAll("\n", " ");
    this.moves = movesInfo;
    pokemonJSON.types.forEach((type) => {
      this.types.push(type.type.name);
    });
    pokemonJSON.stats.forEach((stat) => {
      // We create the StatsModel here because we need some nature info
      this.stats.push(
        new StatsModel(stat, 50, nature.decreasedStat, nature.increasedStat)
      );
    });
    this.ability = abilityInfo;
    this.nature = nature;
    this.height = pokemonJSON.height;
    this.weight = pokemonJSON.weight;
    if (!pokedexInfo.genderLess) {
      const genders = ["male", "female"];
      this.gender = genders[Math.floor(Math.random() * 2)];
    }
    this.image = image;
    this.isShiny = isShiny;
  }
}
