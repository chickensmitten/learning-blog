# Learning NextJS with a Blog (A More Thorough Refresher, Recap and Relearn)
- Complete list of learning nextJS from start to finish

Basic Running Script
```
npm run dev
```

## Resources
Some other resources to refresh
- [Next Portfolio SY from Jerga](https://github.com/chickensmitten/portfolio-sy)
- [Express Portfolio SY from Jerga](https://github.com/chickensmitten/portfolio-sy-api)
- [NextJS Summary from Max](https://github.com/chickensmitten/14_nextjs_summary)

## Setup App

- Tailwind css[https://tailwindcss.com/docs/installation]

```
npx create-next-app learning-blog

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p 

npm install @headlessui/react @heroicons/react
```

- added @imports into styles/globals.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- In root add the following code to "jsconfig.json". Lessons from Jerga's portfolio-sy
```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["/*"]
    }
  }
}
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
- Implement Mongoose. It forces schema.
- API, replace fetch with Axios
  - refactor API calls like portfolio-sy
- Infinite scrolling for posts pagination: find() with forEach(). limit 2, then iterate
- unit testing, integration testing, end-to-end testing, maybe TDD?
- Use MongoDB not firebase because firebase is closed.
- what is useSWR. Refer to Udemy Max's React & NextJS lesson 114
- what is useContext. it is similar to helper functions. Refer to Udemy Max's React & NextJS lesson 46.
- what is useCallback

# Anatomy of a NextJS app
Below highlights the important anatomy
- **components**: 
  - To put views for partial pages
- **pages**: 
  - This is where APIs and the pages are located.
  - NextJS auto creates sitemaps based on the pages. 
  - `getStaticProps`, `getStaticPaths`, `getServerSideProps` are only usable in "pages". It is not usable in "components" and "lib"
  - For dynamic pages, use `[id]` to create folder then use `index.js` as the default file. To load paths for dynamic static pages, when you use `getStaticProps`, you will need to have `getStaticPaths` to predefine all paths
  - To use external API functions in pages, it is best to extract the external API calls to the API folder, then import the API functions in to the pages to call on it.
- **public**:
  - It holds assets like images, md files, videos etc.
- **styles**:
  - Holds css or scss files
  - Some tutorials allow putting scss files in components next to the JS files. but I prefer it to be cleanly put into styles folder
- **lib/utils/hoc/halpers**: 
  - To store extra code to access third party libaries that doesn't quite fit in other folders  
- **jsconfig.json**:
  - To adjust paths and baseUrl so that `imports` in JS file will look nicer
- **.env.development.local or .env.development.production**
  - To put environment data
