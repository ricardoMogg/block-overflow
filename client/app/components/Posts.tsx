import { List, ListItem, VStack, Text } from "@chakra-ui/react";
import { memo } from "react";
import PostComponent, { Post } from "./Post";

const Posts = memo(async function Posts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();

  return (
    <List
      spacing="24px"
      alignContent="flex-start"
      maxW="800px"
    >
      {posts.map((post) => (
        <ListItem key={post.id}>
          <PostComponent {...post} />
        </ListItem>
      ))}
    </List>
  );
});

export default Posts;
