import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

async function updatePostData(postDetails) {
  const response = await fetch(`/api/posts/${postDetails.slug}/update`, {
    method: "PATCH",
    body: JSON.stringify(postDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
}

function EditPostForm(props) {
  const router = useRouter();
  const post = props.post;
  const { subject, preview, slug } = post;

  const [enteredSubject, setEnteredSubject] = useState(subject);
  const [enteredPreview, setEnteredPreview] = useState(preview);

  function clearForm() {
    setEnteredSubject("");
    setEnteredPreview("");
  }

  async function sendMessageHandler(event) {
    event.preventDefault(); //prevent reload of page
    try {
      await updatePostData({
        subject: enteredSubject,
        preview: enteredPreview,
        slug: slug,
      });
      router.push(`/posts/${post.slug}`);
      toast.success("Updated Post Successfully!");
    } catch (error) {
      toast.error("Failed to create Post.")
    }
  }

  return(
    <Fragment>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="text-center my-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-indigo-600 lg:inline">Edit Post</span>
          </h2>
        </div>      
        <form className="space-y-6" onSubmit={sendMessageHandler}>
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="mt-5 space-y-6 md:col-span-12 md:mt-0">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Write your title here"
                        required
                        value={enteredSubject}
                        onChange={(event) => setEnteredSubject(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    Preview
                  </label>
                  <div className="mt-1 ">
                    <textarea
                      id="preview"
                      name="preview"
                      rows={10}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Write something about your post"
                      value={enteredPreview}
                      onChange={(event) => setEnteredPreview(event.target.value)}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={clearForm}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Clear
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>    
    </Fragment>    
  )
}

export default EditPostForm;


