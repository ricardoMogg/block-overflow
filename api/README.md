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
  # run server w/ hot reload
  npm run dev
```