export interface AdminCar {
  _id: string;
  destination: 'sriLanka' | 'maldives';
  name: string;
  category: string;
  imageUrl: string;
  pricePerDay: number;
  currency: string;
  seats: number;
  transmission?: string;
  fuelType?: string;
  features?: string[];
  passengers?: string;
  luggage?: string;
  highlight?: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}