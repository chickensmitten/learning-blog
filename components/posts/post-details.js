import Link from "next/link";

function PostDetails(props) {
  const post = props.post;

  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="block text-center text-lg font-semibold text-indigo-600">
              Introducing
            </span>
            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {post.sender}
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8 text-gray-500">{post.subject}</p>
        </div>
        <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
          {post.preview}
        </div>
        <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
          <Link
            href={`/posts/${post.slug}/edit`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto"
            >
              Edit
            </button>
          </Link>
        </div>        
      </div>

    </div>
  );
}

export default PostDetails;
