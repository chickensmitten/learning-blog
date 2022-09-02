import Hero from "@components/home-page/hero";
import AllPosts from "@components/posts";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <AllPosts />    
    </Fragment>
  )
}
