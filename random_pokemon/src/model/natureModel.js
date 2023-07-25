/**
 * @file File with models about pokemon natures
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports NatureModel
 */

/**
 * Model for Pokemon natures JSON obtained from pokeAPI
 * @example
 * const name = "sassy"
 * const nature = new NatureModel(await getNatureInfo(name))
 */
export class NatureModel {
  /**
   * Id of the nature
   * @type {Number}
   */
  id = 0;
  /**
   * Name of the nature
   * @type {Number}
   */
  name = "";
  /**
   * decreased stat of the nature
   * @type {Object}
   */
  decreasedStat = null;
  /**
   * increased stat of the nature
   * @type {Object}
   */
  increasedStat = null;

  /**
   * NatureModel constructor description
   * @param {Object} natureJSON nature JSON received from pokeAPI
   */
  constructor(natureJSON) {
    this.id = natureJSON.id;
    this.name = natureJSON.name;
    this.decreasedStat = natureJSON.decreased_stat;
    this.increasedStat = natureJSON.increased_stat;
  }
}
