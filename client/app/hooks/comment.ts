import GetEnvironment from "@/environment/environment";

const env = GetEnvironment();

type CreateCommentInput = {
  postId: number;
  content: string;
  walletAddress: string;
};
export const AddComment = async (comment: CreateCommentInput) => {
  try {
    const res = await fetch(`${env.apiUrl}/post/${comment.postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    return await res.json();
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

type UpdateCommentInput = {
  postId: number;
  commentId: number;
  content: string;
  walletAddress: string;
};
export const UpdateComment = async (comment: UpdateCommentInput) => {
  try {
    const res = await fetch(
      `${env.apiUrl}/post/${comment.postId}/comment/${comment.commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Error updating comment:", error);
  }
};

type UpvoteCommentInput = {
  postId: number;
  commentId: number;
  walletAddress: string;
};
export const UpvoteComment = async (upvote: UpvoteCommentInput) => {
  try {
    const res = await fetch(
      `${env.apiUrl}/post/${upvote.postId}/comment/upvote/${upvote.commentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upvote),
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Error upvoting comment:", error);
  }
};

type RemoveCommentUpvoteInput = {
  postId: number;
  commentId: number;
  walletAddress: string;
};
export const RemoveCommentUpvote = async (
  downvote: RemoveCommentUpvoteInput
) => {
  try {
    const res = await fetch(
      `${env.apiUrl}/post/${downvote.postId}/comment/downvote/${downvote.commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downvote),
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Error downvoting comment:", error);
  }
};

type DeleteCommentInput = {
  postId: number;
  commentId: number;
  walletAddress: string;
};
export const DeleteComment = async (deleteComment: DeleteCommentInput) => {
  try {
    const res = await fetch(
      `${env.apiUrl}/post/${deleteComment.postId}/comment/${deleteComment.commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteComment),
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
