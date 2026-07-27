export interface AdminCar {
  _id: string;
  destination: 'sriLanka' | 'maldives';
  name: string;
  category: string;
  imageUrl: string;
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
