"use client";
import { List, ListItem, VStack, Text } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import PostComponent, { Post } from "./Post";
import { GetPosts } from "../hooks/post";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    GetPosts().then((res) => {
      setPosts(res);
    });
  }, []);

  return (
    <List spacing="24px" alignContent="flex-start" maxW="800px">
      {posts.map((post) => (
        <ListItem key={post.id}>
          <PostComponent {...post} />
        </ListItem>
      ))}
    </List>
  );
}
