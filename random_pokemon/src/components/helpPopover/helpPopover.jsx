/**
 * @file File with the hook of a HelpPopover template.
 * @author Rubén Hurtado <rhurtadoportillo@gmail.com>
 * @exports HelpPopover
 */
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

/**
 * Components that serves as a simple template for buttons that when clicked show a small popover with extra information.
 * @returns {Component}
 */
function HelpPopover({ title, body, footer, size = 40 }) {
  const { colorMode } = useColorMode();

  const color = colorMode === "light" ? "black" : "white";
  const borderColor = colorMode === "light" ? "lightgrey" : "";

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
        <PopoverContent border={borderColor ? `1px ${borderColor} solid` : ""}>
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
