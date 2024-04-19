import {
  HStack,
  VStack,
  Text,
  Box,
  Image,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { memo } from "react";

export type Post = PostDetail & PostMetrics;

export type PostDetail = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostMetrics = {
  voteCount: number;
  answerCount: number;
  viewCount: number;
  reward?: {
    amount: number;
    currency: string;
  };
};

const PostDetail = memo(function PostDetail({
  title,
  body,
  userId,
}: PostDetail) {
  return (
    <HStack alignItems="flex-start" gap="16px">
      <Box w="32px" borderRadius="16px" overflow="hidden" flexShrink="0">
        <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
      </Box>
      <VStack align="flex-start" gap="2px">
        <Text fontSize="large">{title}</Text>
        <Text fontSize="small">{`By: ${userId}`}</Text>
        <Text fontSize="medium" color="GrayText">
          {body}
        </Text>
      </VStack>
    </HStack>
  );
});

function PostMetricsBase(props: PostMetrics) {
  return (
    <VStack alignItems="flex-start" gap={16}>
      <VStack alignItems="flex-start" color="#5B616E" gap={1}>
        <Text as="span" whiteSpace="nowrap">
          0 votes
        </Text>
        <Text as="span" whiteSpace="nowrap">
          0 answers
        </Text>
        <Text as="span" whiteSpace="nowrap">
          0 views
        </Text>
      </VStack>
      <Badge
        variant="solid"
        color="#098551"
        fontWeight={600}
        backgroundColor="#F5FFFB"
        borderRadius={4}
        px={4}
      >
        1 ETH reward
      </Badge>
    </VStack>
  );
}

const PostComponent = memo(function PostComponent(post: Post) {
  const { voteCount, answerCount, viewCount, reward, ...details } = post;
  const metrics = { voteCount, answerCount, viewCount, reward };

  return (
    <VStack >
      <HStack alignItems="flex-start" p={8} pb={24}>
        <PostDetail {...details} />
        <PostMetricsBase {...metrics} />
      </HStack>
      <Divider height={1} backgroundColor='#5B616E33' orientation='horizontal'/>
    </VStack>
  );
});

export default PostComponent;
