import client from './client'


function CreatePost() {
  return client.post.create({
    data: {
      title: 'Hello World',
      body: 'This is my first post',
    },
  })
}


function GetPosts() {
  return client.post.findMany()
}

export { CreatePost, GetPosts }