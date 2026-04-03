import Redis from 'ioredis'

const globalForRedis = globalThis as unknown as { redis?: Redis }

if (!globalForRedis.redis) {
  globalForRedis.redis = new Redis(process.env.REDIS_URL!)
}

export const redis = globalForRedis.redis
