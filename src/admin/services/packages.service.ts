import { adminAxios } from '../api/axios';
import type { AdminPackage } from '../types/admin-package';

export const packagesService = {
  async getPackages(destination?: string): Promise<AdminPackage[]> {
    const params = destination ? { destination } : {};
    const res = await adminAxios.get<AdminPackage[]>('/packages', { params });
    return res.data;
  },

  async getPackage(id: string): Promise<AdminPackage> {
    const res = await adminAxios.get<AdminPackage>(`/packages/${id}`);
    return res.data;
  },

  async createPackage(data: Partial<AdminPackage>): Promise<AdminPackage> {
    const res = await adminAxios.post<AdminPackage>('/packages', data);
    return res.data;
  },

  async updatePackage(id: string, data: Partial<AdminPackage>): Promise<AdminPackage> {
    const res = await adminAxios.patch<AdminPackage>(`/packages/${id}`, data);
    return res.data;
  },

  async deletePackage(id: string): Promise<void> {
    await adminAxios.delete(`/packages/${id}`);
  },
};