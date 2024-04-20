"use client";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
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
  _count: {
    comments: number;
    upvotes: number;
  };
  createdAt: Date;
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
      <VStack
        maxW="800px"
        flex={1}
        gap={40}
        alignItems="flex-start"
        alignSelf="center"
      >
        <Box
          bgColor={"green/0"}
          color="green"
          borderColor={"green/5"}
          borderWidth={"1px"}
          borderRadius={"8px"}
          gap={40}
          w="100%"
        >
          <HStack>
            <Icon name="fa-info" color="green.500" />
            <VStack spacing={4} alignItems="flex-start">
              <Text as="h1" size="xxl">
                {formatBounty(post?.bountyAmount)} tip
              </Text>
              <Text as="h1" size="xl">
                The poster of this question has attached a{" "}
                {formatBounty(post?.bountyAmount)} tip for the best answer
              </Text>
            </VStack>
          </HStack>
        </Box>
        <HStack>
          <Box>
            <VStack>
              <Icon name="TriangleUpIcon" color="green.500" />
              <Text>{post?._count?.upvotes}</Text>
              <Icon name="TriangleDownIcon" color="green.500" />
            </VStack>
          </Box>
          <Box>
            <VStack spacing={4} alignItems="flex-start">
              <Heading as="h2" size="xl" mb={2} fontWeight="bold">
                {post?.title}
              </Heading>
              <Text mb={4}>{post?.content}</Text>
              <HStack>
                {post?.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </HStack>
            </VStack>
          </Box>
          <Box>
            <VStack>
              <Text>
                Posted on{" "}
                {post?.createdAt
                  ? new Date(post?.createdAt).toLocaleDateString()
                  : new Date().toLocaleDateString()}{" "}
                by:
              </Text>
              <Text>{post?.walletAddress}</Text>
              <HStack>
                <Button>Edit question</Button>
                <Button>Share as a Frame</Button>
              </HStack>
            </VStack>
          </Box>
        </HStack>
        <Text fontWeight={"bold"}>Answers</Text>

        <Box
          height="30vh"
          padding="0 20px"
          backgroundImage="url(/no_comments.png)"
          backgroundSize="cover"
          backgroundPosition="center"
          width="100%"
        ></Box>
        <Text padding="0 20px">
          There are no responses yet, be the first to answer
        </Text>
      </VStack>
    </main>
  );
}
