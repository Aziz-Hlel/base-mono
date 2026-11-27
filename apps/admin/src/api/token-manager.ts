/**
 * In-memory access token store.
 * Keeps the JWT out of localStorage/sessionStorage to reduce XSS exposure;
 * session persistence across reloads relies on the httpOnly refresh cookie.
 */
class TokenManager {
  private accessToken: string | null = null;

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string | null): void {
    this.accessToken = token;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }
}

export const tokenManager = new TokenManager();
