const DEV_APP_URL = 'http://localhost:3000';

export function getAppUrl() {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  if (process.env.NODE_ENV !== 'production') return DEV_APP_URL;
  if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return DEV_APP_URL;
}

export function getServerAppUrl() {
  if (process.env.NODE_ENV !== 'production') return DEV_APP_URL;
  if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return DEV_APP_URL;
}