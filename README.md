# member-nec

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
$ npm run dev-prod

# build for development and launch server
$ npm run build
$ npm run start

# generate static project for development
$ npm run export

# build for production and launch server
$ npm run build-prod

# generate static project for production
$ npm run export-prod

# deploy to Firebase hosting
$ firebase target:apply hosting production kuroco-member-imabari
$ firebase deploy --only hosting:production
$ firebase target:apply hosting development dev-imabari-fc
$ firebase deploy --only hosting:development
$ firebase deploy
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
