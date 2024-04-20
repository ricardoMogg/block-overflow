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
      height="30vh"
      padding="0 20px"
      minH={368}
      backgroundImage="url(/background.png)"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <NavBar />
      {children && <Box paddingTop={120}>{children}</Box>}
    </Box>
  );
});
export default HeaderContainer;
