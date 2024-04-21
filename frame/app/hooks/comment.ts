const apiUrl = "https://api-eosin-eta-25.vercel.app/";
export type CreateCommentInput = {
  postId: string;
  content: string;
  walletAddress: string;
};
export const AddComment = async (comment: CreateCommentInput) => {
  try {
    const res = await fetch(`${apiUrl}post/${comment.postId}/comment`, {
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
