import React, { memo } from "react";
import NavBar from "./NavBar";
import { Box } from "@chakra-ui/react";
import HeaderContent from "./HomeHeaderContent";

type HeaderContainerProps = {
  children?: React.ReactNode;
};

const HeaderContainer = memo(function HeaderContainer({
  children,
}: HeaderContainerProps) {
  return (
    <Box
      height="400px"
      padding="0 20px"
      backgroundImage="url(/background.png)"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <NavBar />
      {children && <Box paddingTop={20}>{children}</Box>}
    </Box>
  );
});
export default HeaderContainer;
