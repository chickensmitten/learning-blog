import Hero from "@components/home-page/hero";
import AllPosts from "@components/posts/all-posts";
import { Fragment } from "react";
import { getAllPosts } from "./api/posts";
import Head from "next/head";

function Home(props) {
  const posts = props.posts
  return (
    <Fragment>
      <Head>
        {/* logged in user will no longer be able to access this page */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('authed')) {
            window.location.href = "/user/profile"
          }
        `,
          }}
        />
      </Head>      
      <Hero />
      <AllPosts posts={posts} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const data = await getAllPosts();

  return {
    props: {
      posts: data
    },
    revalidate: 1800
  }
}

export default Home;