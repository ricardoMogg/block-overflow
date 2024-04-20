import client from './client'

type BountyStatus = 'open' | 'closed'

type Bounty = {
  id: string
  amount: number
  status: BountyStatus
}

type CreatePostInput = {
  title: string
  content: string
  walletAddress: string
  tags: string[]
  bounty?: Bounty
}
function CreatePost(post: CreatePostInput) {
  return client.post.create({
    data: {
      title: post.title,
      content: post.content,
      walletAddress: post.walletAddress,
      tags: post.tags,
      bountyId: post.bounty?.id,
      bountyAmount: post.bounty?.amount,
      bountyStatus: post.bounty?.status,
    },
  })
}

function GetPost(id: string) {
  return client.post.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      comments: true,
      upvotes: true,
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  })
}

function GetPosts() {
  return client.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  })
}

function GetComment(id: string) {
  return client.comment.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
    },
  })
}

type CreateCommentInput = {
  content: string
  walletAddress: string
  postId: string
}
function CreateComment(comment: CreateCommentInput) {
  return client.post.update({
    where: {
      id: comment.postId,
    },
    data: {
      comments: {
        create: {
          content: comment.content,
          walletAddress: comment.walletAddress,
        },
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  })
}

type UpdatePostInput = {
  postId: string
  title: string
  content: string
  walletAddress: string
  tags: string[]
  bountyStatus: BountyStatus
}
function UpdatePost(updatePost: UpdatePostInput) {
  return client.post.update({
    where: {
      id: updatePost.postId,
      walletAddress: updatePost.walletAddress,
    },
    data: {
      title: updatePost.title,
      content: updatePost.content,
      tags: updatePost.tags,
      bountyStatus: updatePost.bountyStatus,
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  })
}

type UpdateCommentInput = {
  postId: string
  commentId: string
  content: string
  walletAddress: string
}
function UpdateComment(updateComment: UpdateCommentInput) {
  return client.comment.update({
    where: {
      id: updateComment.commentId,
    },
    data: {
      content: updateComment.content,
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
    },
  })
}

type DeletePostInput = {
  postId: string
  walletAddress: string
}
function DeletePost(deletePost: DeletePostInput) {
  return client.post.delete({
    where: {
      id: deletePost.postId,
      walletAddress: deletePost.walletAddress,
    },
  })
}

type DeleteCommentInput = {
  postId: string
  commentId: string
  walletAddress: string
}
function DeleteComment(deleteComment: DeleteCommentInput) {
  return client.post.update({
    where: {
      id: deleteComment.postId,
    },
    data: {
      comments: {
        delete: {
          id: deleteComment.commentId,
        },
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  })
}

type UpvotePostInput = {
  postId: string
  walletAddress: string
}
function UpvotePost(upvote: UpvotePostInput) {
  return client.post.update({
    where: {
      id: upvote.postId,
    },
    data: {
      upvotes: {
        create: {
          walletAddress: upvote.walletAddress,
        },
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  })
}

type UpvoteCommentInput = {
  postId: string
  commentId: string
  walletAddress: string
}
function UpvoteComment(upvote: UpvoteCommentInput) {
  return client.comment.update({
    where: {
      id: upvote.commentId,
    },
    data: {
      upvotes: {
        create: {
          walletAddress: upvote.walletAddress,
        },
      },
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
    },
  })
}

type DownvotePostInput = {
  postId: string
  walletAddress: string
}
function DownvotePost(downvote: DownvotePostInput) {
  return client.post.update({
    where: {
      id: downvote.postId,
    },
    data: {
      upvotes: {
        delete: {
          postId_walletAddress: {
            postId: downvote.postId,
            walletAddress: downvote.walletAddress,
          },
        },
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      },
    },
  })
}

type DownvoteCommentInput = {
  postId: string
  commentId: string
  walletAddress: string
}
function DownvoteComment(downvote: DownvoteCommentInput) {
  return client.comment.update({
    where: {
      id: downvote.commentId,
    },
    data: {
      upvotes: {
        delete: {
          commentId_walletAddress: {
            commentId: downvote.commentId,
            walletAddress: downvote.walletAddress,
          },
        },
      },
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
    },
  })
}

export {
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
  GetComment,
  DownvoteCommentInput,
  DownvoteComment,
  DownvotePostInput,
  DownvotePost,
  DeleteComment,
  DeleteCommentInput,
  DeletePost,
  DeletePostInput,
  UpdateComment,
  UpdateCommentInput,
  UpdatePost,
  UpdatePostInput,
  Bounty,
  BountyStatus,
}
