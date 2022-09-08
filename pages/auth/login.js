import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { Fragment } from "react";

function Login() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { elements } = event.target;

    // Add the Magic code here
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ 
      email: elements.email.value 
    });

    // Once we have the did from magic, login with our own API
    const authRequest = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}` },
    });    
    
    if (authRequest.ok) {
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      router.push('/user/profile');
    } else {
      console.log("error")
      /* handle errors */
    }
  };

  return (
    <Fragment>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Login in
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </Fragment> 
  );
}

export default Login;
