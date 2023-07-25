/**
 * @file File with constants used by the entire app, here are some important info, please check the source for more info
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 */

/**
 * Constants exported
 */
module.exports = {
  pokeAPIUrl: "https://pokeapi.co/api/v2/",
  pkParaisoAPIUrl: "https://www.pkparaiso.com/imagenes/",
  projectPokemonAPIUrl: "https://projectpokemon.org/images/",
  totalPokemons: 1010,
  totalNatures: 25,
  hiddenAbilityChance: 10, // one in x
  shinyChance: 50, // one in x
  natureDescriptions: {
    adamant: "Unwilling to change opinion, purpose, or principles; unyielding.",
    bashful: "Shy, self-conscious, and awkward in the presence of others.",
    brave: "Ready to face and endure danger or pain; showing courage.",
    bold: "Showing an ability to take risks; confident and courageous.",
    calm: "Not showing or feeling nervousness, anger, or other emotions.",
    careful:
      "Making sure to avoid potential danger, mishap, or harm; cautious.",
    docile: "Ready to accept control or instruction; submissive.",
    gentle: "Mild in temperament or behavior; kind or tender.",
    hardy:
      "Robust, strong, healthy, and full of energy; capable of enduring difficult conditions.",
    hasty: "Behaving with excessive speed or insufficient consideration.",
    impish: "Inclined to do slightly naughty things for fun; mischievous.",
    jolly: "Happy and cheerful.",
    lax: "Not sufficiently strict, severe, or careful.",
    lonely:
      "Melancoly because one has no friends, company, or companions; solitary.",
    mild: "Gentle and not easily provoked.",
    modest:
      "Unassuming or moderate in the estimation of one's abilities or achievements.",
    naive:
      "Showing a lack of experience, wisdom, or judgement; natural, unaffected, and innocent.",
    naughty: "Disobedient, badly behaved, mildly rude or indecent.",
    quiet:
      "Making little to no noise; behaving discreetly, secretly, or with moderation.",
    quirky: "Characterized by peculiar or unexpected traits.",
    rash: "Behaving with a lack of careful consideration of the possible consequences of actions.",
    relaxed: "Free from tension and anxiety; at ease.",
    sassy:
      "Lively, bold, and fully of spirit; cheeky and impudent in an endearing or amusing way.",
    serious:
      "Solemn, thoughtful, sincere, or urgent in character or manner rather than joking or half-hearted.",
    timid: "Showing a lack of courage or confidence; easily frightened.",
  },
  specialNamesIds: [
    250, 474, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 1001,
    1002, 1003, 1004, 1005, 1006, 1009, 1010,
  ], // These pokemons names wont be processed
  replaceWithDownSlashIds: [29, 32, 439], // These pokemons names slashes will be replaced with down slashes.
  replaceWithPointDownSlashIds: [122, 866], // hese pokemons names slashes will be replaced with a dot and a down slash (only for mr mime idk why).
  deleteSlashIds: [772, 782, 783, 784, 785, 786, 787, 788], // These pokemons names slashes will be deleted but just the slash, not the following content.
};
