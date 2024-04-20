"use client";
import { List, ListItem, VStack, Text } from "@chakra-ui/react";
import { memo } from "react";
import PostComponent, { Post } from "./Post";
import { GetPosts } from "../hooks/post";

const Posts = memo(async function Posts() {
  const res = await GetPosts();
  const posts: Post[] = res || [];

  return (
    <List spacing="24px" alignContent="flex-start" maxW="800px">
      {posts.map((post) => (
        <ListItem key={post.id}>
          <PostComponent {...post} />
        </ListItem>
      ))}
    </List>
  );
});

export default Posts;
