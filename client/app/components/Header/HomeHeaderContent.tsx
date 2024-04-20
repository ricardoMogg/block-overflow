import { Text, VStack } from "@chakra-ui/react";
import { memo } from "react";
import CreatePostButton from "../CreatePostButton";

const HomeHeaderContent = memo(function HomeHeaderContent() {
  return (
    <VStack gap="20px">
      <Text
        color="white"
        fontSize="64px"
        fontFamily="monospace"
      >
        Have a question?
      </Text>
      <CreatePostButton />
    </VStack>
  );
});

export default HomeHeaderContent;
