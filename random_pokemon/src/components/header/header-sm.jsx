import {
  Box,
  Button,
  Center,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useBoolean,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import HelpPopover from "../helpPopover/helpPopover";
import { TbPokeball, TbSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { useState } from "react";
import constants from "../../data/constants";
import { VscGithubInverted, VscThreeBars } from "react-icons/vsc";
import CollapseContent from "./collapseContent";

function HeaderSm({ aboutIsOpen, aboutSetOpen }) {
  const [searchValue, setSearchValue] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const [drawerIsOpen, drawerSetOpen] = useBoolean();
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const val = event.target.value.replaceAll(",", "").replaceAll(".", "");
    if (Number(val) < 1) {
      setSearchValue("");
    } else if (Number(val) > constants.totalPokemons) {
      setSearchValue(constants.totalPokemons.toString());
    } else {
      setSearchValue(val);
    }
  };

  return (
    <>
      <Center>
        <Button
          onClick={drawerSetOpen.on}
          size={"lg"}
          bgColor={colorMode === "light" ? "white" : "#232323"}
        >
          <VscThreeBars fontSize={"22px"} />
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
            color={"black"}
          >
            Random Pokemon Generator
          </DrawerHeader>
          <DrawerBody>
            <Stack>
              <Center>
                <Center marginRight={"5px"}>
                  <HelpPopover
                    title={"Pokemon search help."}
                    body={`You can search for any existing pokemon using its id from the pokedex. We have support for all of the ${constants.totalPokemons} pokemons out there!`}
                  />
                </Center>
                <InputGroup>
                  <InputLeftElement marginTop={"1%"} pointerEvents={"none"}>
                    <TbPokeball fontSize={"25px"} />
                  </InputLeftElement>
                  <Input
                    placeholder="Pokemon id"
                    _placeholder={{
                      opacity: 0.5,
                      color: colorMode === "light" ? "black" : "white",
                    }}
                    type="number"
                    bg={colorMode === "light" ? "white" : "black"}
                    border={colorMode === "light" ? "2px grey solid" : ""}
                    size="lg"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyUp={(e) => {
                      if (e.key === "Enter" && searchValue !== "") {
                        navigate(searchValue);
                        drawerSetOpen.off();
                      }
                    }}
                  />
                  <InputRightElement marginTop={"1%"}>
                    <IconButton
                      aria-label={"Search"}
                      fontSize="30px"
                      icon={<TbSearch />}
                      marginRight={"10px"}
                      onClick={() => {
                        if (searchValue !== "") {
                          navigate(searchValue);
                          drawerSetOpen.off();
                        }
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
              </Center>
              <Button
                variant={"ghost"}
                color={colorMode === "light" ? "black" : "white"}
                onClick={toggleColorMode}
                fontSize="20px"
                rightIcon={
                  colorMode === "light" ? <BsFillMoonFill /> : <BsSunFill />
                }
              >
                {colorMode === "light" ? "Dark" : "Light"}
              </Button>
              <Link
                w={"100%"}
                target="_blank"
                href="https://github.com/byrondelgithub"
              >
                <Button
                  w={"100%"}
                  variant={"ghost"}
                  color={`${colorMode === "light" ? "black" : "white"}`}
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
                  bg={colorMode === "light" ? "secondary.100" : "secondary.900"}
                  border={`2px ${
                    colorMode === "light" ? "black" : "white"
                  } solid`}
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
    </>
  );
}

export default HeaderSm;
