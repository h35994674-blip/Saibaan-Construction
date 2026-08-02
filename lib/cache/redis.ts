import { Redis } from '@upstash/redis';

// Singleton Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Generic cache wrapper.
 * - On cache HIT: returns cached data instantly.
 * - On cache MISS: runs the fetcher, caches the result, then returns it.
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  try {
    const cached = await redis.get<T>(key);
    if (cached !== null) return cached;
  } catch {
    // If Redis is unavailable, silently fall through to the DB
  }

  const fresh = await fetcher();

  try {
    await redis.set(key, fresh, { ex: ttlSeconds });
  } catch {
    // If we can't write to Redis, still return fresh data
  }

  return fresh;
}

/** Invalidate (delete) one or more cache keys */
export async function invalidateCache(...keys: string[]) {
  try {
    if (keys.length > 0) await redis.del(...keys);
  } catch {
    // Silently ignore cache invalidation failures
  }
}
