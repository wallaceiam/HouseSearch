import React from "react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import { useRouter } from "next/router";

const links = [
  { title: "Schools", href: "/schools" },
  { title: "Sign in", href: "/signin" },
];

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=violet&shade=500"
                alt="Your Company"
              />
            </div>

            {/* <!-- Links section --> */}
            <div className="hidden lg:ml-10 lg:block">
              <div className="flex space-x-4">
                {links.map(({ href, title }, i) => (
                  <a
                    key={i}
                    href={href}
                    className={`${
                      router.asPath.startsWith(href)
                        ? "bg-gray-100"
                        : "text-gray-900"
                    } hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium`}
                    aria-current={
                      router.asPath.startsWith(href) ? "page" : undefined
                    }
                  >
                    {title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            {/* <!-- Search section --> */}
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 focus-within:text-gray-500">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 fill-current" />
                </div>
                <input
                  id="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div>
          <div className="flex lg:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* <!--  Menu open: "hidden", Menu closed: "block" --> */}
              <Bars3Icon className="block h-6 w-6 fill-none stroke-current" />
              {/* <!-- Menu open: "block", Menu closed: "hidden"  --> */}
              <XMarkIcon className="hidden h-6 w-6 fill-none stroke-current" />
            </button>
          </div>

          {/* <!-- Actions section --> */}
          <div className="hidden lg:ml-4 lg:block">
            <div className="flex items-center">
              <button
                type="button"
                className="flex-shrink-0 rounded-full bg-gray-50 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <span className="sr-only">View notifications</span>
                {/* <!-- Heroicon name: outline/bell --> */}
                <BellIcon className="h-6 w-6 fill-none stroke-current" />
              </button>

              {/* <!-- Profile dropdown --> */}
              <ProfileDropdownMenu />
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div
        className="border-b border-gray-200 bg-gray-50 lg:hidden"
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          {/* <!-- Current: "bg-gray-100", Default: "hover:bg-gray-100" --> */}
          <a
            href="#"
            className="bg-gray-100 block px-3 py-2 rounded-md font-medium text-gray-900"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="hover:bg-gray-100 block px-3 py-2 rounded-md font-medium text-gray-900"
          >
            Jobs
          </a>

          <a
            href="#"
            className="hover:bg-gray-100 block px-3 py-2 rounded-md font-medium text-gray-900"
          >
            Applicants
          </a>

          <a
            href="#"
            className="hover:bg-gray-100 block px-3 py-2 rounded-md font-medium text-gray-900"
          >
            Company
          </a>
        </div>
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                Whitney Francis
              </div>
              <div className="text-sm font-medium text-gray-500">
                whitney.francis@example.com
              </div>
            </div>
            <button
              type="button"
              className="ml-auto flex-shrink-0 rounded-full bg-gray-50 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6 fill-none stroke-current" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            <a
              href="#"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Your Profile
            </a>

            <a
              href="#"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Settings
            </a>

            <a
              href="#"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
