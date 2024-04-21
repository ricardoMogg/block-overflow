import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import { NEXT_PUBLIC_URL } from "./config";
import { Metadata, ResolvingMetadata } from "next";
import { ImageResponse } from "next/og";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "blockoverflow.xyz",
    description: "LFG",
    openGraph: {
      title: "blockoverflow.xyz",
      description: "LFG",
      images: [`${NEXT_PUBLIC_URL}/og?${searchParams}`],
    },
    other: {
      ...getFrameMetadata({
        buttons: [
          {
            label: "Answer question",
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/og?post_id=${searchParams.post_id}`,
          aspectRatio: "1.91:1",
        },
        input: {
          text: "answer here...",
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame?post_id=${searchParams.post_id}`,
      }),
    },
  };
}

export default function Page() {
  return (
    <div>
      <h1>blockoverflow.xyz</h1>
    </div>
  );
}
