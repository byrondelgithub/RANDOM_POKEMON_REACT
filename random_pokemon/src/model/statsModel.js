export class StatsModel {
  base_stat = 45;
  name = "";

  constructor(statJSON) {
    this.base_stat = statJSON.base_stat;
    this.name = statJSON.stat.name;
  }
}
