const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes
const MAX_CACHE_ENTRIES = 100; // Max cached users to prevent memory exhaustion

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const store = new Map<string, CacheEntry<unknown>>();

// Cleanup expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now - entry.timestamp > COOLDOWN_MS) store.delete(key);
  }
}, 60 * 1000);

export function getCached<T>(key: string): T | null {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;

  if (Date.now() - entry.timestamp > COOLDOWN_MS) {
    store.delete(key);
    return null;
  }

  return entry.data;
}

export function setCached<T>(key: string, data: T): void {
  // Evict oldest entry if at capacity
  if (store.size >= MAX_CACHE_ENTRIES && !store.has(key)) {
    const oldest = store.keys().next().value;
    if (oldest) store.delete(oldest);
  }
  store.set(key, { data, timestamp: Date.now() });
}

export function buildCacheKey(username: string): string {
  return username.toLowerCase();
}
