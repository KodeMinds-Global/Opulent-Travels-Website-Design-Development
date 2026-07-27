import { adminAxios } from '../api/axios';
import type { AdminTestimonial } from '../types/testimonial';

export const testimonialsService = {
  async getAll(): Promise<AdminTestimonial[]> {
    const res = await adminAxios.get<AdminTestimonial[]>('/testimonials');
    return res.data;
  },

  async getOne(id: string): Promise<AdminTestimonial> {
    const res = await adminAxios.get<AdminTestimonial>(`/testimonials/${id}`);
    return res.data;
  },

  async create(data: Omit<AdminTestimonial, '_id' | 'createdAt' | 'updatedAt'>): Promise<AdminTestimonial> {
    const res = await adminAxios.post<AdminTestimonial>('/testimonials', data);
    return res.data;
  },

  async update(id: string, data: Partial<AdminTestimonial>): Promise<AdminTestimonial> {
    const res = await adminAxios.patch<AdminTestimonial>(`/testimonials/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await adminAxios.delete(`/testimonials/${id}`);
  },
};
