export interface ISchool {
  readonly name: string;
  readonly slug: string;
  readonly schoolType: string;
  readonly localAuthority: string;
  readonly localAuthoritySlug: string;
}

export const getSchoolById = async (localAuthority: string, slug: string): Promise<ISchool> => {
  const result = await fetch(`${process.env.SERVER_URL}/v1/ofsted/${localAuthority}/${slug}`);
  return await result.json();
};

export const getSchools = async (): Promise<ISchool[]> => {
  const result = await fetch(`${process.env.SERVER_URL}/v1/ofsted/`);
  return await result.json();
};

export const getSchoolsForLocalType = async (localAuthority: string, schoolType?: string): Promise<ISchool[]> => {
  const params = new URLSearchParams(schoolType !== undefined ? { localAuthority, schoolType }: {localAuthority});
  const result = await fetch(`${process.env.SERVER_URL}/v1/ofsted/${localAuthority}`);
  return await result.json();
};
