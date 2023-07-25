/**
 * @file File with a hook of the component shown when clicking on an about button.
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports CollapseContent
 */
import { Heading, Link, Text } from "@chakra-ui/react";
import "./header.scss";

/**
 * Content of about collapses.
 * @returns {Component}
 */
function CollapseContent() {
  return (
    <>
      <Heading size={"md"}>Who built this?</Heading>
      <Text marginTop={"7px"}>
        This small website have been built by{" "}
        <Link
          href="https://www.linkedin.com/in/rubén-hurtado-portillo-11a46a24a/"
          target="_blank"
          textColor={"pokemon.red"}
        >
          Rubén Hurtado Portillo
        </Link>
        , a junior programmer, to learn how to "properly" use react and try to
        implement ads using GoogleAdMob (dont worry if you are using an
        adBlocker, I dont expect to get money at all).
        <br /> I also wanted to create a page like this to have small battles
        with my friends!.
      </Text>
      <Heading size={"md"} marginTop={"15px"}>
        Credits
      </Heading>
      <Text marginTop={"7px"}>
        Pokemon info is being collected using the incredible API{" "}
        <Link
          href="https://pokeapi.co"
          target="_blank"
          textColor={"pokemon.red"}
        >
          PokeAPI
        </Link>
        .
        <br />
        We get Pokemon GIFs or images using the spanish website{" "}
        <Link
          href="https://pkparaiso.com"
          target="_blank"
          textColor={"pokemon.red"}
        >
          PkParaiso
        </Link>
        and{" "}
        <Link
          href="https://projectpokemon.org"
          target="_blank"
          textColor={"pokemon.red"}
        >
          ProjectPokemon
        </Link>
        .
        <br />
        Please check both of this websites, they are worth of your time I
        promise!
      </Text>
    </>
  );
}

export default CollapseContent;
