// src/index.js
import express, { Express } from 'express'
import dotenv from 'dotenv'
import { postRouter } from './routes/post'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// cors
app.use(cors())

// routes
app.use('/post', postRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
