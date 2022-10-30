import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../../../components/Layout";
import {
  getSchoolTypeById,
  getLocalAuthorityById,
  getSchoolTypes,
  getLocalAuthorities,
  getSchoolsForLocalType,
} from "../../../../lib";
import SchoolList from "./components/SchoolList";

export const getStaticProps: GetStaticProps = async (context) => {
  const { localAuthority: localAuthorityId, schoolType: schoolTypeId } =
    context.params ?? {};

  const la = await getLocalAuthorityById((localAuthorityId as string) ?? "");
  const schoolTypes = await getSchoolTypes();
  const schools = await getSchoolsForLocalType(
    localAuthorityId as string,
    schoolTypeId as string
  );
  return {
    // Passed to the page component as props
    props: {
      localAuthorityId,
      localAuthority: la,
      schoolTypeId,
      schoolType: schoolTypes[(schoolTypeId as string) ?? ""],
      schoolTypes,
      schools,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const las = await getLocalAuthorities();
  const types = await getSchoolTypes();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = Object.keys(las).reduce((prev, cur) => {
    Object.keys(types).forEach((type) => {
      prev.push({ params: { localAuthority: cur, schoolType: type } });
    });
    return prev;
  }, new Array<{ params: any }>());

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

const Post = ({
  localAuthorityId,
  schoolTypeId,
  localAuthority,
  schoolType,
  schools,
  schoolTypes,
}: any) => {
  // Render post...
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              {schoolType} Schools in {localAuthority}{" "}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the {schoolType} in {localAuthority}.
            </p>
          </div>
          {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add user
            </button>
          </div> */}
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="shadow-sm ring-1 ring-black ring-opacity-5"></div>
              <SchoolList schools={schools} schoolTypes={schoolTypes} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
