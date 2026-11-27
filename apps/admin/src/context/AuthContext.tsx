import { initApiClient, refreshAccessToken, setOnUnauthorized, unwrapApiData } from '@/api/client';
import {
  getMe,
  login as loginApi,
  logout as logoutApi,
  type LoginInput,
  type UserRes,
} from '@/api/generated/client';
import { tokenManager } from '@/api/token-manager';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface AuthContextValue {
  user: UserRes | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginInput) => Promise<void>;
  logout: (allDevices?: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

initApiClient();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = useCallback(async (): Promise<UserRes | null> => {
    const { data, response } = await getMe();
    if (!response?.ok) return null;
    const unwrapped = unwrapApiData(data);
    return unwrapped?.user ?? null;
  }, []);

  useEffect(() => {
    setOnUnauthorized(() => {
      tokenManager.clearAccessToken();
      setUser(null);
    });

    return () => setOnUnauthorized(null);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const bootstrapAuth = async () => {
      try {
        const accessToken = await refreshAccessToken();
        if (!accessToken) {
          if (!cancelled) setUser(null);
          return;
        }

        const currentUser = await fetchCurrentUser();
        if (!cancelled) {
          if (!currentUser) {
            tokenManager.clearAccessToken();
          }
          setUser(currentUser);
        }
      } catch {
        tokenManager.clearAccessToken();
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void bootstrapAuth();

    return () => {
      cancelled = true;
    };
  }, [fetchCurrentUser]);

  const login = useCallback(
    async (credentials: LoginInput) => {
      const { data, error, response } = await loginApi({ body: credentials });

      if (!response?.ok) {
        const message =
          error && typeof error === 'object' && 'message' in error
            ? String((error as { message: unknown }).message)
            : 'Invalid email or password';
        throw new Error(message);
      }

      const unwrapped = unwrapApiData(data);
      const accessToken = unwrapped?.accessToken;
      if (!accessToken) {
        throw new Error('Authentication failed: no access token returned');
      }

      tokenManager.setAccessToken(accessToken);

      const currentUser = await fetchCurrentUser();
      if (!currentUser) {
        tokenManager.clearAccessToken();
        throw new Error('Failed to load user profile');
      }

      setUser(currentUser);
    },
    [fetchCurrentUser],
  );

  const logout = useCallback(async (allDevices = false) => {
    try {
      await logoutApi({
        query: allDevices ? ({ allDevices: 'true' } as never) : undefined,
      });
    } finally {
      tokenManager.clearAccessToken();
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
