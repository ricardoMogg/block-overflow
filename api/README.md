# api

## running locally

```sh
  # create a copy of the .env.example as .env
  cp .env.example .env
  # install dependencies
  npm i
  # run docker containers
  docker-compose up -d
  # generate prisma types if updating db schema
  npx prisma generate
  # generate posts to see database if you'd like
  npm run seed
  # run server w/ hot reload
  npm run dev
```
