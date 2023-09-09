/**
 * @file File with the hook of a HelpPopover template.
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports HelpPopover
 */
import {
  Box,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import "./extraInfo.scss";
import { TbPokeball } from "react-icons/tb";

/**
 * Components that serves as a simple template for buttons that when clicked show a small popover with extra information.
 * @returns {Component}
 */
function ExtraInfo() {
  const { colorMode } = useColorMode();

  const color = colorMode === "light" ? "black" : "white";

  return (
    <>
      <Box
        paddingX={["10px", "100px"]}
        height={"92%"}
        overflow={"auto"}
        className={"text"}
      >
        <Heading
          as="h1"
          size={["xl", "3xl"]}
          textAlign={"center"}
          className={"text"}
        >
          RANDOM POKEMON GENERATOR
        </Heading>
        <Heading
          as="h2"
          size={["lg", "xl"]}
          textAlign={"center"}
          className={"text"}
        >
          THE BEST ONLINE POKEMON GENERATOR
        </Heading>
        <Heading
          as="h3"
          size={["md", "lg"]}
          textAlign={"center"}
          color={"gray"}
          className={"text"}
        >
          Get a new pokemon every time you refresh the page!
        </Heading>
        <Heading
          as="h2"
          textAlign={["center", "left"]}
          size={["lg", "xl"]}
          marginTop={"20px"}
          className={"text"}
        >
          Best sprite possible
        </Heading>
        <Text
          textAlign={["center", "left"]}
          fontSize={[16, 20]}
          marginLeft={["", "30px"]}
          className={"text"}
        >
          Random pokemon generator searches among the sprites of all the pokémon
          games to find the one with the most quality. You can even get a shiny
          one if you are lucky! <br /> If the pokemon is in pokemon sword or
          higher you will get a 3D HD pokemon model, if not, the sprite of sun
          and moon will be shown instead. Cool right? There is no other tool
          like this out there.
        </Text>
        <Heading
          as="h2"
          textAlign={["center", "left"]}
          size={["lg", "xl"]}
          marginTop={"20px"}
          className={"text"}
        >
          Pokemons from all the generations
        </Heading>
        <Text
          textAlign={["center", "left"]}
          fontSize={[16, 20]}
          marginLeft={["", "30px"]}
          className={"text"}
        >
          We offer pokemons from first generation to ninth generation, even
          singular, mythical and legendary pokemons!
        </Text>
        <Heading
          as="h2"
          textAlign={["center", "left"]}
          size={["lg", "xl"]}
          marginTop={"20px"}
          className={"text"}
        >
          All the possible information of a pokémon
        </Heading>
        <Text
          textAlign={["center", "left"]}
          fontSize={[16, 20]}
          marginLeft={["", "30px"]}
          className={"text"}
        >
          This tool gives more information than a pokedex. Each time you get a
          new pokemon you can see:
        </Text>
        <List
          marginLeft={["", "60px"]}
          marginTop={2}
          fontSize={[16, 20]}
          className={"text"}
        >
          <ListItem>
            <ListIcon as={TbPokeball} />
            Pokémon name.
          </ListItem>
          <ListItem>
            <ListIcon as={TbPokeball} />
            Pokémon ID.
          </ListItem>
          <ListItem>
            <ListIcon as={TbPokeball} />
            Pokémon gender.
          </ListItem>
          <ListItem>
            <ListIcon as={TbPokeball} />
            Pokémon types.
          </ListItem>
          <ListItem>
            <ListIcon as={TbPokeball} />
            Random nature with its description, this will affect the stats.
          </ListItem>
          <ListItem>
            <ListIcon as={TbPokeball} />
            Random ability (sometimes you can even get the hidden ability!).
          </ListItem>
          <ListItem>
            <ListIcon as={TbPokeball} />
            Pokémon height.
          </ListItem>
          <ListItem>
            <ListIcon as={TbPokeball} />
            Pokémon weight.
          </ListItem>
          <ListItem>
            <ListIcon as={TbPokeball} />
            Random pokémon moves.
          </ListItem>
          <ListItem>
            <ListIcon as={TbPokeball} />
            Random stats calculated like in the official games!
          </ListItem>
        </List>
        <Heading
          as="h2"
          textAlign={["center", "left"]}
          size={["lg", "xl"]}
          marginTop={"20px"}
          className={"text"}
        >
          Search for an specific pokémon
        </Heading>
        <Text
          textAlign={["center", "left"]}
          fontSize={[16, 20]}
          marginLeft={["", "30px"]}
          className={"text"}
        >
          You can get rid of the random factor and just get the pokemon that you
          want. You will still get the random ability, moves, stats and the
          possibility of a shiny tho.
          <br /> You can use the searcher or just write in the url like this:
          <br /> https://random-poke-generator.com/4 or
          https://random-poke-generator.com/charmander to get a charmander.
          <br />
          There is a small easter egg to get an assured shiny, search for it!
        </Text>
        <Heading
          as="h2"
          textAlign={["center", "left"]}
          size={["lg", "xl"]}
          marginTop={"20px"}
          className={"text"}
        >
          Create your random pokémon team
        </Heading>
        <Text
          textAlign={["center", "left"]}
          fontSize={[16, 20]}
          marginLeft={["", "30px"]}
          className={"text"}
        >
          Refresh the page 6 times and you will end with a full pokemon team to
          play in a pokemon showdown with your friends or to use It in a new
          adventure. Be as creative as you can and have fun!
        </Text>
        <Heading
          as="h2"
          textAlign={["center", "left"]}
          size={["lg", "xl"]}
          marginTop={"20px"}
          className={"text"}
        >
          How do we get this information?
        </Heading>
        <Text
          textAlign={["center", "left"]}
          fontSize={[16, 20]}
          marginLeft={["", "30px"]}
          className={"text"}
        >
          We use multiples APIs to assure that the best sprite and information
          is given:
          <List
            marginLeft={["", "60px"]}
            marginTop={2}
            fontSize={[16, 20]}
            className={"text"}
          >
            <ListItem>
              <ListIcon as={TbPokeball} />
              <Link href="https://pokeapi.co">https://pokeapi.co</Link>for
              pokemon information and pokemon drawings.
            </ListItem>
            <ListItem>
              <ListIcon as={TbPokeball} />
              <Link href="https://pkparaiso.com">https://pkparaiso.com</Link>
              for 3D HD animated pokemon sprites.
            </ListItem>
            <ListItem>
              <ListIcon as={TbPokeball} />
              <Link href="https://projectpokemon.org">
                https://projectpokemon.org
              </Link>
              for animated pokemon sprites.
            </ListItem>
          </List>
          <br></br>
          Check out all of these pages, they are pokemon lovers like you! (And
          they do a lot of work just for projects like this to be created)
        </Text>
        <Heading
          as="h2"
          textAlign={["center", "left"]}
          size={["lg", "xl"]}
          marginTop={"20px"}
          className={"text"}
        >
          Who created this?
        </Heading>
        <Text
          textAlign={["center", "left"]}
          fontSize={[16, 20]}
          marginLeft={["", "30px"]}
          className={"text"}
        >
          Hello! byronhurtado here, the creator of this page. My real name is
          Rubén Hurtado Portillo and I’m a junior developer. I create these
          types of projects for fun and to get into new technologies.
          <br /> For example this page was created to understand react and
          chakra ui.
          <br /> You can find me in github as byrondelgithub or in linkedin as
          Rubén Hurtado Portillo.
          <br /> Check out my other big project called SILENCE PLS ( juego de
          retos ) on the play store.
        </Text>
      </Box>
    </>
  );
}

export default ExtraInfo;
