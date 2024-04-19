import { memo } from "react";
import { Box } from "@chakra-ui/react";
import Posts from "../Posts";

const ContentContainer = memo(function ContentContainer() {
  return (
    <Box
      alignSelf="center"
      paddingTop="40px"
    >
      <Posts />
    </Box>
  );
});
export default ContentContainer;
