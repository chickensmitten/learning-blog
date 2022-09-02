// From https://tailwindui.com/components/application-ui/lists/stacked-lists and "With truncated content preview"

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/line-clamp'),
    ],
  }
  ```
*/
const messages = [
  {
    id: 1,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    time: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 2,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    time: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 3,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    time: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  }  
  // More messages...
]

function AllPosts() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10">
        <div className="text-center my-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-indigo-600 lg:inline">List of All Posts</span>
          </h2>
        </div>
        <ul role="list" className="divide-y divide-gray-200 my-8">
          {messages.map((message) => (
            <li
              key={message.id}
              className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
            >
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1">
                  <a href="#" className="block focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="truncate text-base font-medium text-gray-900">{message.sender}</p>
                    <p className="truncate text-base text-gray-500">{message.subject}</p>
                  </a>
                </div>
                <time dateTime={message.datetime} className="flex-shrink-0 whitespace-nowrap text-base text-gray-500">
                  {message.time}
                </time>
              </div>
              <div className="mt-1">
                <p className="text-base text-gray-600 line-clamp-2">{message.preview}</p>
              </div>
            </li>
          ))}
        </ul>        
      </div>
    </div>
  )
}

export default AllPosts;