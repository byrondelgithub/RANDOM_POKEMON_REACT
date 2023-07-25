/**
 * @file File with the hook of the header content shown when the size of the screen is larger than small.
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports HeaderLg
 */
import {
  Button,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
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
import { VscGithubInverted } from "react-icons/vsc";

/**
 * Content of Headers larger than small.
 * @returns {Component}
 */
function HeaderLg({ aboutIsOpen, aboutSetOpen }) {
  const [searchValue, setSearchValue] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
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
      <Center marginRight={"5px"}>
        <HelpPopover
          title={"Pokemon search help."}
          body={`You can search for any existing pokemon using its id from the pokedex. We have support for all of the ${constants.totalPokemons} pokemons out there!`}
        />
      </Center>
      <Center marginRight={"20px"}>
        <InputGroup>
          <InputLeftElement marginTop={"1%"} pointerEvents={"none"}>
            <TbPokeball fontSize={"25px"} />
          </InputLeftElement>
          <Input
            placeholder="Search Pokemon by id"
            _placeholder={{
              opacity: 0.5,
              color: colorMode === "light" ? "black" : "white",
            }}
            type="number"
            bg={colorMode === "light" ? "white" : "black"}
            size="lg"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyUp={(e) => {
              if (e.key === "Enter" && searchValue !== "") {
                navigate(searchValue);
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
                }
              }}
            />
          </InputRightElement>
        </InputGroup>
      </Center>
      <Link target="_blank" href="https://github.com/byrondelgithub">
        <Center>
          <IconButton
            variant={"link"}
            color={"black"}
            transition={"0.3s"}
            _hover={{ fontSize: "37px" }}
            aria-label={"Github"}
            fontSize="35px"
            icon={<VscGithubInverted />}
            marginRight={"20px"}
          />
        </Center>
      </Link>
      <Center>
        <Button
          color={"black"}
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
          marginRight={"15px"}
          onClick={aboutSetOpen.toggle}
        >
          About
        </Button>
      </Center>
      <Center>
        <IconButton
          aria-label="Toggle light dark mode"
          fontSize={"35px"}
          color={colorMode === "light" ? "black" : "white"}
          variant={"unstyled"}
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <BsFillMoonFill /> : <BsSunFill />}
        />
      </Center>
    </>
  );
}

export default HeaderLg;
