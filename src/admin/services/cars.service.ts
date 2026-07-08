import { adminAxios } from '../api/axios';
import type { AdminCar } from '../types/car';

export const carsService = {
  async getCars(destination?: string): Promise<AdminCar[]> {
    const params = destination ? { destination } : {};
    const res = await adminAxios.get<AdminCar[]>('/cars', { params });
    return res.data;
  },

  async getCar(id: string): Promise<AdminCar> {
    const res = await adminAxios.get<AdminCar>(`/cars/${id}`);
    return res.data;
  },

  async createCar(data: Partial<AdminCar>): Promise<AdminCar> {
    const res = await adminAxios.post<AdminCar>('/cars', data);
    return res.data;
  },

  async updateCar(id: string, data: Partial<AdminCar>): Promise<AdminCar> {
    const res = await adminAxios.patch<AdminCar>(`/cars/${id}`, data);
    return res.data;
  },

  async deleteCar(id: string): Promise<void> {
    await adminAxios.delete(`/cars/${id}`);
  },
};