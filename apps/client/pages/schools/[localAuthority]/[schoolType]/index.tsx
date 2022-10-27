import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import {
  getSchoolTypeById,
  getLocalAuthorityById,
  getSchoolTypes,
  getLocalAuthorities,
  getSchoolsForLocalType,
} from "../../../../lib";

export const getStaticProps: GetStaticProps = async (context) => {
  const { localAuthority: localAuthorityId, schoolType: schoolTypeId } =
    context.params ?? {};

  const la = await getLocalAuthorityById((localAuthorityId as string) ?? "");
  const sc = await getSchoolTypeById((schoolTypeId as string) ?? "");
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
      schoolType: sc,
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
}: any) => {
  // Render post...
  return (
    <Layout>
      <h1>{localAuthority}</h1>
      <p>{schoolType}</p>
      {schools && schools.map((s: any) => (
        <p key={s.slug}>
          <Link
            href={{
              pathname: "/schools/[localAuthority]/[schoolType]/[school]",
              query: {
                localAuthority: localAuthorityId,
                schoolType: schoolTypeId,
                school: s.slug,
              },
            }}
          >
            {s.name}
          </Link>
        </p>
      ))}
    </Layout>
  );
};

export default Post;
