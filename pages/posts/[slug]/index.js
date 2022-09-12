import PostDetails from "@components/posts/post-details";
import { getPostData } from "@pages/api/posts/[slug]";
import { getAllPosts } from "@pages/api/posts";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

function PostDetailsPage(props) {
  return (
    <Fragment>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl py-12 sm:px-6 lg:px-8">
          <ToastContainer />
          <PostDetails post={props.post} />
        </div>
      </div>
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