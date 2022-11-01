import { ILocalAuthority, LocalAuthority, ISchoolType, SchoolType, School, ISchool } from '@rightlocation/schema';

export const querySummaries = async (filter: Record<string, any>): Promise<ISchool[]> => {
  const schools = await School.find(filter, { _id: 0, __v: 0 });
  return schools;
};

/**
 * Get user by id
 * @param {string} id
 * @returns {Promise<ISchool | null>}
 */
export const getSchoolById = async (filter: Record<string, any>): Promise<ISchool | null> => {
  const school = await School.findOne(filter, { _id: 0, __v: 0 });
  return school;
};

export const queryLocalAuthorities = async (): Promise<ILocalAuthority[]> => {
  const localAuthorities = await LocalAuthority.find();
  return localAuthorities;
};

export const querySchoolTypes = async (): Promise<ISchoolType[]> => {
  const schoolTypes = await SchoolType.find();
  return schoolTypes;
};
