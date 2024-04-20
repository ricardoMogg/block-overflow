import {
  HStack,
  VStack,
  Text,
  Box,
  Image,
  Badge,
  Divider,
  Button,
} from "@chakra-ui/react";
import { comment } from "postcss";
import { memo, useMemo } from "react";

export type Post = PostDetail & PostMetrics;

export type PostDetail = {
  id: number;
  title: string;
  content: string;
  walletAddress: string;
  tags: string[];
  bountyId?: string;
  bountyAmount?: number;
  bountyStatus?: string;
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

const MOCK_BUTTONS = ["Ethereum", "OP", "Base"];

const PostDetail = memo(function PostDetail({
  title,
  content,
  walletAddress,
}: PostDetail) {
  const renderedButtons = useMemo(() => {
    return MOCK_BUTTONS.map((item) => (
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
  }, []);

  return (
    <HStack alignItems="flex-start" gap="16px">
      <Box w="32px" borderRadius="16px" overflow="hidden" flexShrink="0">
        <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
      </Box>
      <VStack gap={16}>
        <VStack align="flex-start" gap="2px">
          <Text fontSize="large">{title}</Text>
          <Text fontSize="small">{`By: ${walletAddress}`}</Text>
          <Text fontSize="medium" color="GrayText">
            {content}
          </Text>
        </VStack>
        <HStack gap={8} alignSelf="flex-start">
          {renderedButtons}
        </HStack>
      </VStack>
    </HStack>
  );
});

function PostMetricsBase(props: PostMetricsProps) {
  return (
    <VStack alignItems="flex-start" gap={16}>
      <VStack alignItems="flex-start" color="#5B616E" gap={1}>
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
        px={4}
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
    <VStack>
      <HStack alignItems="flex-start" p={8} pb={24}>
        <PostDetail {...details} />

        <PostMetricsBase {...metrics} />
      </HStack>

      <Divider
        height={1}
        backgroundColor="#5B616E33"
        orientation="horizontal"
      />
    </VStack>
  );
});

export default PostComponent;
