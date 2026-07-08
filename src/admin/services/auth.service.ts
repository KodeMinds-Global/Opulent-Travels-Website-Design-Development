import { adminAxios } from '../api/axios';

export interface AdminUser {
  email: string;
  name: string;
}

export const authService = {
  async login(email: string, password: string): Promise<string> {
    const res = await adminAxios.post<{ access_token: string }>('/auth/login', { email, password });
    const token = res.data.access_token;
    localStorage.setItem('admin_token', token);
    // Decode JWT payload to get user info
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem('admin_user', JSON.stringify({ email: payload.email, name: payload.name }));
    } catch {
      localStorage.setItem('admin_user', JSON.stringify({ email, name: 'Admin' }));
    }
    return token;
  },

  logout(): void {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  getToken(): string | null {
    return localStorage.getItem('admin_token');
  },

  getUser(): AdminUser | null {
    const raw = localStorage.getItem('admin_user');
    if (!raw) return null;
    try { return JSON.parse(raw) as AdminUser; } catch { return null; }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin_token');
  },
};