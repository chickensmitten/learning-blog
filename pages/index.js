import Hero from "@components/home-page/hero";
import AllPosts from "@components/posts";
import { Fragment } from "react";

function Home(props) {
  const messages = props.messages
  return (
    <Fragment>
      <Hero />
      <AllPosts messages={messages} />    
    </Fragment>
  )
}

export async function getServerSideProps() {
  const resData = await fetch(`${process.env.API_URL}/posts`);
  const data = await resData.json();
  return {
    props: {
      messages: data
    }
  }
}

export default Home;