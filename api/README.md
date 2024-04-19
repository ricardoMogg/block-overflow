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

## pushing changes

Be sure to run these commands before committing:

```sh
  # vercel depends on dist output, so we have to make sure we add these to commits
  # TODO: ideally this should be in a pre-commit hook, a little annoying to set up with a subdirectory
  npm run ts.check && npm run build && npm run add-build
```
