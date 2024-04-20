"use client";

import {
  HStack,
  VStack,
  RequiredIndicator,
  Button,
  Text,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { memo } from "react";
import { MarkdownEditor } from "./shared/Editor";
import Input from "./shared/Input/Input";

const CreatePostContent = memo(function CreatePostContent() {
  return (
    <HStack
      paddingTop="5vh"
      maxW={1080}
      flex={1}
      gap={40}
      alignItems="flex-start"
      alignSelf="center"
    >
      <VStack
        gap={24}
        alignItems="flex-start"
        maxW={640}
        w="100%"
      >
        <FormControl
          isRequired
          width="100%"
          alignItems="flex-start"
        >
          <FormLabel
            fontWeight={500}
            paddingBottom={8}
          >
            Title
          </FormLabel>
          <Input
            placeholder="What is your web3 development question? Be specific"
            width="100%"
          />
        </FormControl>
        <FormControl
          isRequired
          width="100%"
          alignItems="flex-start"
        >
          <FormLabel
            fontWeight={500}
            paddingBottom={8}
          >
            Question body
          </FormLabel>
          <Box
            width="100%"
            borderRadius={8}
            borderColor="#5B616EA8"
            borderWidth={1}
            pt={0}
            height={274}
          >
            <MarkdownEditor markdown="" />
          </Box>
        </FormControl>
        <FormControl
          isRequired
          width="100%"
          alignItems="flex-start"
        >
          <FormLabel
            fontWeight={500}
            paddingBottom={8}
          >
            Tags
          </FormLabel>
          <Input
            placeholder="Tag chains and technologies you are using to make it easier for others to find"
            width="100%"
          />
        </FormControl>
      </VStack>
      <VStack
        gap={24}
        alignItems="stretch"
      >
        <VStack alignItems="flex-start">
          <Text fontWeight={500}>{`Add a tip?`}</Text>
          <Text color="#5B616E">{`Bounties greatly increase the chance of your question being answered quickly. And it\’s just nice to tip anons willing to help you.`}</Text>
        </VStack>
        <div>Placeholder for bounty module</div>
        <Button
          color="#fff"
          backgroundColor="#0052FF"
          borderRadius={100}
          px={32}
          py={16}
          fontWeight={500}
        >
          Post your question
        </Button>
      </VStack>
    </HStack>
  );
});

export default CreatePostContent;
