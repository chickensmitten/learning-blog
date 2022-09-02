import { useRouter } from "next/router";
import { Fragment } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

function Layout(props) {
  const { pathname } = useRouter();
  console.log(pathname)
  const isNotHomePage = pathname !== "/"
  return (
    <Fragment>
      {
        isNotHomePage && <Navbar />
      }
      {props.children}
      <Footer />
    </Fragment>
  );
}

export default Layout;