import { Image } from "@chakra-ui/react";
import "./loadingSpinner.scss";
import spinner from "../../assets/imgs/pokeball_spinner.png";

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
