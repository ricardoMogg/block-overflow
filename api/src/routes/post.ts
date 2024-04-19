import { Router } from 'express';
import { CreatePost, GetPosts, GetPost, CreatePostInput, CreateComment, CreateCommentInput, UpvotePost, UpvoteComment, UpvoteCommentInput, UpvotePostInput, DownvoteComment, DownvoteCommentInput, DownvotePost, DownvotePostInput } from '../database/post';

export const postRouter = Router();

// create post
postRouter.post('/', async (req, res) => {
  try {
    const {title, content, walletAddress} = req.body;
    const post = <CreatePostInput>{
      title,
      content,
      walletAddress,
    }
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

// add comment to post
postRouter.post('/:id/comment', async (req, res) => {
  try {
    const postId = req.params.id;
    const {content, walletAddress} = req.body;
    const comment = <CreateCommentInput>{
      content: content,
      walletAddress,
      postId,
    }
    const posts = await CreateComment(comment);
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// upvote a post
postRouter.post('/:id/upvote', async (req, res) => {
  try {
    const postId = req.params.id;
    const input = <UpvotePostInput>{
      postId,
      walletAddress: req.body.walletAddress,
    }
    const posts = await UpvotePost(input);
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// upvote a comment
postRouter.post('/:id/comment/upvote/:commentId', async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const {walletAddress} = req.body;
    const input = <UpvoteCommentInput>{
      postId,
      commentId,
      walletAddress,
    }
    const posts = await UpvoteComment(input);
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// downvote a post
postRouter.delete('/:id/downvote', async (req, res) => {
  try {
    const postId = req.params.id;
    const input = <DownvotePostInput>{
      postId,
      walletAddress: req.body.walletAddress,
    }
    const posts = await DownvotePost(input);
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// downvote a comment
postRouter.delete('/:id/comment/downvote/:commentId', async (req, res) => {
  try {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    const {walletAddress} = req.body;
    const input = <DownvoteCommentInput>{
      postId,
      commentId,
      walletAddress,
    }
    const posts = await DownvoteComment(input);
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
