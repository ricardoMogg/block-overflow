import { Router } from 'express';
import { CreatePost, GetPosts, GetPost, CreatePostInput } from '../database/post';

export const postRouter = Router();

// create post
postRouter.post('/', async (req, res) => {
  try {
    const {title, body, authorId} = req.body;
    const post = <CreatePostInput>{
      title,
      body,
      authorId,
    }
    console.log(title, post, authorId)
    const posts = await CreatePost(post);
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get single post
postRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const post = await GetPost(id);
    return res.json(post);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get all posts
postRouter.get('/', async (req, res) => {
  try {
    const posts = await GetPosts();
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// sanity check
postRouter.post('/health', (req, res) => {
  res.send("post malone!!");
});
