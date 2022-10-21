import Redis from 'ioredis';

import config from '../../config/config';

let redis: Redis | undefined = undefined;
export const useRedis = () => {
  if (!redis) {
    redis = new Redis(config.redis.url);
  }
  return redis;
};
