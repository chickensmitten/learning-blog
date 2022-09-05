import Link from "next/link"
import { useRouter } from "next/router";

function ActiveLink(props) {
  const { title, href } = props;
  const router = useRouter();
  return (
    <Link
      href={href}
      >
      <a
        className={
          router.asPath === href
            ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
            : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}
        aria-current={router.asPath === href ? "page" : undefined}
      >
        {title}
      </a>
    </Link>
  )
}

export default ActiveLink