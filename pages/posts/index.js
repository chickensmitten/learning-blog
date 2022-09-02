import AllPosts from "@components/posts";

function AllPostsPage({messages}) {
  return (
    <AllPosts messages={messages} />
  );
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

export default AllPostsPage;