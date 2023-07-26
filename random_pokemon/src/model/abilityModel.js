/**
 * @file File with models about pokemon abilities
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports AbilityModel
 */

/**
 * Model for Pokemon Abilities JSON obtained from pokeAPI
 * @example
 * const name = "overgrow"
 * const ability = new AbilityModel(await getAbilityInfo(name))
 */
export class AbilityModel {
  /**
   * List of all of the descriptions of the ability.
   * @type {List}
   */
  abilityEntries = [];
  /**
   * Id of the ability.
   * @type {Number}
   */
  id = 0;
  /**
   * Name of the ability.
   * @type {string}
   */
  name = "";

  /**
   * AbilityModel constructor description
   * @param {Object} abilityJSON ability JSON received from pokeAPI
   * @param {string} language language to filter the effetc_entries
   */
  constructor(abilityJSON, language) {
    if (abilityJSON.effect_entries.length) {
      // filter the entries so only the ones with the selected language stays
      this.abilityEntries = abilityJSON.effect_entries.filter(
        (entry) => entry.language.name === language
      );
    } else {
      // If there are no entries for this pokemon a default one is added
      this.abilityEntries.push({
        effect: "No description for this ability could be found.",
      });
    }
    this.id = abilityJSON.id;
    this.name = abilityJSON.name;
  }
}
