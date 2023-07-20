import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react";
import { MdHelp } from "react-icons/md";

function HelpPopover({ title, body, footer, size = 40 }) {
  const { colorMode } = useColorMode();

  const color = colorMode === "light" ? "black" : "white";
  const bgColor = colorMode === "light" ? "grey" : "";

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <IconButton
            variant={"unstyled"}
            aria-label={"Help"}
            transition={"0.2s"}
            _hover={{ fontSize: size + size / 10 }}
            fontSize={size}
            color={color}
            icon={<MdHelp />}
          />
        </PopoverTrigger>
        <PopoverContent border={bgColor ? `1px ${bgColor} solid` : ""}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{title}</PopoverHeader>
          <PopoverBody>{body}</PopoverBody>
          <PopoverFooter>{footer}</PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default HelpPopover;
