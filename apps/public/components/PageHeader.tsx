import React from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  PencilIcon,
  LinkIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import Breadcrumbs, { Breadcrumb } from "./Breadcrumbs";

interface PageHeaderProps {
  readonly title: string;
  readonly crumbs: Breadcrumb[];
}

const PageHeader = ({ title, crumbs }: PageHeaderProps) => (
  <header className="bg-gray-50 py-8">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
      <div className="min-w-0 flex-1">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h1>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 fill-current" />
            Full-time
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 fill-current" />
            Remote
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 fill-current" />
            $120k &ndash; $140k
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 fill-current" />
            Closing on January 9, 2020
          </div>
        </div>
      </div>
      <div className="mt-5 flex xl:mt-0 xl:ml-4">
        <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400 fill-current" />
            Edit
          </button>
        </span>

        <span className="ml-3 hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400 fill-current" />
            View
          </button>
        </span>

        <div className="sm:ml-3">
          <label id="listbox-label" className="sr-only">
            {" "}
            Change published status{" "}
          </label>
          <div className="relative">
            <div className="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
              <div className="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                <div className="inline-flex items-center rounded-l-md border border-transparent bg-purple-500 py-2 pl-3 pr-4 text-white shadow-sm">
                  <LinkIcon className="h-5 w-5 fill-current" />
                  <p className="ml-2.5 text-sm font-medium">Published</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-l-none rounded-r-md bg-purple-500 p-2 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  aria-haspopup="listbox"
                  aria-expanded="true"
                  aria-labelledby="listbox-label"
                >
                  <span className="sr-only">Change published status</span>
                  <ChevronDownIcon className="h-5 w-5 text-white fill-current" />
                </button>
              </div>
            </div>

            {/* <!--
              Select popover, show/hide based on select state.

              Entering: ""
                From: ""
                To: ""
              Leaving: "transition ease-in duration-100"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
            {/* <ul
              className="absolute left-0 z-10 mt-2 -mr-1 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-0"
            > */}
              {/* <!--
                Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                Highlighted: "text-white bg-purple-500", Not Highlighted: "text-gray-900"
              --> */}
              {/* <li
                className="text-gray-900 cursor-default select-none p-4 text-sm"
                id="listbox-option-0"
                role="option"
              >
                <div className="flex flex-col">
                  <div className="flex justify-between"> */}
                    {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                    {/* <p className="font-normal">Published</p> */}
                    {/* <!--
                      Checkmark, only display for selected option.

                      Highlighted: "text-white", Not Highlighted: "text-purple-500"
                    --> */}
                    {/* <span className="text-purple-500">
                      <CheckIcon className="h-5 w-5 fill-current" />
                    </span>
                  </div> */}
                  {/* <!-- Highlighted: "text-purple-200", Not Highlighted: "text-gray-500" --> */}
                  {/* <p className="text-gray-500 mt-2">
                    This job posting can be viewed by anyone who has the link.
                  </p>
                </div>
              </li> */}

              {/* <!-- More items... --> */}
            {/* </ul> */}
          </div>
        </div>

        {/* <!-- Dropdown --> */}
        <div className="relative ml-3 sm:hidden">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            id="mobile-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            More
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500 fill-current" />
          </button>

          {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-200"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
          <div
            className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
            tabIndex={-1}
          >
            {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="mobile-menu-item-0"
            >
              Edit
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="mobile-menu-item-1"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default PageHeader;
