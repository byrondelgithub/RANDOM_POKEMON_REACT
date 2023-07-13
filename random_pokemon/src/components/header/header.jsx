import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Center,
  Link,
  Image,
  Button,
  Collapse,
  IconButton,
  LinkBox,
  LinkOverlay,
  Hide,
  Show,
  useBoolean,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  DrawerFooter,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import { VscGithubInverted, VscThreeBars } from "react-icons/vsc";
import pokeballImg from "../../assets/imgs/half_pokeball.png";
import logo from "../../assets/imgs/logo.png";
import "./header.scss";
import CollapseContent from "./collapseContent";

function Header() {
  const [isScrolled, setScrolled] = useState(false);
  const [aboutIsOpen, aboutSetOpen] = useBoolean();
  const [drawerIsOpen, drawerSetOpen] = useBoolean();

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
        borderBottom={"4px black solid"}
        className="pokeheader"
        position={"fixed"}
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
                  <Heading transition={"0.3s"} size={!isScrolled ? "lg" : "md"}>
                    Random pokemon generator
                  </Heading>
                </LinkOverlay>
              </Center>
            </Hide>
          </LinkBox>
          <Spacer />
          <Hide below="sm">
            <Center>
              <Link target="_blank" href="https://github.com/byrondelgithub">
                <IconButton
                  variant={"link"}
                  color={"blackAlpha.700"}
                  transition={"0.3s"}
                  _hover={{ color: "black", fontSize: "35px" }}
                  aria-label={"Github"}
                  fontSize="30px"
                  icon={<VscGithubInverted />}
                  marginRight={"20px"}
                />
              </Link>
            </Center>
            <Center>
              <Button
                fontSize={"20px"}
                variant="ghost"
                rightIcon={
                  <MdArrowDropDown
                    size={"25px"}
                    style={{
                      transform: aboutIsOpen ? "rotate(180deg)" : "",
                      transition: "0.3s",
                    }}
                  />
                }
                onClick={aboutSetOpen.toggle}
              >
                About
              </Button>
            </Center>
          </Hide>
          <Show below="sm">
            <Center>
              <Button onClick={drawerSetOpen.on} size={"lg"}>
                <VscThreeBars fontSize={"22px"}></VscThreeBars>
              </Button>
            </Center>
            <Drawer onClose={drawerSetOpen.off} isOpen={drawerIsOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader
                  fontSize={"25px"}
                  bgColor={"pokemon.red"}
                  borderBottom={"3px black solid"}
                >
                  Random Pokemon Generator
                </DrawerHeader>
                <DrawerBody>
                  <Stack>
                    <Link
                      w={"100%"}
                      target="_blank"
                      href="https://github.com/byrondelgithub"
                    >
                      <Button
                        w={"100%"}
                        variant={"ghost"}
                        color={"black"}
                        aria-label={"Github"}
                        fontSize="20px"
                        rightIcon={<VscGithubInverted size={"25px"} />}
                      >
                        My github
                      </Button>
                    </Link>
                    <Button
                      fontSize={"20px"}
                      variant="ghost"
                      rightIcon={
                        <MdArrowDropDown
                          size={"25px"}
                          style={{
                            transform: aboutIsOpen ? "rotate(180deg)" : "",
                            transition: "0.3s",
                          }}
                        />
                      }
                      onClick={aboutSetOpen.toggle}
                    >
                      About
                    </Button>
                    <Collapse in={aboutIsOpen}>
                      <Box
                        transition={"0.3s"}
                        w={"100%"}
                        bg={"secondary.100"}
                        border={"2px black solid"}
                        borderRadius={"10px"}
                        textAlign={"center"}
                        paddingY={"20px"}
                        paddingX={"20px"}
                      >
                        <CollapseContent />
                      </Box>
                    </Collapse>
                  </Stack>
                </DrawerBody>
                <DrawerFooter
                  borderTop={"3px black solid"}
                  bgColor={"pokemon.red"}
                  fontSize={"12px"}
                >
                  Thanks for using my website y viva el betis
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Show>
        </Flex>
      </Box>
      <Hide below="sm">
        <Collapse in={aboutIsOpen}>
          <Box
            marginTop={headerSize}
            position={"fixed"}
            transition={"0.3s"}
            w={"100%"}
            borderBottom={"3.5px black solid"}
            bg={"secondary.100"}
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
