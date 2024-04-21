const apiUrl = "https://api-eosin-eta-25.vercel.app/";
type BountyStatus = "open" | "closed";

export const GetPost = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/post/${id}`);
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
