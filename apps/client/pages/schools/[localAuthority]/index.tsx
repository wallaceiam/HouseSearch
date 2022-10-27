import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import Layout from "../../../components/Layout";
import {
  getSchoolTypes,
  getLocalAuthorities,
  getLocalAuthorityById,
} from "../../../lib";

export const getStaticProps: GetStaticProps = async (context) => {
  const la = await getLocalAuthorityById(
    (context.params?.localAuthority as string) ?? ""
  );
  const schoolTypes = await getSchoolTypes();
  return {
    // Passed to the page component as props
    props: {
      localAuthorityId: context.params?.localAuthority as string,
      localAuthority: la,
      schoolTypes,
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

const Post = ({ localAuthorityId, localAuthority, schoolTypes }: any) => {
  // Render post...
  return (
    <Layout>
      <h1>{localAuthority}</h1>
      {Object.keys(schoolTypes).map((key) => (
        <p key={key}>
          <Link
            href={{
              pathname: "/schools/[localAuthority]/[schoolType]",
              query: { localAuthority: localAuthorityId, schoolType: key },
            }}
          >
            {schoolTypes[key]}
          </Link>
        </p>
      ))}
    </Layout>
  );
};

export default Post;
