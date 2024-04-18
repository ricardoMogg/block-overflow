import client from './client'

interface User {
  userName: string
  email: string
  walletAddress: string
}

async function CreateUser(user: User) {
  try {
    return await client.user.create({
      data: {
        userName: user.userName,
        walletAddress: user.walletAddress,
        email: user.email,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
