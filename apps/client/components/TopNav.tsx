import React from "react";
import Link from "next/link";
import { UrlObject } from "url";

interface LinkProps {
  readonly active?: boolean;
  readonly href?: string | UrlObject;
  readonly children?: React.ReactNode;
}
const NavLink = ({ active = false, href = "#", children }: LinkProps) => (
  <Link href={href}>
    <a
      className={`${
        active
          ? "dark:bg-gray-900 dark:text-white border-indigo-500 text-gray-900"
          : "dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 "
      } px-3 py-2 rounded-md text-sm font-medium`}
    >
      {children}
    </a>
  </Link>
);

const TopNav = () => (
  <div className="ml-10 flex items-center space-x-4">
    <NavLink active={true}>Dashboard</NavLink>
    <NavLink>Team</NavLink>
    <NavLink>Projects</NavLink>
    <NavLink>Calendar</NavLink>

  </div>
);

export default TopNav;
