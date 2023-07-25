/**
 * @file File with models about pokedex descriptions
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports PokedexModel
 */

/**
 * Model for pokedex descriptions JSON obtained from pokeAPI
 * @example
 * const id = 1
 * const pokedex = new PokedexModel(await getPokedexInfo(id))
 */
export class PokedexModel {
  /**
   * List of all of the pokedex intros for a pokemon
   * @type {List}
   */
  pokedexEntries = [];
  /**
   * Whether the pokemon can have gender or not
   * @type {boolean}
   */
  genderLess = false;
  /**
   * Whether the pokemon is a baby or not
   * @type {boolean}
   */
  isBaby = false;
  /**
   * Whether the pokemon is legendary or not
   * @type {boolean}
   */
  isLegendary = false;
  /**
   * Whether the pokemon is mythical or not
   * @type {boolean}
   */
  isMythical = false;

  /**
   * PokedexModel constructor description
   * @param {Object} pokedexJSON pokedex JSON received from pokeAPI
   */
  constructor(pokedexJSON, language) {
    if (pokedexJSON.flavor_text_entries.length) {
      this.pokedexEntries = pokedexJSON.flavor_text_entries.filter(
        // filter the entries so only the ones with the selected language stays
        (entry) => entry.language.name === language
      );
    } else {
      // If there are no entries for this pokemon a default one is added
      this.pokedexEntries.push({
        flavor_text: "No pokedex intro for this pokemon could be found.",
      });
    }
    this.genderLess = pokedexJSON.gender_rate === -1;
    this.isBaby = pokedexJSON.is_baby;
    this.isLegendary = pokedexJSON.is_legendary;
    this.isMythical = pokedexJSON.is_mythical;
  }
}
