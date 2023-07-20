import { Box, Center, Heading, Image } from "@chakra-ui/react";
import Header from "../header/header";
import { Link, useNavigate } from "react-router-dom";
import errorGif from "../../assets/imgs/black-guy-shocked.gif";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Box w={"100%"} h={"88%"} marginTop={"25px"}>
        <Center flexDirection={"column"} mx={"10%"} textAlign={"center"}>
          <Heading size={"2xl"} marginBottom={5}>
            Oops 404 error I guess
          </Heading>
          <Heading size={"md"}>
            You are probably searching for a pokemon that does exist or trying
            to access places never created.
            <br />
            If you consider this a bug please contact me, you have all of my
            information on my github ;)
            <br />
            <br />
            Click on this guy to get a new random pokemon!
          </Heading>
          <Link style={{ marginTop: 20 }} onClick={() => navigate("/")}>
            <Center>
              <Image
                src={errorGif}
                w={["100%", "1100px"]}
                borderRadius={"20px"}
                transition={"0.2s"}
                _hover={{ w: ["101%", "1130px"] }}
              />
            </Center>
          </Link>
        </Center>
      </Box>
    </>
  );
}

export default ErrorPage;
