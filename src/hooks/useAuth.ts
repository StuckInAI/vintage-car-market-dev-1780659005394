import { useState, useEffect } from 'react';
import { User } from '@/types';
import { getSession, login as authLogin, logout as authLogout, register as authRegister } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(getSession());

  useEffect(() => {
    setUser(getSession());
  }, []);

  function login(email: string, password: string): { success: boolean; error?: string } {
    const result = authLogin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }

  function register(email: string, password: string, name: string, role: 'buyer' | 'seller' | 'both'): { success: boolean; error?: string } {
    const result = authRegister(email, password, name, role);
    if (result.success && result.user) {
      authLogin(email, password);
      setUser(result.user);
    }
    return result;
  }

  function logout(): void {
    authLogout();
    setUser(null);
  }

  return { user, login, register, logout, isAuthenticated: !!user };
}
