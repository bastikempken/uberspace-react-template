import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

export interface TokenPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthStore {
  token: string | null;
  tokenPayload: TokenPayload | null;
}

export interface AuthAction {
  setToken: (token: string) => void;
  isValid: () => boolean;
}

export const useAuthStore = create<AuthStore & AuthAction>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        tokenPayload: null,
        setToken: (token: string) =>
          set(() => {
            const tokenPayload = jwtDecode<TokenPayload>(token);
            return { token, tokenPayload };
          }),
        isValid: () => {
          const { tokenPayload } = get();
          if (!tokenPayload) {
            return false;
          }
          const exp = new Date(tokenPayload.exp * 1000);
          const now = new Date();
          console.log(exp);
          console.log('---');
          console.log(now);
          console.log(now < exp);
          return now < exp;
        },
      }),
      { name: 'auth-store' },
    ),
  ),
);
