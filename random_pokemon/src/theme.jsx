/**
 * @file File with entire theme configuration used by chakra
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports theme
 */

import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const light = "#f0f0f0";
const dark = "#232323";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
    disableTransitionOnChange: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode(light, dark)(props),
      },
    }),
  },
  fonts: {
    heading: `'Noto Sans', sans-serif`,
    body: `'Raleway Variable', sans-serif`,
  },
  colors: {
    pokemon: {
      red: "#ee1515",
    },
    type: {
      poison: "#974397",
      steel: "#beb8bf",
      fairy: "#d5a6cf",
      fighting: "#be2e23",
      dragon: "#6838e6",
      dark: "#6a563e",
      fire: "#ef8026",
      ground: "#d7be6f",
      ice: "#92dace",
      rock: "#bb9f33",
      bug: "#aab420",
      psychic: "#ee547c",
      ghost: "#6c5a8b",
      water: "#5d8ee4",
      grass: "#70ca4f",
      flying: "#b0a6e6",
      electric: "#e5d33e",
      normal: "#a6aa79",
    },
    secondary: {
      100: "#E4E4E4",
      200: "#AAAAAA",
      300: "#8A8A8A",
      400: "#727272",
      900: "#222222",
    },
  },
});

export default theme;
