import { CreateComment, CreatePost } from './src/database/post'
import { LoremIpsum } from 'lorem-ipsum'
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

const postCount = 50
const commentsPerPost = 10

// grabs a random wallet address
const getWalletAddress = () => {
  const possible = [
    '0xb794f5ea0ba39494ce839613fffba74279579268',
    '0x281055afc982d96fab65b3a49cac8b878184cb16',
    '0x6f46cf5569aefa1acc1009290c8e043747172d89',
    '0x90e63c3d53e0ea496845b7a03ec7548b70014a91',
    '0x53d284357ec70ce289d89d55f53a3cfc8c5d8a3d',
    '0x7a9f3cd060ab180f36c17fe6bdf9974f577d77aa',
    '0x2a65aca4d5fc5b5c859090a6c34d164135398226',
    '0x1a26338f0d905e295fccb71fa9ea849ffa12aaf4',
    '0x6f52730dba7b02beefcaf0d6998c1b0b7f6de7d6',
    '0x4e83362442b8d1beC04abEF3B2737bC7ecDf219b',
  ]
  return possible[Math.floor(Math.random() * possible.length)]
}

// calls CreatePost and CreateComment functions from /src/database/post.ts in a loop
const generateData = async () => {
  const posts = []

  for (let i = 0; i < postCount; i++) {
    // create post
    const post = {
      title: lorem.generateWords(10),
      content: lorem.generateParagraphs(2),
      walletAddress: getWalletAddress(),
      tags: ['base', 'ethereum', 'solidity'],
      bountAmount: Math.random() * 5,
      bountyStatus: 'open',
      bountyId: 'test bounty id',
    }
    const createdPost = await CreatePost(post)
    posts.push()
    for (let j = 0; j < commentsPerPost; j++) {
      const comment = {
        postId: createdPost.id,
        content: lorem.generateParagraphs(3),
        walletAddress: getWalletAddress(),
      }
      await CreateComment(comment)
    }
  }
}

try {
  generateData()
} catch (error) {
  console.error('Error generating data:', error)
}
