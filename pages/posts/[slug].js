import PostDetails from "@components/posts/post-details";
import { getPostData } from "@pages/api/posts/[slug]";
import { getAllPosts } from "@pages/api/posts";
import { Fragment } from "react";


function PostDetailsPage(props) {
  return (
    <Fragment>
      <PostDetails post={props.post} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  
  const data = await getPostData(slug);

  return {
    props: data,
    revalidate: 1800
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts();

  const paths = allPosts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: false,
  };
}


export default PostDetailsPage;