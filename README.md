# Learning Blog

Basic Running Script
```
npm run dev
```

## Setup App

Tailwind css[https://tailwindcss.com/docs/installation]

```
npx create-next-app learning-blog

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p 

npm install @headlessui/react @heroicons/react
```

added @imports into styles/globals.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Next Learning List

- authentication
  Google Authentication: https://dev.to/ndom91/adding-authentication-to-an-existing-serverless-next-js-app-in-no-time-with-nextauth-js-192h
  Magic Link Email Authentication: https://vercel.com/guides/add-auth-to-nextjs-with-magic
  - Not signed in user cannot create article from api, nor access create article page

- posts, create, edit, delete
- Mongoose: forces schema. Will be useful
- API: axios vs fetch
  - refactor API calls like portfolio-sy
- Infinite scrolling for posts pagination: find() with forEach(). limit 2, then iterate
- find a use case for use effect
- [upload image](https://react-dropzone.js.org/#section-basic-example)

- unit testing, integration testing, end-to-end testing, maybe TDD?
- what is useSWR?