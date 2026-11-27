import { refreshTokens } from '@/api/generated/client';
import { client } from '@/api/generated/client/client.gen';
import { tokenManager } from './token-manager';

const AUTH_BYPASS_PATHS = ['/api/auth/refresh', '/api/auth/login', '/api/auth/register'];
const RETRIED_HEADER = 'x-auth-retried';

let initialized = false;
let refreshPromise: Promise<string | null> | null = null;
let onUnauthorizedHandler: (() => void) | null = null;

export const setOnUnauthorized = (handler: (() => void) | null) => {
  onUnauthorizedHandler = handler;
};

/**
 * The server wraps responses in `{ message, data }`, while the generated OpenAPI
 * schemas describe the inner `data` payload directly. Unwrap both shapes safely.
 */
export const unwrapApiData = <T>(payload: T | { data: T } | undefined): T | undefined => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T | undefined;
};

/**
 * Calls `/api/auth/refresh` using the httpOnly refresh cookie, deduplicating
 * concurrent calls so multiple simultaneous 401s share a single refresh request.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const { data, response } = await refreshTokens();
      if (!response?.ok) {
        tokenManager.clearAccessToken();
        return null;
      }

      const unwrapped = unwrapApiData(data);
      const accessToken = unwrapped?.accessToken ?? null;
      tokenManager.setAccessToken(accessToken);
      return accessToken;
    } catch {
      tokenManager.clearAccessToken();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

const shouldSkipRefresh = (request: Request): boolean => {
  if (request.headers.get(RETRIED_HEADER) === '1') return true;
  try {
    const pathname = new URL(request.url).pathname;
    return AUTH_BYPASS_PATHS.some((path) => pathname.endsWith(path));
  } catch {
    return false;
  }
};

export const initApiClient = () => {
  if (initialized) return;
  initialized = true;

  client.setConfig({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    credentials: 'include',
  });

  client.interceptors.request.use((request) => {
    const token = tokenManager.getAccessToken();
    if (token && !request.headers.has('Authorization')) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
    return request;
  });

  client.interceptors.response.use(async (response, request, opts) => {
    if (response.status !== 401 || shouldSkipRefresh(request)) {
      return response;
    }

    const newToken = await refreshAccessToken();
    if (!newToken) {
      onUnauthorizedHandler?.();
      return response;
    }

    const retryHeaders = new Headers(request.headers);
    retryHeaders.set('Authorization', `Bearer ${newToken}`);
    retryHeaders.set(RETRIED_HEADER, '1');

    const canHaveBody = request.method !== 'GET' && request.method !== 'HEAD';
    const retryRequest = new Request(request.url, {
      method: request.method,
      headers: retryHeaders,
      body: canHaveBody ? opts.serializedBody : undefined,
      credentials: opts.credentials ?? 'include',
      redirect: 'follow',
    });

    const _fetch = opts.fetch ?? globalThis.fetch;
    return _fetch(retryRequest);
  });
};
