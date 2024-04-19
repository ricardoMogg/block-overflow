import { memo } from "react";
import NavBar from "./NavBar";
import { Box } from "@chakra-ui/react";

const HeaderContainer = memo(function HeaderContainer() {
  return (
    <Box
      height="100vh"
      maxHeight="400px"
      padding="0 20px"
      backgroundImage="url(/background.png)"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <NavBar />
    </Box>
  );
});
export default HeaderContainer;
