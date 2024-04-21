"use client";
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import HeaderContainer from "../../components/Header/HeaderContainer";
import { useEffect, useMemo, useState } from "react";
import { Post } from "@/app/components/Post";
import TipBanner from "../components/TipBanner";
import { AddComment } from "../../hooks/comment";
import CommentsComponent, { PostComment } from "@/app/components/Comment";
import ArrowButton from "@/app/components/ArrowButton";
import { GetPost, UpdatePost } from "@/app/hooks/post";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import abi from "../../../lib/BountyContract.json";
import { useRouter } from "next/navigation";
import { baseSepolia } from "viem/chains";

export default function CreatePage({ params }: { params: { postId: string } }) {
  const [post, setPost] = useState<Post>();

  const [isCreator, setIsCreator] = useState(false);
  const { primaryWallet, walletConnector } = useDynamicContext();

  const [answerText, setAnswerText] = useState("");

  useEffect(() => {
    GetPost(params.postId).then((res) => {
      setPost(res);
    });
    setIsCreator(primaryWallet?.address === post?.walletAddress);
  }, [primaryWallet, params.postId, post?.walletAddress]);

  const renderedButtons = useMemo(() => {
    return post?.tags.map((item) => (
      <Button
        key={item}
        backgroundColor="#EEF0F3"
        color="#0A0B0D"
        fontWeight={500}
        borderRadius={40}
        height="32px"
      >
        {item}
      </Button>
    ));
  }, [post?.tags]);

  const handleUpVote = () => {
    console.log("Clicked on upvote button");
  };

  const handleDownVote = () => {
    console.log("Clicked on downvote button");
  };

  const router = useRouter();

  function onSubmitCreateComment() {
    AddComment({
      postId: post?.id as string,
      content: answerText,
      walletAddress: primaryWallet?.address as string,
    }).then(() => {
      onClose();
      router.refresh(), [router];
    });
  }

  function executeBountyPayout(comment: PostComment) {
    (walletConnector?.getWalletClient() as any)
      .writeContract({
        address: "0x8f0774909DdBFD0B399b15a527057B7a4caf93dc",
        abi: abi.abi,
        functionName: "executePayout",
        chain: baseSepolia,
        args: [post?.bountyId, comment.walletAddress],
        account: primaryWallet?.address,
      })
      .then(() => {
        UpdatePost({
          id: post?.id as string,
          title: post?.title as string,
          content: post?.content as string,
          tags: post?.tags as string[],
          walletAddress: post?.walletAddress as string,
          bountyStatus: "closed",
          selectedCommentId: comment.id,
        }).then(() => {
          alert("Bounty has been payed");
        });
      });
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeaderContainer></HeaderContainer>
      <VStack
        w="100%"
        maxW="1200px"
        gap={10}
        alignItems="flex-start"
        alignSelf="center"
        paddingTop={20}
      >
        <Heading as="h2" fontSize="28px" fontWeight="bold">
          {post?.title}
        </Heading>
        <TipBanner post={post} />
        <HStack flex={1} alignItems="flex-start" gap={8}>
          <Box>
            <VStack>
              <ArrowButton direction={"up"} onClick={handleUpVote} />
              <Text>{post?._count?.upvotes}</Text>
              <ArrowButton direction={"down"} onClick={handleUpVote} />
            </VStack>
          </Box>
          <Box>
            <VStack alignItems="flex-start">
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
              <VStack flex={1} alignItems="flex-start" gap={4}>
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
                  <Button fontWeight={"bold"} color="#0052FF">
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
              onClick={onOpen}
            >
              Answer question
            </Button>
          </VStack>
        </HStack>
        <Spacer boxSize={20} />
        <VStack w="100%" alignItems="flex-start" flex={1}>
          <CommentsComponent
            postComments={post?.comments ? post?.comments : []}
            isBountyOpen={post?.bountyStatus != "closed" && isCreator}
            bountyPayoutSelection={executeBountyPayout}
          />
        </VStack>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <HStack justifyContent={"space-between"}>
            <ModalHeader>
              <Text justifyContent={"center"} whiteSpace={"nowrap"}>
                Answer Question
              </Text>
            </ModalHeader>
            <ModalCloseButton />
          </HStack>
          <Divider
            margin="20px 0 20px 0"
            backgroundColor="#5B616E33"
            orientation="horizontal"
          />
          <ModalBody>
            <HStack flex={1} justifyContent={"center"}>
              <Box />
              <Textarea
                id="answer-text"
                w="600px"
                h="200px"
                onChange={(e) => setAnswerText(e.target.value)}
                borderWidth={"2px"}
                padding="10px"
                placeholder="Write down your answer. Be specific, code snippets help. Be respectful, those that are rude will be banned."
              />
              <Box />
            </HStack>
          </ModalBody>
          <Divider
            margin="20px 0 20px 0"
            backgroundColor="#5B616E33"
            orientation="horizontal"
          />
          <ModalFooter>
            <Button
              bgColor="#EEF0F3"
              padding="16px 32px 16px 32px"
              borderRadius="100px"
              textColor="black"
              mr={4}
              onClick={onClose}
              width={"100px"}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              padding="16px 32px 16px 32px"
              borderRadius="100px"
              bgColor={"#0052FF"}
              textColor="white"
              onClick={() => {
                onSubmitCreateComment();
              }}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}
