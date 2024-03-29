import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  driver: 'redis'
  config: {
    redis: RedisOptions
  }
}

export default {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_ROUTE,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || null,
    },
  },
} as ICacheConfig
