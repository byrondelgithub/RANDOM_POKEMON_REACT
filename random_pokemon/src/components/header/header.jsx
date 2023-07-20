import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Center,
  Image,
  Collapse,
  LinkBox,
  LinkOverlay,
  Hide,
  Show,
  useBoolean,
  useColorMode,
} from "@chakra-ui/react";
import pokeballImg from "../../assets/imgs/half_pokeball.png";
import logo from "../../assets/imgs/logo.png";
import "./header.scss";
import CollapseContent from "./collapseContent";
import HeaderLg from "./header-lg";
import HeaderSm from "./header-sm";

function Header() {
  const [isScrolled, setScrolled] = useState(false);
  const [aboutIsOpen, aboutSetOpen] = useBoolean();
  const { colorMode } = useColorMode();

  const sizeBreakpoint = "(max-width: 1300px)";

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const headerSize = !isScrolled ? ["105px", "80px"] : ["70px", "55px"];

  return (
    <>
      <Box
        h={headerSize}
        w={"100%"}
        transition={"0.3s"}
        bgColor={"pokemon.red"}
        borderBottom={`4px black solid`}
        className="pokeheader"
        position={"fixed"}
        zIndex={1000}
      >
        <Flex
          h={"100%"}
          w={"100%"}
          justify="center"
          align="flex-end"
          position={"absolute"}
        >
          <Image
            transition={"0.3s"}
            src={pokeballImg}
            alt="pokeball"
            h={!isScrolled ? ["50px", "45px"] : ["35px", "30px"]}
          />
        </Flex>
        <Flex h={"100%"} w={"100%"} padding={"20px"} position={"absolute"}>
          <LinkBox flexDirection={"row"} display={"flex"}>
            <Center>
              <LinkOverlay href="/">
                <Image
                  transition={"0.3s"}
                  src={logo}
                  alt="pokeball interrogation logo"
                  h={!isScrolled ? ["80px", "65px"] : ["60px", "50px"]}
                />
              </LinkOverlay>
            </Center>
            <Hide breakpoint="(max-width: 1100px)">
              <Center>
                <LinkOverlay
                  href="/"
                  _hover={{ textDecoration: "none" }}
                  marginLeft={"10px"}
                >
                  <Heading
                    transition={"0.3s"}
                    size={!isScrolled ? "lg" : "md"}
                    color={"black"}
                  >
                    Random pokemon generator
                  </Heading>
                </LinkOverlay>
              </Center>
            </Hide>
          </LinkBox>

          <Spacer />

          <Hide breakpoint={sizeBreakpoint}>
            <HeaderLg aboutIsOpen={aboutIsOpen} aboutSetOpen={aboutSetOpen} />
          </Hide>

          <Show breakpoint={sizeBreakpoint}>
            <HeaderSm aboutIsOpen={aboutIsOpen} aboutSetOpen={aboutSetOpen} />
          </Show>
        </Flex>
      </Box>

      <Hide breakpoint={sizeBreakpoint}>
        {" "}
        {/*I cant do anything sorry, cant join both hides*/}
        <Collapse in={aboutIsOpen}>
          <Box
            marginTop={headerSize}
            position={"fixed"}
            transition={"0.3s"}
            w={"100%"}
            borderBottom={`3.5px ${
              colorMode === "light" ? "black" : "white"
            } solid`}
            bg={colorMode === "light" ? "secondary.100" : "secondary.900"}
            textAlign={"center"}
            paddingY={"20px"}
            paddingX={"30%"}
          >
            <CollapseContent />
          </Box>
        </Collapse>
      </Hide>
      <Box paddingTop={headerSize}></Box>
    </>
  );
}

export default Header;
