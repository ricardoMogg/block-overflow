import { Text, Box, VStack, HStack, Icon } from "@chakra-ui/react";

export type PostComment = {
  id: string;
  content: string;
  walletAddress: string;
  postId: string;
  upvotes: any[];
  createdAt: Date;
  _count: {
    upvotes: number;
  };
};

export type PostCommentProps = {
  postComments: PostComment[];
};

const EmptyCommentsComponent = () => {
  return (
    <VStack flex={1} alignContent={"flex-start"} alignItems={"flex-start"}>
      <Box
        width="100%"
        flex={1}
        alignSelf={"center"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          height="20vh"
          padding="20px 0 20px 0"
          backgroundImage="url(/no_comments.png)"
          backgroundSize="cover"
          backgroundPosition="center"
          width="100%"
        ></Box>
        <Text padding="20px 0 20px 0" color="#5B616E">
          There are no responses yet, be the first to answer
        </Text>
      </Box>
    </VStack>
  );
};

const SingleCommentComponent = (comment: PostComment) => {
  return (
    <HStack padding={"20px 0 20px 0"}>
      <VStack paddingRight={"20px"}>
        <Icon name="TriangleUpIcon" color="green.500" />
        <Text>{comment._count?.upvotes ? comment.upvotes.length : 0}</Text>
        <Icon name="TriangleDownIcon" color="green.500" />
      </VStack>
      <VStack>
        <HStack flex={1} alignContent={"flex-start"} alignSelf={"flex-start"}>
          <Text fontSize={"16px"}>{comment.walletAddress}</Text>
          <Icon name="fa-clock" />
          <Text fontSize={"16px"}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </Text>
        </HStack>
        <Text fontSize={"16px"}>{comment.content}</Text>
      </VStack>
    </HStack>
  );
};

const FilledCommentsComponent = (comments: PostCommentProps) => {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Box flex={1} alignSelf={"center"}>
        {comments.postComments.map((comment) => (
          <SingleCommentComponent key={comment.id} {...comment} />
        ))}
      </Box>
    </main>
  );
};

const CommentsComponent = (comments: PostCommentProps) => {
  return comments?.postComments.length ? (
    <main className="flex min-h-screen flex-col justify-between">
      <Text fontWeight={"bold"} fontSize={"20px"}>
        Answers
      </Text>
      {<FilledCommentsComponent {...comments} />}
    </main>
  ) : (
    <main className="flex min-h-screen flex-col justify-between">
      <Text fontWeight={"bold"} fontSize={"20px"}>
        Answers
      </Text>
      {<EmptyCommentsComponent />}
    </main>
  );
};

export default CommentsComponent;