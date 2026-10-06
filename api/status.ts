import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const DEVICE_STATUS_KEY = 'esp32:status';

type Device = {
  name: string;
  online: boolean;
};

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse,
) {
  const devices = await redis.hvals(DEVICE_STATUS_KEY) as Device[];
  res.status(200).json(devices);
}
