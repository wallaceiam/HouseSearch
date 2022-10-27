import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../../../../components/Layout";
import {
  getSchoolTypeById,
  getLocalAuthorityById,
  getSchools,
  getSchoolById,
} from "../../../../../lib";

export const getStaticProps: GetStaticProps = async (context) => {
  const { localAuthority, schoolType, school: slug } = context.params ?? {};
  const la = await getLocalAuthorityById((localAuthority as string) ?? "");
  const sc = await getSchoolTypeById((schoolType as string) ?? "");
  const school = await getSchoolById((slug as string) ?? "");
  return {
    // Passed to the page component as props
    props: { localAuthority: la, schoolType: sc, school },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const schools = await getSchools();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = schools.map(({ localAuthority, schoolType, slug }) => ({
    params: { localAuthority, schoolType, school: slug },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

const Post = ({ localAuthority, schoolType, school }: any) => {
  // Render post...
  return (
    <Layout>
      <h1>{localAuthority}</h1>
      <p>{schoolType}</p>
      <p>{JSON.stringify(school)}</p>
    </Layout>
  );
};

export default Post;
