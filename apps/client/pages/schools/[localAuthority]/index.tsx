import React, { useState, useMemo } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { Breadcrumb } from "../../../components/Breadcrumbs";
import Layout from "../../../components/Layout";
import PageHeader from "../../../components/PageHeader";
import {
  getSchoolTypes,
  getLocalAuthorities,
  getLocalAuthorityById,
  getSchoolsForLocalType,
} from "../../../lib";
import SchoolList from "./[schoolType]/components/SchoolList";
import SchoolTable from "../../../components/SchoolTable";

export const getStaticProps: GetStaticProps = async (context) => {
  const { localAuthority: localAuthorityId } = context.params ?? {};

  const la = await getLocalAuthorityById((localAuthorityId as string) ?? "");
  const schoolTypes = await getSchoolTypes();
  const schools = await getSchoolsForLocalType(localAuthorityId as string);
  return {
    // Passed to the page component as props
    props: {
      localAuthorityId: context.params?.localAuthority as string,
      localAuthority: la,
      schoolTypes,
      schools,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const las = await getLocalAuthorities();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = Object.keys(las).map((key) => ({
    params: { localAuthority: key },
  }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

const Post = ({
  localAuthorityId,
  localAuthority,
  schoolTypes,
  schools,
}: any) => {
  const crumbs: Breadcrumb[] = [
    {
      title: "Schools",
    },
    {
      title: localAuthority,
      href: {
        pathname: "/schools/[localAuthority]",
        query: {
          localAuthority,
        },
      },
    },
  ];

  const [tab, setTab] = useState<string>();

  const types = useMemo(
    () =>
      Object.keys(schoolTypes).reduce((prev, cur) => {
        const count = schools.reduce((p: number, c: any) => {
          return p + (c.schoolType === cur ? 1 : 0);
        }, 0);
        if (count > 0) {
          prev.push({ title: schoolTypes[cur], tab: cur, count });
        }
        return prev;
      }, new Array()),
    [schoolTypes, schools]
  );

  const displayedSchools = useMemo(
    () =>
      tab === undefined
        ? schools
        : schools.filter((s: any) => s.schoolType === tab),
    [schools, tab]
  );

  // Render post...
  return (
    <Layout>
      <PageHeader title={`Schools in ${localAuthority}`} crumbs={crumbs} />

      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <h2 className="text-lg font-medium text-gray-900">Schools</h2>

            {/* <!-- Tabs --> */}
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a school type
              </label>
              {/* <!-- Use an "onChange" listener to redirect the user to the selected tab URL. --> */}
              <select
                id="tabs"
                name="tabs"
                className="mt-4 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              >
                {types.map(({ tab, title }) => (
                  <option key={tab} value={tab}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
                  {types.map(({ title, tab, count }) => (
                    <button
                      key={tab}
                      onClick={() => setTab(tab)}
                      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    >
                      {title}
                      {count > 0 && (
                        <span className="bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                          {count}
                        </span>
                      )}
                    </button>
                  ))}
                  {/* <!-- Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" --> */}
                  {/* <a
                    href="#"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Applied */}
                  {/* <!-- Current: "bg-purple-100 text-purple-600", Default: "bg-gray-100 text-gray-900" --> */}
                  {/* <span className="bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                      2
                    </span>
                  </a> */}
                </nav>
              </div>
            </div>
          </div>

          <SchoolTable schoolTypes={schoolTypes} schools={displayedSchools} />

          {/* <!-- Pagination --> */}
          <nav
            className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
            aria-label="Pagination"
          >
            <div className="-mt-px flex w-0 flex-1">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                {/* <!-- Heroicon name: mini/arrow-long-left --> */}
                <svg
                  className="mr-3 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                    clip-rule="evenodd"
                  />
                </svg>
                Previous
              </a>
            </div>
            <div className="hidden md:-mt-px md:flex">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                1
              </a>
              {/* <!-- Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" --> */}
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-purple-500 px-4 pt-4 text-sm font-medium text-purple-600"
                aria-current="page"
              >
                2
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                3
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                4
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                5
              </a>
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                6
              </a>
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
              >
                Next
                {/* <!-- Heroicon name: mini/arrow-long-right --> */}
                <svg
                  className="ml-3 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </main>
    </Layout>
  );
};

export default Post;
