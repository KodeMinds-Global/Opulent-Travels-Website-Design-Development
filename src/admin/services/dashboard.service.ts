import { adminAxios } from '../api/axios';

export interface DashboardStats {
  packages: { sriLanka: number; maldives: number; total: number };
  cars: { sriLanka: number; maldives: number; total: number };
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const res = await adminAxios.get<DashboardStats>('/dashboard/stats');
    return res.data;
  },
};