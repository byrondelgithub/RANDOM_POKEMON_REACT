/**
 * @file File with models about pokemon stats
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports StatModels
 */

/**
 * Model for Pokemon Stats. Official stat calculation formula: ((Base * 2 + IV + (EV/4)) * Level / 100 + 5) * Nmod and (Base * 2 + IV + (EV/4)) * Level / 100 + 10 + Level for hp
 * @example
 * pokemonJSON.stats.forEach((stat) => {
 *    this.stats.push(
 *      new StatsModel(stat, 50, nature.decreasedStat, nature.increasedStat)
 *    );
 *  });
 */
export class StatsModel {
  /**
   * Base stat without doing any formula
   * @type {Number}
   */
  baseStat = 0;
  /**
   * IV of the stat (0-31)
   * @type {Number}
   */
  IV = 0;
  /**
   * Level of the pokemon
   * @type {Number}
   */
  level = 0;
  /**
   * Name of the stat
   * @type {string}
   */
  name = "";
  /**
   * Name of the decreased stat from the nature
   * @type {string}
   */
  decreasedStat = "";
  /**
   * Name of the increased stat from the nature
   * @type {string}
   */
  increasedStat = "";
  /**
   * Minimum possible stat for this pokemon
   * @type {Number}
   */
  minStat = 0;
  /**
   * Maximum possible stat for this pokemon
   * @type {Number}
   */
  maxStat = 0;
  /**
   * Final stat calculated using the official pokemon formula (https://gamefaqs.gamespot.com/boards/696959-pokemon-x/68539129)
   * @link https://gamefaqs.gamespot.com/boards/696959-pokemon-x/68539129
   * @type {Number}
   */
  finalStat = 0;

  /**
   * StatsModel constructor description
   * @param statJSON stat JSON received from pokeAPI
   * @param level level of the pokemon
   * @param decreasedStat name of the decreased stat by nature
   * @param increasedStat name of the increased stat by nature
   */
  constructor(statJSON, level, decreasedStat, increasedStat) {
    this.baseStat = statJSON.base_stat;
    this.level = level;
    this.IV = Math.floor(Math.random() * 32); // here we get a random IV
    this.name = statJSON.stat.name;
    this.decreasedStat = decreasedStat;
    this.increasedStat = increasedStat;

    let natureModifier = 1;
    if (this.decreasedStat && this.name === this.decreasedStat.name) {
      natureModifier = 0.9;
    } else if (this.increasedStat && this.name === this.increasedStat.name) {
      natureModifier = 1.1;
    }

    this.finalStat = this.__calculateStat(
      this.name,
      this.baseStat,
      this.IV,
      this.level,
      natureModifier
    );

    this.minStat = this.__calculateStat(this.name, this.baseStat, 0, 1, 0.9);
    this.maxStat = this.__calculateStat(this.name, this.baseStat, 31, 100, 1.1);

    this.name = this.name.replace("special-", "Sp. "); // Name shorten for Special attack and Special defense
  }

  /**
   * Function to calculate a stat using its base stat, IV, level of the pokemon and nature (HP has a different formula)
   * Please check the formulas and its explanations here: {@link https://gamefaqs.gamespot.com/boards/696959-pokemon-x/68539129}
   * @function
   * @param {string} name Name of the stat
   * @param {Number} baseStat Base stat of the pokemon
   * @param {Number} IV IV of the stat
   * @param {Number} level Level of the pokemon
   * @param {Number} natureModifier Nature modifier for this stat (1, 1.1 or 0.9)
   * @returns {Number} Stat calculated
   */
  __calculateStat(name, baseStat, IV, level, natureModifier) {
    if (name !== "hp") {
      return Math.floor(
        (((baseStat * 2 + IV) * level) / 100 + 5) * natureModifier
      );
    } else {
      return Math.floor(((baseStat * 2 + IV) * 50) / 100 + 10 + level);
    }
  }
}
