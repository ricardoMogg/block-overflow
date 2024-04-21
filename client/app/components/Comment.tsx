"use client";
import { Text, Box, VStack, HStack, Button, Image } from "@chakra-ui/react";
import ArrowButton from "./ArrowButton";
import { useCallback, useMemo, useState } from "react";

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
    <VStack
      flex={1}
      alignContent={"flex-start"}
      alignItems={"flex-start"}
    >
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
        <Text
          padding="20px 0 20px 0"
          color="#5B616E"
        >
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

  const [isHovering, setIsHovering] = useState(false);

  const handleMoveEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMoveLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const selectCommentButton = useMemo(() => {
    return !isBountyOpen && isHovering ? (
      <Button
        alignSelf="center"
        padding={0}
        justifySelf="flex-end"
        height="40px"
        width="40px"
        borderRadius="50%"
        bg="transparent"
        onClick={() => {
          bountyPayoutSelection(comment);
        }}
      >
        <Image
          src="/checkmark.svg"
          alt="Check mark"
        />
      </Button>
    ) : (
      <Box
        flexShrink={0}
        width="40px"
        height="40px"
      />
    );
  }, [bountyPayoutSelection, comment, isBountyOpen, isHovering]);

  return (
    <HStack
      gap={5}
      padding={"20px 0 20px 0"}
      alignItems="flex-start"
      justifyContent="flex-start"
      onMouseEnter={handleMoveEnter}
      onMouseLeave={handleMoveLeave}
    >
      <VStack
        width="60px"
        flexShrink={0}
      >
        <ArrowButton
          direction={"up"}
          onClick={handleUpVote}
        />
        <Text>{comment._count?.upvotes ? comment.upvotes.length : 0}</Text>
        <ArrowButton
          direction={"down"}
          onClick={handleDownVote}
        />
      </VStack>
      <VStack
        alignItems="flex-start"
        flexGrow={2}
      >
        <Text
          fontSize={"16px"}
          color="GrayText"
        >
          {`${comment.walletAddress} • ${new Date(
            comment.createdAt
          ).toLocaleDateString()}`}
        </Text>
        <Text fontSize={"16px"}>{comment.content}</Text>
      </VStack>
      {selectCommentButton}
    </HStack>
  );
};

const FilledCommentsComponent = (comments: PostCommentProps) => {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Box
        flex={1}
        alignSelf={"center"}
      >
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
      <Text
        fontWeight={"bold"}
        fontSize={"20px"}
      >
        Answers
      </Text>
      {<FilledCommentsComponent {...comments} />}
    </main>
  ) : (
    <main className="flex min-h-screen flex-col justify-between">
      <Text
        fontWeight={"bold"}
        fontSize={"20px"}
      >
        Answers
      </Text>
      {<EmptyCommentsComponent />}
    </main>
  );
};

export default CommentsComponent;
