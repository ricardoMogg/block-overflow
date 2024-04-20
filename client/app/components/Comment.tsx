import { Text, Box, VStack, HStack, Button } from "@chakra-ui/react";
import ArrowButton from "./ArrowButton";
import { useCallback } from "react";

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
  bountyPayoutSelection: (arg0: PostComment) => void;
  isBountyOpen: boolean;
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

const SingleCommentComponent = ({
  comment,
  bountyPayoutSelection,
  isBountyOpen,
}: {
  comment: PostComment;
  bountyPayoutSelection: (arg0: PostComment) => void;
  isBountyOpen: boolean;
}) => {
  const handleUpVote = useCallback(() => {
    console.log("Clicked on upvote button");
  }, []);

  const handleDownVote = useCallback(() => {
    console.log("Clicked on downvote button");
  }, []);
  return (
    <HStack padding={"20px 0 20px 0"}>
      <VStack paddingRight={"20px"}>
        <ArrowButton direction={"up"} onClick={handleUpVote} />
        <Text>{comment._count?.upvotes ? comment.upvotes.length : 0}</Text>
        <ArrowButton direction={"down"} onClick={handleDownVote} />
      </VStack>
      <VStack>
        <HStack flex={1} alignContent={"flex-start"} alignSelf={"flex-start"}>
          <Text fontSize={"16px"}>{comment.walletAddress}</Text>
          <Text fontSize={"16px"}>•</Text>
          <Text fontSize={"16px"}>
            {new Date(comment.createdAt).toLocaleDateString()}
          </Text>
        </HStack>
        <Text fontSize={"16px"}>{comment.content}</Text>
      </VStack>
      {isBountyOpen && (
        <VStack paddingRight={"20px"}>
          <Button
            marginTop={"40px"}
            padding={"16px 32px 16px 32px"}
            fontSize={10}
            bgColor="#0052FF"
            color="white"
            w="20px"
            borderRadius={"20px"}
            onClick={() => {
              bountyPayoutSelection(comment);
            }}
          >
            &#x2713;
          </Button>
        </VStack>
      )}
    </HStack>
  );
};

const FilledCommentsComponent = (comments: PostCommentProps) => {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Box flex={1} alignSelf={"center"}>
        {comments.postComments.map((comment) => (
          <SingleCommentComponent
            isBountyOpen={comments.isBountyOpen}
            bountyPayoutSelection={comments.bountyPayoutSelection}
            key={comment.id}
            comment={comment}
          />
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
