import client from './client'

interface CreatePostInput {
  title: string
  body: string
  authorId: string
}
function CreatePost(post: CreatePostInput) {
  return client.post.create({
    data: {
      title: post.title,
      body: post.body,
      authorId: post.authorId,
    },
  })
}

function GetPost(id: string) {
  return client.post.findFirstOrThrow({
    where: {
      id: id,
    },
  })
}

function GetPosts() {
  return client.post.findMany(
    {
      orderBy: {
        createdAt: 'desc',
      },
    }
  )
}

export { CreatePost, GetPosts, GetPost, CreatePostInput }