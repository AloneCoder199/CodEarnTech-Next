// lib/auth.ts
import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const setAuthCookie = (token: string, user: any) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'strict' });
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7, secure: true, sameSite: 'strict' });
};

export const getAuthToken = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const getUserData = (): any | null => {
  const userData = Cookies.get(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const logout = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};




