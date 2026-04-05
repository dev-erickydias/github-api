const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 30; // 30 requests per minute per IP

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const clients = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of clients) {
    if (now > entry.resetAt) clients.delete(key);
  }
}, 5 * 60 * 1000);

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  let entry = clients.get(ip);

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    clients.set(ip, entry);
  }

  entry.count++;

  return {
    allowed: entry.count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - entry.count),
    resetAt: entry.resetAt,
  };
}
