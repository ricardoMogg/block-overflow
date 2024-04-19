import { HStack, Box, Text, Spacer } from "@chakra-ui/react";
import { memo } from "react";
import SignInButton from "./SignInButton";

const NavBar = memo(function NavBar() {
  return (
    <HStack height="72px">
      <Box>
        <Text
          fontFamily="monospace"
          fontSize="x-large"
          color="white"
          fontWeight="bold"
        >
          BasedOverflow
        </Text>
      </Box>
      <Spacer />
      <SignInButton />
    </HStack>
  );
});

export default NavBar;
