import EditPostForm from "@components/posts/edit-posts";
import { getPostData } from "@pages/api/posts/[slug]";
import { Fragment } from "react";

function EditPostPage(props) {

  return (
    <Fragment>
      <EditPostForm post={props.post} />
    </Fragment>
  );
}

export default EditPostPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  
  const data = await getPostData(slug);

  return {
    props: data
  }
}