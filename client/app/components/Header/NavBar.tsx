"use client";
import { HStack, Box, Text, Spacer } from "@chakra-ui/react";
import { memo } from "react";
import SignInButton from "./SignInButton";
import { useRouter } from "next/navigation";

const NavBar = memo(function NavBar() {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <HStack height="72px">
      <Box
        cursor="pointer"
        onClick={onClick}
      >
        <Text
          fontFamily="monospace"
          fontSize="x-large"
          color="white"
          fontWeight="bold"
        >
          BlockOverflow
        </Text>
      </Box>
      <Spacer />
      <SignInButton />
    </HStack>
  );
});

export default NavBar;
