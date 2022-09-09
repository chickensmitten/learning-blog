import useAuth from "@components/hooks/useAuth";
import { Magic } from "magic-sdk";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function UpdateEmail() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [updateEmailState, setUpdateEmailState] = useState(false);
  
  function changeEmailState() {
    setUpdateEmailState(current => !current)
  }

  async function updateEmailHandler(event) {
    event.preventDefault();
    const { elements } = event.target;

    const magic = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    )

    // run Magic Code
    try {
      const emailChanged = await magic.user.updateEmail({ email: elements.email.value });
      // reset the cookie
      if (emailChanged) {
        const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
        await magic.user.logout();
    
        const authRequest = await fetch('/api/auth/logout', {
          method: 'DELETE'
        }); 
        
        if (authRequest.ok) {
          // need to also delete api_token and authed
          router.push('/');
          toast.success("Your email has been updated! Please login again with your new email")
        } else {
          toast.error("Opps, something when wrong while trying to log out.")
        }        
      }

    } catch(e) {
      console.log(e)
      toast.error("Failed to change email. Please try again.")
    }
    // revert back to text
    changeEmailState();
  } 

  return (
    <Fragment>
      {
        updateEmailState && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Update your email</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Change the email address you want associated with your account.</p>
              </div>
              <form className="mt-5 sm:flex sm:items-center" onSubmit={updateEmailHandler}>
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )
      }
      {
        !updateEmailState && (
          <div>
            <span className="flex-grow">{user && (loading ? 'Loading...' : user.email)}</span>
            <span className="ml-4 flex-shrink-0">
              <button
                type="button"
                onClick={changeEmailState}
                className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update
              </button>
            </span>
          </div>
        )
      }    
    </Fragment>
  )
}

export default UpdateEmail;