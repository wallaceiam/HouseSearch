import { GetStaticProps, GetStaticPaths } from "next";
import { Breadcrumb } from "../../../../components/Breadcrumbs";
import Layout from "../../../../components/Layout";
import PageHeader from "../../../../components/PageHeader";
import {
  getSchools,
  getSchoolById,
  ISchool,
} from "../../../../lib";
import VerticalNav from "../../../../components/VerticalNav";

export const getStaticProps: GetStaticProps<SchoolPageProps> = async (
  context
) => {
  const { localAuthoritySlug, slug } = context.params ?? {};
  const school = await getSchoolById(
    (localAuthoritySlug as string) ?? "",
    (slug as string) ?? ""
  );
  return {
    // Passed to the page component as props
    props: { school },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
  
  const schools = await getSchools();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = schools.map(({ localAuthoritySlug, slug }) => ({
    params: { localAuthoritySlug, slug },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

interface SchoolPageProps {
  readonly school: ISchool;
}

const SchoolPage = ({ school }: SchoolPageProps) => {
  const { name, slug, localAuthority, localAuthoritySlug } = school;
  const crumbs: Breadcrumb[] = [
    {
      title: "Schools",
    },
    {
      title: localAuthority,
      href: {
        pathname: "/schools/[localAuthoritySlug]/",
        query: {
          localAuthoritySlug,
        },
      },
    },
    {
      title: name,
      href: {
        pathname: "/schools/[localAuthoritySlug]/[slug]/",
        query: {
          localAuthoritySlug,
          slug,
        },
      },
    },
  ];
  return (
    <Layout>
      <PageHeader title={name} crumbs={crumbs} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="z-0 flex flex-1 overflow-hidden">
            <main className="z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* <!-- Start main area--> */}
              <div className="inset-0 py-6 pr-4 sm:pr-6 lg:pr-8">
                <div className="h-ful">
                  <div id="overview" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      Overview
                    </h5>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>

                  </div>
                  <p>Main</p>
                  <div id="teachers" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      Teachers
                    </h5>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>

                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                  <div id="teachers2" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      Teachers
                    </h5>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>

                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <p className="font-normal text-gray-700 ">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- End main area --> */}
            </main>
            <aside className="hidden w-96 flex-shrink-0 overflow-y-auto xl:order-first xl:flex xl:flex-col">
              {/* <!-- Start secondary column (hidden on smaller screens) --> */}
              <div className="inset-0 py-6 pr-4 sm:pr-6 lg:pr-8">
                <div className="h-full">
                  <VerticalNav school={school} />
                </div>
              </div>
              {/* <!-- End secondary column --> */}
            </aside>
          </div>
        </div>
      </div>
      <p>{JSON.stringify(school)}</p>
    </Layout>
  );
};

export default SchoolPage;
