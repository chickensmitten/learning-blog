import { Magic } from "magic-sdk";
import { useRouter } from "next/router";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input name="email" type="email" />
      <button type="submit">Log in</button>
    </form>
  );
}

export default Login;
