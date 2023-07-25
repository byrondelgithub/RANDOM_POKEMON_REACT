/**
 * @file File with the hook of a loadinSpinner used in pokemonImage component.
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports LoadinSpinner
 */
import { Image } from "@chakra-ui/react";
import "./loadingSpinner.scss";
import spinner from "../../assets/imgs/pokeball_spinner.png";

/**
 * Component with a spinning pokeball image used in pokemonImage while the image is undefined.
 * @returns {Component}
 */
function LoadinSpinner({ size, duration }) {
  return (
    <>
      <Image
        src={spinner}
        animation={`rotation ${duration}s infinite linear`}
        w={size}
      ></Image>
    </>
  );
}

export default LoadinSpinner;
