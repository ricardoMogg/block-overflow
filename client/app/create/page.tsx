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
import { DynamicWidget, useDynamicContext } from "../../lib/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BountyInput from "../components/BountyInput";
import { parseEther } from "viem";
import abi from "../../lib/BountyContract.json";

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

  function generateNumericUUID(): number {
    let uuid = "";
    for (let i = 0; i < 32; i++) {
      uuid += Math.floor(Math.random() * 10);
    }
    return parseInt(uuid.replace(/(\d{12})/, "$1"));
  }

  async function onSubmit(formData: FormData) {
    const bountyId: number = generateNumericUUID();

    (walletConnector?.getWalletClient() as any)
      .writeContract({
        address: "0x8f0774909DdBFD0B399b15a527057B7a4caf93dc",
        abi: abi.abi,
        functionName: "createBounty",
        args: [bountyId],
        account: primaryWallet?.address,
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
      <HStack flex={1} gap={40} alignItems="flex-start" alignSelf="center">
        <VStack gap={24} alignItems="flex-start" maxW={1640} w="100%">
          <form action={onSubmit}>
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
                <Textarea
                  noOfLines={10}
                  minH={150}
                  name="content"
                  width="100%"
                />
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
                marginTop={20}
                disabled={!isAuthenticated}
              >
                Post your question
              </Button>
            ) : (
              <DynamicWidget />
            )}
          </form>
        </VStack>
        <VStack maxW={300} gap={24}>
          <VStack alignItems="flex-start">
            <Text fontWeight={500}>{`Add a tip?`}</Text>
            <Text color="#5B616E">{`Bounties greatly increase the chance of your question being answered quickly. And it\’s just nice to tip anons willing to help you.`}</Text>
          </VStack>
          <BountyInput updateAmount={setBounty} />
        </VStack>
      </HStack>
    </main>
  );
}
