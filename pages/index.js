import Hero from "@components/home-page/hero";
import AllPosts from "@components/posts/all-posts";
import { Fragment } from "react";
import { getAllPosts } from "./api/posts";

function Home(props) {
  const posts = props.posts
  return (
    <Fragment>
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