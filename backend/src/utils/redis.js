import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config({ path: './config.env' });

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
