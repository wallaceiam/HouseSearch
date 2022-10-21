import Redis from 'ioredis';

export const zscan = async (redis: Redis, key: string, count = 5_000): Promise<string[]> => {
  const keys: string[] = [];
  let cursor = 0;

  do {
    const results = await redis.zscan(key, cursor, 'COUNT', count);
    cursor = +results[0];

    const result = results[1].filter((_val, index) => index % 2 === 0);
    keys.push(...result);
  } while (cursor !== 0);

  return keys;
};

interface GetSortedSetWithValuesProps<T> {
  readonly redis: Redis;
  readonly indexKey: string;
  readonly valueKeyPrefix: string;
  readonly modifier?: (value: any) => T;
}

export const getSortedSetWithValues = async <T>({
  redis,
  indexKey,
  valueKeyPrefix,
  modifier = (v) => v as T,
}: GetSortedSetWithValuesProps<T>): Promise<T[]> => {
  const keys = await zscan(redis, indexKey);

  const pipeline = redis.pipeline();

  keys.forEach((innerKey) => {
    pipeline.hgetall(`${valueKeyPrefix}${innerKey}`);
  });

  const results = await pipeline.exec();

  const unflatted = results?.map(([_, cur]) => modifier(cur)) ?? [];
  return unflatted;
};
