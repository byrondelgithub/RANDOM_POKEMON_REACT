import { useEffect, useState } from "react";
import { Box, Flex, Spacer, Heading, Center, Link, Image } from "@chakra-ui/react"
import pokeballImg from '../../assets/imgs/half_pokeball.png';
import './header.scss';

function Header() {
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => {
            if (window.scrollY > 100) {
                setScrolled(true)
                console.log("hola")
            } else {
                setScrolled(false)
            }
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <>
            <Box h={!isScrolled ? "80px" : "55px"} w={"100%"} transition={"0.3s"} bgColor={"pokemon.red"} borderBottom={"4px black solid"} className="pokeheader" position={"fixed"}>
                <Flex h={"100%"} w={"100%"} justify="center" align="flex-end" position={"absolute"}>
                    <Image transition={"0.3s"} src={pokeballImg} alt='pokeball' h={!isScrolled ? "45px" : "35px"} />
                </Flex>
                <Flex h={"100%"} padding={"20px"} position={"absolute"}>
                    <Center>
                        <Link href="/" _hover={{ textDecoration: "none" }}>
                            <Heading transition={"0.3s"} size={!isScrolled ? "lg" : "md"}>Random pokemon generator</Heading>
                        </Link>
                    </Center>
                    <Spacer />
                </Flex>
            </Box>
            <p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p>
        </>
    );
}

export default Header;
