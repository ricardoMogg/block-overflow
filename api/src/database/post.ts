import client from './client'

interface CreatePostInput {
  title: string
  content: string
  walletAddress: string
}
function CreatePost(post: CreatePostInput) {
  return client.post.create({
    data: {
      title: post.title,
      content: post.content,
      walletAddress: post.walletAddress,
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
  return client.post.findMany(
    {
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
    },
  )
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
      }
  })
}

interface CreateCommentInput {
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
      }
    }
  })
}

interface UpvotePostInput {
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
      }
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      }
    }
  })
}

interface UpvoteCommentInput {
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
        }
      },
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      }
    }
  })
}

interface DownvotePostInput {
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
      }
    },
    include: {
      _count: {
        select: {
          comments: true,
          upvotes: true,
        },
      }
    }
  })
}

interface DownvoteCommentInput {
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
        }
      },
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      }
    }
  })
}

export { CreatePost, GetPosts, GetPost, CreatePostInput, CreateComment, CreateCommentInput, UpvotePost, UpvoteComment, UpvoteCommentInput, UpvotePostInput, GetComment, DownvoteCommentInput, DownvoteComment, DownvotePostInput, DownvotePost }