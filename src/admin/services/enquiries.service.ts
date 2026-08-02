import { adminAxios } from '../api/axios';
import type { AdminEnquiry } from '../types/enquiry';

export const enquiriesService = {
  async getAll(): Promise<AdminEnquiry[]> {
    const res = await adminAxios.get<AdminEnquiry[]>('/enquiries');
    return res.data;
  },

  async markRead(id: string): Promise<AdminEnquiry> {
    const res = await adminAxios.patch<AdminEnquiry>(`/enquiries/${id}/read`);
    return res.data;
  },

  async markUnread(id: string): Promise<AdminEnquiry> {
    const res = await adminAxios.patch<AdminEnquiry>(`/enquiries/${id}/unread`);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await adminAxios.delete(`/enquiries/${id}`);
  },
};
