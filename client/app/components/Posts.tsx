"use client";
import { List, ListItem, VStack, Text } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState } from "react";
import PostComponent, { Post } from "./Post";
import { GetPosts } from "../hooks/post";
import { useRouter } from "next/navigation";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    GetPosts().then((res) => {
      if (res) {
        setPosts(res);
      }
    });
  }, []);

  const router = useRouter();

  const handleOnClick = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  return (
    <List
      spacing="24px"
      alignContent="flex-start"
      maxW="800px"
    >
      {posts.map((post) => (
        <ListItem
          cursor="pointer"
          key={post.id}
          onClick={() => handleOnClick(post.id)}
        >
          <PostComponent {...post} />
        </ListItem>
      ))}
    </List>
  );
}
