import Redis from "ioredis";

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