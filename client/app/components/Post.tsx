import { HStack, VStack, Text, Box, Image } from "@chakra-ui/react";
import { memo } from "react";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostComponent = memo(function PostComponent(post: Post) {
  return (
    <HStack>
      <PostDetail {...post} />
    </HStack>
  );
});

const PostDetail = memo(function PostDetail({ title, body, userId }: Post) {
  return (
    <HStack
      alignItems="flex-start"
      gap="16px"
    >
      <Box
        w="32px"
        borderRadius="16px"
        overflow="hidden"
        flexShrink="0"
      >
        <Image
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
      </Box>
      <VStack
        align="flex-start"
        gap="2px"
      >
        <Text fontSize="large">{title}</Text>
        <Text fontSize="small">{`By: ${userId}`}</Text>
        <Text
          fontSize="medium"
          color="GrayText"
        >
          {body}
        </Text>
      </VStack>
    </HStack>
  );
});

export default PostComponent;
