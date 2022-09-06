import AllPosts from "@components/posts/all-posts";
import { getAllPosts } from "@pages/api/posts";

function AllPostsPage({posts}) {
  return (
    <AllPosts posts={posts} />
  );
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

export default AllPostsPage;