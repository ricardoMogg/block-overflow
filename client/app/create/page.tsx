"use client";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Input from "../components/shared/Input";
import HeaderContainer from "../components/Header/HeaderContainer";
import { CreatePost } from "../hooks/post";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useState } from "react";
import { useRouter } from "next/navigation";

function RequiredIndicator() {
  return (
    <Text color="#CF202F" as="span">
      *
    </Text>
  );
}

export default function CreatePage() {
  const { isAuthenticated, primaryWallet } = useDynamicContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    console.log(formData.get("title"));
    console.log(primaryWallet?.address);

    setIsLoading(true);

    CreatePost({
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tags: (formData.get("tags") as string).split(" "),
      walletAddress: primaryWallet?.address as string,
    }).then((res) => {
      router.push("/"), [router];
    });
  }

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
      <HStack
        maxW={1080}
        flex={1}
        gap={40}
        alignItems="flex-start"
        alignSelf="center"
      >
        <form action={onSubmit}>
          <VStack gap={24} alignItems="flex-start" maxW={640} w="100%">
            <label style={{ width: "100%" }}>
              <Text fontWeight={500}>
                Title
                <RequiredIndicator />
              </Text>
              <Input placeholder="How do I..." width="100%" name="title" />
            </label>
            <label style={{ width: "100%" }}>
              <Text fontWeight={500}>
                Question body
                <RequiredIndicator />
              </Text>
              <Box
                borderRadius={8}
                borderColor="#5B616EA8"
                borderWidth={1}
                pt={0}
              >
                <Textarea name="content" width="100%" />
              </Box>
            </label>
            <label style={{ width: "100%" }}>
              <Text fontWeight={500}>
                Tags
                <RequiredIndicator />
              </Text>
              <Input
                name="tags"
                placeholder="Tag chains and technologies you are using to make it easier for others to find"
                width="100%"
              />
            </label>
            {isAuthenticated ? (
              <Button
                type="submit"
                w={327}
                color="#fff"
                backgroundColor="#0052FF"
                borderRadius={100}
                px={32}
                py={16}
                fontWeight={500}
                disabled={!isAuthenticated}
              >
                Post your question
              </Button>
            ) : (
              <DynamicWidget />
            )}
          </VStack>
        </form>
        <VStack gap={24}>
          <VStack alignItems="flex-start">
            <Text fontWeight={500}>{`Add a tip?`}</Text>
            <Text color="#5B616E">{`Bounties greatly increase the chance of your question being answered quickly. And it\’s just nice to tip anons willing to help you.`}</Text>
          </VStack>
          <div>Placeholder for bounty module</div>
        </VStack>
      </HStack>
    </main>
  );
}
