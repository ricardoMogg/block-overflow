import {
  HStack,
  VStack,
  Text,
  Box,
  Image,
  Badge,
  Divider,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { comment } from "postcss";
import { memo, useMemo } from "react";
import { PostComment } from "./Comment";

export type Post = PostDetail & PostMetrics;

export type PostDetail = {
  id: string;
  title: string;
  content: string;
  walletAddress: string;
  tags: string[];
  bountyId?: string;
  bountyAmount?: number;
  bountyStatus?: string;
  createdAt: Date;
  comments: PostComment[];
  selectedCommentId?: string;
};

export type PostMetrics = {
  _count: {
    comments: number;
    upvotes: number;
  };
};
export type PostMetricsProps = {
  comments: number;
  upvotes: number;
  bountyAmount: number;
};

const PostDetail = memo(function PostDetail({
  title,
  content,
  walletAddress,
  tags,
}: PostDetail) {
  const renderedButtons = useMemo(() => {
    return tags.map((item) => (
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
  }, [tags]);

  return (
    <HStack alignItems="flex-start" gap={4}>
      <Box w="32px" borderRadius="16px" overflow="hidden" flexShrink="0">
        <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
      </Box>
      <VStack gap={6}>
        <VStack align="flex-start" gap={1}>
          <Text fontSize="large" as="b">
            {title}
          </Text>
          <Text fontSize="small">{`By: ${walletAddress}`}</Text>
          <Text fontSize="medium" color="GrayText" noOfLines={2}>
            {content}
          </Text>
        </VStack>
        <HStack alignSelf="flex-start">{renderedButtons}</HStack>
      </VStack>
    </HStack>
  );
});

function PostMetricsBase(props: PostMetricsProps) {
  return (
    <VStack alignItems="flex-start" gap={4}>
      <VStack alignItems="flex-start" color="#5B616E" gap={0.5}>
        <Text as="span" whiteSpace="nowrap">
          {props.upvotes} votes
        </Text>
        <Text as="span" whiteSpace="nowrap">
          {props.comments} answers
        </Text>
        {/* <Text as="span" whiteSpace="nowrap">
          0 views
        </Text> */}
      </VStack>
      <Badge
        variant="solid"
        color="#098551"
        fontWeight={600}
        backgroundColor="#F5FFFB"
        borderRadius={4}
        whiteSpace="pretty"
      >
        {props.bountyAmount ? `${props.bountyAmount} ETH reward` : ""}
      </Badge>
    </VStack>
  );
}

const PostComponent = memo(function PostComponent(post: Post) {
  const { _count, ...details } = post;
  const bountyAmount = details.bountyAmount ? details.bountyAmount : 0;
  const metrics = {
    comments: _count.comments,
    upvotes: _count.upvotes,
    bountyAmount,
  };

  return (
    <VStack gap={4} paddingTop={4}>
      <HStack alignItems="flex-start" justifyContent="space-between" gap={8}>
        <Box flexShrink={0} width="620px">
          <PostDetail {...details} />
        </Box>
        <Box>
          <PostMetricsBase {...metrics} />
        </Box>
      </HStack>
      <Spacer />
      <Divider
        height="1px"
        backgroundColor="#5B616E33"
        orientation="horizontal"
      />
    </VStack>
  );
});

export default PostComponent;
