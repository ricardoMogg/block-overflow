import { Router } from 'express';
import { CreatePost, GetPosts } from '../database/post';

export const postRouter = Router();

// create post
postRouter.post('/', async (req, res) => {
  try {
    const posts = await CreatePost();
    return res.json(posts);
  } catch (e) {
    console.error(e);
  }
});

// get all posts
postRouter.get('/', async (req, res) => {
  try {
    const posts = await GetPosts();
    return res.json(posts);
  } catch (e) {
    console.error(e);
  }
});

// get all posts
postRouter.post('/health', (req, res) => {
  res.send("post malone!!");
});
