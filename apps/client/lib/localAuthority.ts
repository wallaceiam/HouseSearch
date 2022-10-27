
interface ValueMap {
  readonly [slug: string]: string;
}

export const getLocalAuthorities = async () => {
  const result = await fetch('http://localhost:3010/v1/ofsted/localAuthorities')
  const data = await result.json();
  return data as ValueMap;
};

export const getLocalAuthorityById = async (laId: string) => {
  const localAuthorities = await getLocalAuthorities();
  return localAuthorities[laId];
}
