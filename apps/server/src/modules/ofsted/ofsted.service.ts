import { getIntersectedSortedSetWithValues, getSortedSetWithValues, useRedis } from '../redis';
import { ValueMap } from '@locawise/schema';
import { IShoolSummary } from './ofsted.models';
import { logger } from '../logger';

const modifier = (value: any): IShoolSummary => {
  const { rating, lat, long, isTypeFlag, gender, ...rest } = value;
  return {
    ...rest,
    rating: +rating,
    lat: +lat,
    long: +long,
    isTypeFlag: +isTypeFlag,
    gender: +gender,
  };
};

export interface IFilter {
  localAuthority?: string;
  rating?: string | number;
  schoolType?: string;
}

const toArray = (a: string | number) => {
  if (Array.isArray(a)) {
    return a;
  }
  if (typeof a === 'string') {
    if (a.indexOf(',') > 1) {
      return a.split(',').map((v) => +v);
    }
  }
  return [+a];
};

export const querySummaries = async (filter: IFilter): Promise<IShoolSummary[]> => {
  const redis = useRedis();

  const { localAuthority, schoolType, rating } = filter;

  const zsets: string[] = [];
  if (localAuthority) {
    zsets.push(`${localAuthority}.index`);
  }
  if (schoolType) {
    zsets.push(`${schoolType}.index`);
  }
  if (rating) {
    toArray(rating).forEach((r) => zsets.push(`school:${r}.index`));
  }

  const indexKeys = zsets.length < 1 ? ['school.index'] : zsets;

  logger.info(indexKeys);

  const schools = await getIntersectedSortedSetWithValues<IShoolSummary>({
    redis,
    indexKeys: indexKeys,
    valueKeyPrefix: 'school:',
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
};

export const queryLocalAuthorities = async (): Promise<ValueMap[]> => {
  const redis = useRedis();

  const localAuthorities = await getSortedSetWithValues<ValueMap>({
    redis,
    indexKey: 'local_authority.index',
    valueKeyPrefix: 'local_authority:',
  });

  return localAuthorities ?? [];
};

export const querySchoolTypes = async (): Promise<ValueMap[]> => {
  const redis = useRedis();

  const schoolTypes = await getSortedSetWithValues<ValueMap>({
    redis,
    indexKey: 'school_type.index',
    valueKeyPrefix: 'school_type:',
  });

  return schoolTypes ?? [];
};
