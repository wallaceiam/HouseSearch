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

export const queryOfsted = async (): Promise<IShoolSummary[]> => {
  const redis = useRedis();

  const schools = await getSortedSetWithValues<IShoolSummary>({
    redis,
    indexKey: 'school.index',
    valueKeyPrefix: 'school.simple:',
    modifier,
  });

  return schools ?? [];
};
