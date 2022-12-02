# Learning NextJS with a Blog
- Complete list of learning nextJS from start to finish

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

## Completed
- authentication
  Google Authentication: https://dev.to/ndom91/adding-authentication-to-an-existing-serverless-next-js-app-in-no-time-with-nextauth-js-192h
  Magic Link Email Authentication: https://vercel.com/guides/add-auth-to-nextjs-with-magic
- upload image
  - [dropzone](https://react-dropzone.js.org/#section-basic-example)
  - upload images [firebase tutorial video](https://www.youtube.com/watch?v=YOAeBSCkArA) with [github](https://github.com/machadop1407/firebase-file-upload/blob/main/src/App.js)or [firebase tutorial article](https://www.makeuseof.com/upload-files-to-firebase-using-reactjs/)
  - dropzone in create-posts.js also demonstrates the power of usecallback. It allows for moving between components.
- create posts
- edit posts
- limit image type



## Next Learning List
- Not signed in user cannot create article from api, nor access create article page
- edit and delete post with images
- limit image size
- Mongoose: forces schema. Will be useful
- API: axios vs fetch
  - refactor API calls like portfolio-sy
- Infinite scrolling for posts pagination: find() with forEach(). limit 2, then iterate
- unit testing, integration testing, end-to-end testing, maybe TDD?
- what is useSWR. Refer to Udemy Max's React & NextJS lesson 114
- what is useContext. it is similar to helper functions. Refer to Udemy Max's React & NextJS lesson 46.
- what is useCallback
- firebase permission settings
