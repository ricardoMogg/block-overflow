import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_URL } from "../../config";
import { AddComment, CreateCommentInput } from "@/app/hooks/comment";
const allowFramegear = process.env.NODE_ENV !== "production";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = "";
  let text: string | undefined = "";
  let post_id: string | null = "";

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    allowFramegear,
    neynarApiKey: "525D3CBB-946E-43FD-9321-D1D336F5C623",
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  console.log(message);

  if (message?.input) {
    text = message.input;
  }

  if (req.nextUrl.searchParams.has("post_id")) {
    post_id = req.nextUrl.searchParams.get("post_id");
  }

  const commentReq: CreateCommentInput = {
    content: text,
    postId: post_id!,
    walletAddress: accountAddress ?? "missing_address",
  };

  console.log(commentReq);
  await AddComment(commentReq);

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: "link",
          label: "See more answers",
          target: `https://block-overflow.vercel.app/post/${post_id}`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/og?answer_submitted=true`,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
