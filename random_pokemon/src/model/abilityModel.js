export class AbilityModel {
  abilityEntries = [];
  id = 0;
  name = "";

  constructor(abilityJSON, language) {
    this.abilityEntries = abilityJSON.effect_entries.filter(
      (entry) => entry.language.name === language
    );
    this.id = abilityJSON.id;
    this.name = abilityJSON.name;
  }
}
