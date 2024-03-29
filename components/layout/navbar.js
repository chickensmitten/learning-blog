/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import ActiveLink from "./shared/activelink";
import { useRouter } from "next/router";
import { Magic } from 'magic-sdk';

const navigation = [
  { name: "Your Posts", href: "/posts" },
  { name: "Create Blog Post", href: "/posts/create" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {

  const router = useRouter();

  const handleSignOut = async () => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
    await magic.user.logout();

    const authRequest = await fetch('/api/auth/logout', {
      method: 'DELETE'
    }); 

    if (authRequest.ok) {
      // need to also delete api_token and authed
      router.push('/');
    } else {
      console.log("error")
    }
  };
 

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/">
                  <a>
                    <div className="flex flex-shrink-0 items-center">
                      <div className="block h-8 w-auto lg:hidden">
                        <Image
                          src="/images/mark.svg"
                          alt="Your Company"
                          width="32px"
                          height="32px"
                        />
                      </div>
                      <div className="hidden h-8 w-auto lg:block">
                        <Image
                          src="/images/mark.svg"
                          alt="Your Company"
                          width="32px"
                          height="32px"
                        />
                      </div>
                    </div>
                  </a>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <ActiveLink key={item.name} title={item.name} href={item.href} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="/images/profile.avif"
                        alt="Your Profile Pic"
                        width="32px"
                        height="32px"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link href="/user/profile">
                        <a>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </span>
                            )}
                          </Menu.Item>
                        </a>
                      </Link>

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleSignOut}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button key={item.name} as="a" className=" block px-3 py-2 rounded-md text-sm font-medium">
                  <ActiveLink key={item.name} title={item.name} href={item.href} />
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
