type JwtPayload = {
  exp?: number;
};

const normalizeToken = (token: string) => (token.startsWith('Bearer ') ? token.slice(7) : token);

const decodeJwtPayload = (token: string): JwtPayload | null => {
  const parts = token.split('.');
  if (parts.length < 2) {
    return null;
  }
  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  try {
    return JSON.parse(atob(padded)) as JwtPayload;
  } catch {
    return null;
  }
};

export const isTokenActive = (token: string | null): boolean => {
  if (!token || token.trim().length === 0) {
    return false;
  }
  const payload = decodeJwtPayload(normalizeToken(token));
  if (!payload?.exp || typeof payload.exp !== 'number') {
    return false;
  }
  return payload.exp * 1000 > Date.now();
};
