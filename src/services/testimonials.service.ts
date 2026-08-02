import axios from 'axios';

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:3000';

const publicAxios = axios.create({ baseURL });

export interface Testimonial {
  _id: string;
  name: string;
  location: string;
  date: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export const testimonialsPublicService = {
  async getAll(): Promise<Testimonial[]> {
    const res = await publicAxios.get<Testimonial[]>('/testimonials');
    return res.data;
  },
};
