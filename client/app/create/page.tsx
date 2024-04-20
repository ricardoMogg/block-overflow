import { Text } from "@chakra-ui/react";
import Input from "../components/shared/Input";
import { MarkdownEditor } from "../components/shared/Editor";
import HeaderContainer from "../components/Header/HeaderContainer";
import CreatePostContent from "../components/CreatePostContent";

function RequiredIndicator() {
  return (
    <Text
      color="#CF202F"
      as="span"
    >
      *
    </Text>
  );
}

export default function CreatePage() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeaderContainer>
        <Text
          color="white"
          fontSize="64px"
          fontFamily="monospace"
          align="center"
        >
          Don’t be scared to ask anon.
        </Text>
      </HeaderContainer>
      <CreatePostContent />
    </main>
  );
}
