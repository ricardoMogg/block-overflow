import { memo } from "react";
import { Box } from "@chakra-ui/react";
import Posts from "../Posts";

const ContentContainer = memo(function ContentContainer() {
  return (
    <Box
      alignSelf="center"
      paddingTop="40px"
      maxW="80vw"
      display="flex"
      overflow="hidden"
    >
      <Posts />
    </Box>
  );
});
export default ContentContainer;
