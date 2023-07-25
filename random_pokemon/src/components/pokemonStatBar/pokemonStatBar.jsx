/**
 * @file File with the hook of the statBar shown in pokemonInfoTable
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports PokemonStatBar
 */

import { Progress, Stack, Text } from "@chakra-ui/react";

/**
 * A Row Stack that has:
 *   - The final stat calculated in StatModel.
 *   - A bar where the value is the percentage of the final to the max Stat. This is calculated using a simple formula: Math.floor((stat.finalStat * 100) / stat.maxStat).
 * The color instead represents how good a baseStat is to the maximum possible baseStat (255): red=bad, yellow=medium, whatsapp=good, green=pretty good.
 *   - The maximum possible stat, also calculated in StatModel.
 * @returns {Component}
 */
function PokemonStatBar({ stat }) {
  const barPercentage = Math.floor((stat.finalStat * 100) / stat.maxStat);
  const colorPercentage = Math.floor((stat.baseStat * 100) / 255);
  let barColor = "blue";
  if (colorPercentage < 25) {
    barColor = "red";
  } else if (colorPercentage < 35) {
    barColor = "yellow";
  } else if (colorPercentage < 45) {
    barColor = "whatsapp";
  } else {
    barColor = "green";
  }
  return (
    <>
      <Stack w={"100%"} direction={"row"} marginTop={2}>
        <Text
          w={["40%", "20%"]}
          textAlign={"center"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          fontWeight={stat.IV === 31 ? "extrabold" : ""}
        >
          {stat.name}
        </Text>
        <Text w={["15%", "10%"]} textAlign={"center"}>
          {stat.finalStat}
        </Text>
        <Progress
          w={["40%", "60%"]}
          h={"100%"}
          colorScheme={barColor}
          value={barPercentage}
          borderRadius={"20px"}
        />
        <Text w={["15%", "10%"]} textAlign={"center"}>
          {stat.maxStat}
        </Text>
      </Stack>
    </>
  );
}

export default PokemonStatBar;
