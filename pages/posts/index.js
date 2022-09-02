import AllPosts from "@components/posts/all-posts";
import { getAllPosts } from "@pages/api/posts";

function AllPostsPage({messages}) {
  return (
    <AllPosts messages={messages} />
  );
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

export default AllPostsPage;