import Layout from "@components/layout/layout";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
