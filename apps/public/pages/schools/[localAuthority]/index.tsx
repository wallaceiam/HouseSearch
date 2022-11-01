import React, { useState, useMemo, useCallback } from "react";
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
import SchoolTable from "../../../components/SchoolTable";

export const getStaticProps: GetStaticProps = async (context) => {
  const { localAuthority: localAuthorityId } = context.params ?? {};

  const la = await getLocalAuthorityById((localAuthorityId as string) ?? "");
  const schoolTypes = await getSchoolTypes();
  const schools = await getSchoolsForLocalType(localAuthorityId as string);
  return {
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

  const paths = Object.keys(las).map((key) => ({
    params: { localAuthority: key },
  }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

const LocalAuthorityPage = ({
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
          localAuthorityId,
        },
      },
    },
  ];

  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);

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
      selectedTabs.length < 1
        ? schools
        : schools.filter((s: any) => selectedTabs.includes(s.schoolType)),
    [schools, selectedTabs]
  );

  const onSelectTab = useCallback((tab: string) => {
    if(selectedTabs.includes(tab)) {
      setSelectedTabs(selectedTabs.filter((t) => t !== tab));
    } else {
      setSelectedTabs([...selectedTabs, tab]);
    }
  }, [selectedTabs, setSelectedTabs]);

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
                      onClick={() => onSelectTab(tab)}
                      className={`${selectedTabs.includes(tab) ? "border-purple-500 text-purple-600 hover:text-purple-700 hover:border-purple-200" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      {title}
                      {count > 0 && (
                        <span className={`${selectedTabs.includes(tab) ? "border-purple-500 text-purple-600" : "bg-gray-100 text-gray-900" } hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block`}>
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
        </div>
      </main>
    </Layout>
  );
};

export default LocalAuthorityPage;
