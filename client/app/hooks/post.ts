import GetEnvironment from "@/environment/environment";

const env = GetEnvironment();

type BountyStatus = "open" | "closed";

export const GetPosts = async () => {
  try {
    const url = `${env.apiUrl}/post`;
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const GetPost = async (id: string) => {
  try {
    const res = await fetch(`${env.apiUrl}/post/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
  }
};

type CreatePostInput = {
  title: string;
  content: string;
  walletAddress: string;
  tags: string[];
  bountyId?: string;
  bountyAmount?: number;
  bountyStatus?: BountyStatus;
};
export const CreatePost = async (post: CreatePostInput) => {
  try {
    const res = await fetch(`${env.apiUrl}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

type UpdatePostInput = {
  id: string;
  title: string;
  content: string;
  walletAddress: string;
  tags: string[];
  bountyStatus?: BountyStatus;
  chosenCommentId?: string;
};
export const UpdatePost = async (post: UpdatePostInput) => {
  try {
    const res = await fetch(`${env.apiUrl}/post/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    return await res.json();
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

type UpvotePostInput = {
  postId: string;
  walletAddress: string;
};
export const UpvotePost = async (upvote: UpvotePostInput) => {
  try {
    const res = await fetch(`${env.apiUrl}/post/${upvote.postId}/upvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upvote),
    });
    return await res.json();
  } catch (error) {
    console.error("Error upvoting post:", error);
  }
};

type RemoveUpvoteInput = {
  postId: number;
  walletAddress: string;
};
export const RemoveUpvote = async (downvote: RemoveUpvoteInput) => {
  try {
    const res = await fetch(`${env.apiUrl}/post/${downvote.postId}/downvote`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(downvote),
    });
    return await res.json();
  } catch (error) {
    console.error("Error downvoting post:", error);
  }
};

type DeletePostInput = {
  postId: number;
  walletAddress: string;
};
export const DeletePost = async (deletePost: DeletePostInput) => {
  try {
    const res = await fetch(`${env.apiUrl}/post/${deletePost.postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletePost),
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
