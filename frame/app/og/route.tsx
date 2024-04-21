import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { ImageResponse } from "next/og";
import { GetPost } from "../hooks/post";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    if (searchParams.has("answer_submitted")) {
      return new ImageResponse(
        (
          <div
            style={{
              backgroundColor: "rgb(36,33,44)",
              width: "100%",
              height: "100%",
              color: "#CCC",
              fontSize: 25,
              marginTop: 20,
              padding: 30,
            }}
          >
            Thank you for answering the question!
          </div>
        )
      );
    }

    if (!searchParams.has("post_id")) {
      return new Response(`Missing post_id`, {
        status: 400,
      });
    }
    const postId = searchParams.get("post_id");

    const post = await GetPost(postId!);

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 40,
              fontWeight: "bolder",
              color: "blue",
              padding: 20,
            }}
          >
            BlockOverflow
          </div>
          {post.bountyAmount && (
            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(0, 121, 0, 0.1)",
                color: "green",
                borderColor: "green",
                borderWidth: "1px",
                borderRadius: "8px",
                width: "95%",
                height: "80px",
                padding: "16px 24px 16px 24px",
                margin: "20",
                fontSize: 22,
              }}
            >
              The poster of this question has attached a tip for the best answer
              of &nbsp; <b>{post.bountyAmount} ETH</b>
            </div>
          )}

          <div
            style={{
              backgroundColor: "rgb(36,33,44)",
              width: "100%",
              height: "100%",
              color: "#CCC",
              fontSize: 25,
              marginTop: 20,
              padding: 30,
            }}
          >
            {post.content}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
