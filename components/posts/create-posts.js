import DropZone from "@components/layout/shared/dropzone";
import DropZoneShowImages from "@components/layout/shared/dropzone-show-images";
import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connectStorageEmulator, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import slugify from "slugify";
import { v4 } from "uuid";
import {firebaseStorage} from "lib/firebase-storage";
import { useRouter } from "next/router";

async function sendPostData(postDetails) {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(postDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
  return data.post;
}

function CreatePostForm() {
  const [enteredSubject, setEnteredSubject] = useState("");
  const [enteredPreview, setEnteredPreview] = useState("");
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [percent, setPercent] = useState(0);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();

      reader.onload = function (e) {     
        setImages((prevState) => [
          ...prevState,
          { id: v4(), src: e.target.result },
        ]);
      };

      // (1) upload to firebase
      const imageSlug = slugify(file.name)

      const imageRef = ref(firebaseStorage, `blog-images/${imageSlug + "-" + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress, percent not used yet
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUploadedImages(oldArray => [...oldArray, url])
          });
        }
      );

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  function clearForm() {
    setEnteredSubject("");
    setEnteredPreview("");
    setImages([]);
    setUploadedImages([]);
  }

  async function sendMessageHandler(event) {
    event.preventDefault(); //prevent reload of page
    try {
      const newPost = await sendPostData({
        subject: enteredSubject,
        preview: enteredPreview,
        uploadedImages: uploadedImages,
      });
      clearForm();
      console.log(newPost.slug)
      router.push(`/posts/${newPost.slug}`);
      toast.success("Post Created Successfully!")
    } catch (error) {
      // there could be a problem where if the images aren't tied to mongodb, we should delete it
      // else we'll have too many images sitting in firebase
      toast.error("Failed to create Post.")
    }
  }

  return(
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="text-center my-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block text-indigo-600 lg:inline">Create a Post</span>
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

              <DropZone onDrop={onDrop} accept={"image/*"} />
              <DropZoneShowImages images={images} />

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
      <ToastContainer />
    </div>    
  )
}

export default CreatePostForm;