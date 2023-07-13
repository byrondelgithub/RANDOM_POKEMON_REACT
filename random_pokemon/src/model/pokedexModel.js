export class PokedexModel {
  pokedexEntries = [];
  genderLess = false;
  isBaby = false;
  isLegendary = false;
  isMythical = false;

  constructor(pokedexJSON, language) {
    this.pokedexEntries = pokedexJSON.flavor_text_entries.filter(
      (entry) => entry.language.name === language
    );
    this.genderLess = pokedexJSON.gender_rate === -1;
    this.isBaby = pokedexJSON.is_baby;
    this.isLegendary = pokedexJSON.is_legendary;
    this.isMythical = pokedexJSON.is_mythical;
  }
}
