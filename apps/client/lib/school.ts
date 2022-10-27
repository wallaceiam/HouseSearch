interface ISchool {
  readonly slug: string;
  readonly schoolType: string;
  readonly localAuthority: string;
}

export const getSchoolById = async (slug: string): Promise<ISchool> => {
  const result = await fetch(`http://localhost:3010/v1/ofsted/${slug}`);
  return await result.json();
};

export const getSchools = async (): Promise<ISchool[]> => {
  const result = await fetch(`http://localhost:3010/v1/ofsted/`);
  return await result.json();
};

export const getSchoolsForLocalType = async (localAuthority: string, schoolType: string): Promise<ISchool[]> => {
  const result = await fetch(`http://localhost:3010/v1/ofsted/?${new URLSearchParams({ localAuthority, schoolType })}`);
  return await result.json();
};
