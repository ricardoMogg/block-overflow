"use client";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Input from "../../components/shared/Input";
import { MarkdownEditor } from "../../components/shared/Editor";
import HeaderContainer from "../../components/Header/HeaderContainer";
import { useEffect, useState } from "react";
import { GetPost } from "@/app/hooks/post";

function RequiredIndicator() {
  return (
    <Text color="#CF202F" as="span">
      *
    </Text>
  );
}

type Post = {
  id: string;
  title: string;
  content: string;
  walletAddress: string;
  tags: string[];
  bountyId?: string;
  bountyAmount?: number;
  bountyStatus?: string;
};

export default function CreatePage({ params }: { params: { postId: string } }) {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    GetPost(params.postId).then((res) => {
      setPost(res);
    });
  });

  // Format bounty amount as currency (assuming it's in Ether for this example)
  const formatBounty = (amount: number | undefined) => {
    // If no amount is provided, return a default message
    if (amount == null) return "No bounty";
    // Convert to a string with 2 decimal places and add the ETH symbol
    return `${amount.toFixed(2)} ETH`;
  };

  // Function to determine the color scheme based on bounty status
  const getBountyStatusColorScheme = (status: string | undefined) => {
    switch (status) {
      case "open":
        return "green";
      case "closed":
        return "red";
      default:
        return "gray";
    }
  };

  // frontend ui that shows the post details
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeaderContainer></HeaderContainer>
      <HStack
        maxW={1080}
        flex={1}
        gap={40}
        alignItems="flex-start"
        alignSelf="center"
      >
        <Box
          maxWidth="800px"
          margin="auto"
          mt={5}
          p={5}
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.200"
        >
          <Heading as="h2" size="xl" mb={2}>
            {post?.title}
          </Heading>
          <Text fontSize="md" color="gray.500" mb={4}>
            {post?.walletAddress}
          </Text>
          <Text mb={4}>{post?.content}</Text>
          <Divider my={4} />
          <Stack direction="row" spacing={2} mb={2}>
            {post?.tags.map((tag, index) => (
              <Tag key={index} colorScheme="blue" borderRadius="full">
                {tag}
              </Tag>
            ))}
          </Stack>
          {post?.bountyId && (
            <Flex alignItems="center" justifyContent="space-between">
              <Badge
                colorScheme={getBountyStatusColorScheme(post?.bountyStatus)}
                px={2}
                py={1}
              >
                {formatBounty(post?.bountyAmount)} - {post?.bountyStatus}
              </Badge>
              <Text fontSize="sm" color="gray.500">
                Bounty ID: {post?.bountyId}
              </Text>
            </Flex>
          )}
        </Box>
      </HStack>
    </main>
  );
}
