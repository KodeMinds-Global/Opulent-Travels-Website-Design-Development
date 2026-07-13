import { useState, useCallback } from 'react';
import { authService, type AdminUser } from '../services/auth.service';

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(() => authService.getUser());

  const login = useCallback(async (email: string, password: string) => {
    await authService.login(email, password);
    setUser(authService.getUser());
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return {
    user,
    login,
    logout,
    isAuthenticated: authService.isAuthenticated,
  };
}