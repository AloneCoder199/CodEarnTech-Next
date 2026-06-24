'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  studentId?: string; // FIX: Made optional kyunke Admin ke paas studentId nahi hogi
  profile?: {
    firstName: string;
    lastName: string;
    avatar?: string;
    phone?: string;
  };
  role: 'admin' | 'student';
  isEmailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;        // Dono rakh diye hain taake purana code na tute
  isLoading: boolean;      // Aapka component isLoading mang raha hai
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/me', { cache: 'no-store' });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const result = await res.json();
      
      if (result?.data?.user) {
        setUser(result.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      setUser(data.user);
      window.location.href = data.redirectTo || (data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
      throw err;
    }
  };

  const register = async (userData: any) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      router.push(`/verify-email?email=${encodeURIComponent(userData.email)}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        isLoading: loading, // isLoading map kar diya loading se
        isAuthenticated: !!user, // !!user ka matlab agar user hai toh true, warna false
        login, 
        register, 
        logout, 
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};