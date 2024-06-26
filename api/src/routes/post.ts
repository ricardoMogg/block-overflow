import { Router } from 'express'
import {
  CreatePost,
  GetPosts,
  GetPost,
  CreatePostInput,
  CreateComment,
  CreateCommentInput,
  UpvotePost,
  UpvoteComment,
  UpvoteCommentInput,
  UpvotePostInput,
  DownvoteComment,
  DownvoteCommentInput,
  DownvotePost,
  DownvotePostInput,
  DeletePostInput,
  DeletePost,
  DeleteComment,
  DeleteCommentInput,
  UpdateComment,
  UpdateCommentInput,
  UpdatePost,
  UpdatePostInput,
  Bounty,
} from '../database/post'

export const postRouter = Router()

// create post
postRouter.post('/', async (req, res) => {
  try {
    const {
      title,
      content,
      walletAddress,
      tags,
      bountyId,
      bountyAmount,
      bountyStatus,
    } = req.body
    const post = <CreatePostInput>{
      title,
      content,
      walletAddress,
      tags,
      bounty: <Bounty>{
        id: bountyId,
        amount: bountyAmount,
        status: bountyStatus,
      },
    }
    const posts = await CreatePost(post)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// get single post
postRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const post = await GetPost(id)
    return res.json(post)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// get all posts
postRouter.get('/', async (req, res) => {
  try {
    const posts = await GetPosts()
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// add comment to post
postRouter.post('/:id/comment', async (req, res) => {
  try {
    const postId = req.params.id
    const { content, walletAddress } = req.body
    const comment = <CreateCommentInput>{
      content: content,
      walletAddress,
      postId,
    }
    const posts = await CreateComment(comment)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// upvote a post
postRouter.post('/:id/upvote', async (req, res) => {
  try {
    const postId = req.params.id
    const input = <UpvotePostInput>{
      postId,
      walletAddress: req.body.walletAddress,
    }
    const posts = await UpvotePost(input)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// upvote a comment
postRouter.post('/:id/comment/upvote/:commentId', async (req, res) => {
  try {
    const postId = req.params.id
    const commentId = req.params.commentId
    const { walletAddress } = req.body
    const input = <UpvoteCommentInput>{
      postId,
      commentId,
      walletAddress,
    }
    const posts = await UpvoteComment(input)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// delete a post
postRouter.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const input = <DeletePostInput>{
      postId,
      walletAddress: req.body.walletAddress,
    }
    const posts = await DeletePost(input)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// delete a comment
postRouter.delete('/:id/comment/:commentId', async (req, res) => {
  try {
    const postId = req.params.id
    const commentId = req.params.commentId
    const { walletAddress } = req.body
    const input = <DeleteCommentInput>{
      postId,
      commentId,
      walletAddress,
    }
    const posts = await DeleteComment(input)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// update a post
postRouter.patch('/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const {
      walletAddress,
      content,
      title,
      tags,
      bountyStatus,
      chosenCommentId,
    } = req.body
    const input = <UpdatePostInput>{
      postId,
      walletAddress,
      content,
      title,
      tags,
      bountyStatus,
      chosenCommentId,
    }
    const posts = await UpdatePost(input)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// update a comment
postRouter.patch('/:id/comment/:commentId', async (req, res) => {
  try {
    const postId = req.params.id
    const commentId = req.params.commentId
    const { walletAddress, content } = req.body
    const input = <UpdateCommentInput>{
      postId,
      commentId,
      walletAddress,
      content,
    }
    const posts = await UpdateComment(input)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// remove a post upvote
postRouter.delete('/:id/downvote', async (req, res) => {
  try {
    const postId = req.params.id
    const input = <DownvotePostInput>{
      postId,
      walletAddress: req.body.walletAddress,
    }
    const posts = await DownvotePost(input)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

// remove a comment upvote
postRouter.delete('/:id/comment/downvote/:commentId', async (req, res) => {
  try {
    const postId = req.params.id
    const commentId = req.params.commentId
    const { walletAddress } = req.body
    const input = <DownvoteCommentInput>{
      postId,
      commentId,
      walletAddress,
    }
    const posts = await DownvoteComment(input)
    return res.json(posts)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})
