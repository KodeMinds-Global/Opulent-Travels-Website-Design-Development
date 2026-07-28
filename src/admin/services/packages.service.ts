import { adminAxios } from '../api/axios';
import type { AdminPackage } from '../types/admin-package';

// Upload a single image file, returns the server URL
async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await adminAxios.post<{ url: string }>('/upload/image', formData);
  return res.data.url;
}

// Upload multiple image files sequentially, returns array of server URLs
export async function uploadImages(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const url = await uploadImage(file);
    urls.push(url);
  }
  return urls;
}

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

  async getFeaturedMaldives(): Promise<AdminPackage[]> {
    const res = await adminAxios.get<AdminPackage[]>('/packages/featured/maldives');
    return res.data;
  },

  async setFeaturedMaldives(packageIds: string[]): Promise<{ updated: boolean }> {
    const res = await adminAxios.patch<{ updated: boolean }>('/packages/featured/maldives', { packageIds });
    return res.data;
  },

  async getFeaturedSriLanka(): Promise<AdminPackage[]> {
    const res = await adminAxios.get<AdminPackage[]>('/packages/featured/sri-lanka');
    return res.data;
  },

  async setFeaturedSriLanka(packageIds: string[]): Promise<{ updated: boolean }> {
    const res = await adminAxios.patch<{ updated: boolean }>('/packages/featured/sri-lanka', { packageIds });
    return res.data;
  },
};