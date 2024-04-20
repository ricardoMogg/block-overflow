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
  Image,
} from "@chakra-ui/react";
import Input from "../../components/shared/Input";
import { MarkdownEditor } from "../../components/shared/Editor";
import HeaderContainer from "../../components/Header/HeaderContainer";
import { useEffect, useMemo, useState } from "react";
import { GetPost } from "@/app/hooks/post";
import { Post } from "@/app/components/Post";
import TipBanner from "../components/TipBanner";

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

export default function CreatePage({ params }: { params: { postId: string } }) {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    GetPost(params.postId).then((res) => {
      setPost(res);
    });
  });

  const renderedButtons = useMemo(() => {
    return post?.tags.map((item) => (
      <Button
        key={item}
        backgroundColor="#EEF0F3"
        color="#0A0B0D"
        fontWeight={500}
        borderRadius={40}
        px={12}
        py={8}
      >
        {item}
      </Button>
    ));
  }, [post?.tags]);

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeaderContainer></HeaderContainer>
      <VStack
        w="100%"
        maxW="1200px"
        flex={1}
        gap={40}
        alignItems="flex-start"
        alignSelf="center"
        paddingTop="20px"
      >
        <TipBanner post={post} />
        <HStack
          flex={1}
          alignContent={"center"}
        >
          <Box paddingRight={"20px"}>
            <VStack>
              <Image
                src="/arrowUp.svg"
                alt="Upvote"
              />
              <Text>{post?._count?.upvotes}</Text>
              <Image
                src="/arrowDown.svg"
                alt="downvote"
              />
            </VStack>
          </Box>
          <Box paddingRight={"80px"}>
            <VStack
              spacing={4}
              alignItems="flex-start"
            >
              <Heading
                as="h2"
                fontSize={"15px"}
                size="xl"
                mb={2}
                fontWeight="bold"
              >
                {post?.title}
              </Heading>
              <Text mb={4}>{post?.content}</Text>
              <HStack>{renderedButtons}</HStack>
            </VStack>
          </Box>
          <VStack>
            <Box
              borderWidth="1px"
              borderRadius={"24px"}
              borderColor={"palette/line"}
              padding={"16px 24px 16px 24px"}
            >
              <VStack
                flex={1}
                alignItems="flex-start"
              >
                <Text>
                  Posted on{" "}
                  {post?.createdAt
                    ? new Date(post?.createdAt).toLocaleDateString()
                    : new Date().toLocaleDateString()}{" "}
                  by:
                </Text>
                <Text>{post?.walletAddress}</Text>
                <HStack>
                  <Button
                    fontWeight={"bold"}
                    color="#0052FF"
                    paddingRight={"15px"}
                  >
                    Edit question
                  </Button>
                  <Button
                    fontWeight={"bold"}
                    color="#0052FF"
                  >
                    Share as a Frame
                  </Button>
                </HStack>
              </VStack>
            </Box>
            <Button
              marginTop={"40px"}
              padding={"16px 32px 16px 32px"}
              fontWeight={"bold"}
              bgColor="#0052FF"
              color="white"
              w="100%"
              borderRadius={"100px"}
            >
              Answer question
            </Button>
          </VStack>
        </HStack>
        <Text
          fontWeight={"bold"}
          fontSize={"20px"}
        >
          Answers
        </Text>
        <Box
          flex={1}
          alignSelf={"center"}
        >
          <Box
            height="20vh"
            padding="20px 0 20px 0"
            backgroundImage="url(/no_comments.png)"
            backgroundSize="cover"
            backgroundPosition="center"
            width="100%"
          ></Box>
          <Text
            padding="20px 0 20px 0"
            color="#5B616E"
          >
            There are no responses yet, be the first to answer
          </Text>
        </Box>
      </VStack>
    </main>
  );
}
