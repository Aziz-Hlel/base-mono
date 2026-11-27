import { client } from '@/api/generated/client/client.gen';

let initialized = false;

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

export const initApiClient = () => {
  if (initialized) return;
  initialized = true;

  client.setConfig({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:1100',
  });
};
