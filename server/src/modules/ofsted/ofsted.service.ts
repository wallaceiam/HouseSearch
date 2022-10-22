import { getSortedSetWithValues, useRedis } from '../redis';
import { IShoolSummary } from './ofsted.models';

const modifier = (value: any): IShoolSummary => {
  const { rating, lat, long, isTypeFlag , gender, ...rest } = value;
  return {
    ...rest,
    rating: +rating,
    lat: +lat,
    long: +long,
    isTypeFlag: +isTypeFlag,
    gender: +gender
  }
};

export const querySummaries = async (): Promise<IShoolSummary[]> => {
  const redis = useRedis();

  const schools = await getSortedSetWithValues<IShoolSummary>({
    redis,
    indexKey: 'school.index',
    valueKeyPrefix: 'school.simple:',
    modifier,
  });

  return schools ?? [];
};

/**
 * Get user by id
 * @param {string} id
 * @returns {Promise<ISchool | null>}
 */
 export const getSchoolById = async (id: string): Promise<any | null> => {
  const redis = useRedis();

  const school = await redis.hgetall(`school:${id}`);

  return school as any;

 }
