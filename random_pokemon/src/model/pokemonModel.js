import { StatsModel } from "./statsModel";

export class PokemonModel {
  id = 0;
  name = "";
  pokedexInfo = null;
  moves = [];
  types = [];
  baseStats = [];
  ability = ""; // 1/250 to be the hidden one
  nature = "";
  height = 0;
  weight = 0;
  gender = null;
  image = null;
  isShiny = false;
  hiddenAbilityFlag = false;

  constructor(
    pokemonJSON,
    pokedexInfo,
    nature,
    image,
    isShiny,
    hiddenAbilityFlag
  ) {
    this.id = pokemonJSON.id; // pokemon id
    this.name = pokemonJSON.name; // pokemon name
    this.pokedexInfo = pokedexInfo.pokedexEntries[
      pokedexInfo.pokedexEntries.length - 1
    ].flavor_text.replaceAll("\n", " ");
    this.__getRandomMoves(pokemonJSON.moves);
    pokemonJSON.types.forEach((type) => {
      // pokemon types
      this.types.push(type.type.name);
    });
    pokemonJSON.stats.forEach((stat) => {
      // pokemon stats
      this.baseStats.push(new StatsModel(stat));
    });
    this.nature = nature; // pokemon nature
    this.height = pokemonJSON.height; // pokemon height
    this.weight = pokemonJSON.weight; // pokemon weight
    if (!pokedexInfo.genderLess) {
      const genders = ["male", "female"];
      this.gender = genders[Math.floor(Math.random() * 2)];
    }
    this.image = image;
    this.isShiny = isShiny;
    this.hiddenAbilityFlag = hiddenAbilityFlag;
    if (hiddenAbilityFlag) {
      this.ability =
        pokemonJSON.abilities[pokemonJSON.abilities.length - 1].ability.name;
    } else {
      const idx = Math.floor(
        Math.random() * (pokemonJSON.abilities.length - 1)
      );
      this.ability = pokemonJSON.abilities[idx].ability.name;
    }
  }

  __getRandomMoves(possibleMoves) {
    this.moves = [];
    while (this.moves.length < 4 && possibleMoves.length > 0) {
      this.moves.push(
        possibleMoves.splice(
          Math.floor(Math.random() * possibleMoves.length),
          1
        )[0].move.name
      );
    }
  }
}
