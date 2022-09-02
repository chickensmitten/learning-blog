import Hero from "@components/home-page/hero";
import AllPosts from "@components/posts/all-posts";
import { Fragment } from "react";
import { getAllPosts } from "./api/posts";

function Home(props) {
  const messages = props.messages
  return (
    <Fragment>
      <Hero />
      <AllPosts messages={messages} />    
    </Fragment>
  )
}

export async function getStaticProps() {
  const data = await getAllPosts();

  return {
    props: {
      messages: data
    },
    revalidate: 1800
  }
}

export default Home;