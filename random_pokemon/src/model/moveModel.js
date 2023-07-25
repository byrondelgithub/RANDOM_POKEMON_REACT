/**
 * @file File with models about pokemon moves
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports MoveModel
 */

/**
 * Model for Pokemon Moves JSON obtained from pokeAPI
 * @example
 * const name = "pound"
 * const move = new MoveModel(await getMoveInfo(name))
 */
export class MoveModel {
  /**
   * List of all of the descriptions of the move.
   * @type {List}
   */
  moveEntries = [];
  /**
   * Id of the move.
   * @type {Number}
   */
  id = 0;
  /**
   * Name of the move.
   * @type {string}
   */
  name = "";
  /**
   * Type of the move.
   * @type {string}
   */
  type = "";
  /**
   * Damage class of the move (special or physical).
   * @type {string}
   */
  damageClass = "";
  /**
   * Power of the move.
   * @type {Number}
   */
  power = 0;
  /**
   * Accuracy of the move.
   * @type {Number}
   */
  accuracy = 0;
  /**
   * PPs of the move.
   * @type {Number}
   */
  pp = 0;

  /**
   * MoveModel constructor description
   * @param {Object} moveJSON move JSON received from pokeAPI
   * @param {string} language language to filter the flavor_text_entries
   */
  constructor(moveJSON, language) {
    if (moveJSON.flavor_text_entries.length) {
      this.moveEntries = moveJSON.flavor_text_entries.filter(
        // filter the entries so only the ones with the selected language stays
        (entry) => entry.language.name === language
      );
    } else {
      // If there are no entries for this pokemon a default one is added
      this.moveEntries.push({
        flavor_text: "No description for this move could be found.",
      });
    }
    this.id = moveJSON.id;
    this.name = moveJSON.name;
    this.type = moveJSON.type.name;
    this.damageClass = moveJSON.damage_class.name;
    this.power = moveJSON.power;
    this.accuracy = moveJSON.accuracy;
    this.pp = moveJSON.pp;
  }
}
