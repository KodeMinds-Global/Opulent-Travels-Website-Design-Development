import axios from 'axios';

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:3000';

const publicAxios = axios.create({ baseURL });

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const enquiriesPublicService = {
  async submit(data: EnquiryPayload): Promise<void> {
    await publicAxios.post('/enquiries', data);
  },
};
