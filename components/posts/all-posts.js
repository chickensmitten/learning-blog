// From https://tailwindui.com/components/application-ui/lists/stacked-lists and "With truncated content preview"

import Link from "next/link";


function AllPosts({posts}) {
  
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10">
        <div className="text-center my-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-indigo-600 lg:inline">List of All Posts</span>
          </h2>
        </div>
        <ul role="list" className="divide-y divide-gray-200 my-8">
          {posts.map((post) => (
            <li
              key={post._id}
              className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
            >
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1">
                  <Link href={`/posts/${post.slug}`}>
                    <a className="block focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="truncate text-base font-medium text-gray-900">{post.sender}</p>
                      <p className="truncate text-base text-gray-500">{post.subject}</p>
                    </a>
                  </Link>
                </div>
                <time dateTime={post.datetime} className="flex-shrink-0 whitespace-nowrap text-base text-gray-500">
                  {post.time}
                </time>
              </div>
              <div className="mt-1">
                <p className="text-base text-gray-600 line-clamp-2">{post.preview}</p>
              </div>
            </li>
          ))}
        </ul>        
      </div>
    </div>
  )
}

export default AllPosts;