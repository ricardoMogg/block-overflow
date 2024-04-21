"use client";
import { Box, Button, HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import Input from "../components/shared/Input";
import HeaderContainer from "../components/Header/HeaderContainer";
import { CreatePost } from "../hooks/post";
import { DynamicWidget, useDynamicContext } from "../../lib/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BountyInput from "../components/BountyInput";
import { parseEther } from "viem";
import abi from "../../lib/BountyContract.json";
import { baseSepolia } from "viem/chains";

function RequiredIndicator() {
  return (
    <Text color="#CF202F" as="span">
      *
    </Text>
  );
}

export default function CreatePage() {
  const { isAuthenticated, primaryWallet, walletConnector } =
    useDynamicContext();
  const [bounty, setBounty] = useState(0);

  const router = useRouter();

  function generateNumericUUID(): string {
    let uuid = "";
    for (let i = 0; i < 32; i++) {
      uuid += Math.floor(Math.random() * 10);
    }
    return uuid.replace(/(\d{12})/, "$1");
  }

  async function onSubmit(formData: FormData) {
    const bountyId: string = generateNumericUUID();
    if (bounty <= 0) {
      CreatePost({
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        tags: (formData.get("tags") as string).split(" "),
        walletAddress: primaryWallet?.address as string,
        bountyAmount: parseFloat(bounty.toString()),
        bountyId: bountyId,
        bountyStatus: "open",
      }).then(() => {
        router.push("/"), [router];
      });
    } else {
      (walletConnector?.getWalletClient() as any)
        .writeContract({
          address: "0x8f0774909DdBFD0B399b15a527057B7a4caf93dc",
          abi: abi.abi,
          functionName: "createBounty",
          args: [bountyId],
          account: primaryWallet?.address,
          chain: baseSepolia,
          value: parseEther(bounty.toString()),
        })
        .then(() => {
          CreatePost({
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            tags: (formData.get("tags") as string).split(" "),
            walletAddress: primaryWallet?.address as string,
            bountyAmount: parseFloat(bounty.toString()),
            bountyId: bountyId,
            bountyStatus: "open",
          }).then(() => {
            router.push("/"), [router];
          });
        });
    }
  }

  return (
    <main className="flex min-h-screen flex-col ">
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
      <center>
        <form action={onSubmit}>
          <HStack
            flex={1}
            gap={10}
            width="60%"
            alignItems="flex-start"
            alignSelf="center"
            paddingTop={20}
          >
            <VStack>
              <FormControl isRequired>
                <FormLabel fontWeight={500}>Title</FormLabel>
                <Input name="title" type="text" placeholder="How do I..." />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Question body</FormLabel>
                <Box borderRadius={8} borderColor="#5B616EA8" pt={0}>
                  <Textarea
                    noOfLines={10}
                    minH={150}
                    name="content"
                    width="100%"
                  />
                </Box>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight={500}>Tags</FormLabel>
                <Input
                  name="tags"
                  placeholder="Tag chains and technologies you are using to make it easier for others to find"
                />
              </FormControl>
            </VStack>

            <VStack maxW={300} alignItems="stretch" gap={6}>
              <VStack alignItems="flex-start">
                <Text fontWeight={500}>{`Add a tip?`}</Text>
                <Text color="#5B616E">{`Bounties greatly increase the chance of your question being answered quickly. And it\’s just nice to tip anons willing to help you.`}</Text>
              </VStack>
              <BountyInput updateAmount={setBounty} />
              {isAuthenticated ? (
                <Button
                  type="submit"
                  color="#fff"
                  backgroundColor="#0052FF"
                  borderRadius={100}
                  fontWeight={500}
                  height="56px"
                  disabled={!isAuthenticated}
                >
                  Post your question
                </Button>
              ) : (
                <DynamicWidget />
              )}
            </VStack>
          </HStack>
        </form>
      </center>
    </main>
  );
}
