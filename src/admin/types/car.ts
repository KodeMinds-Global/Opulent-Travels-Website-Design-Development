export interface AdminCar {
  _id: string;
  destination: 'sriLanka' | 'maldives';
  name: string;
  category: string;
  imageUrl: string;
  pricePerDay: number;
  currency: string;
  seats: number;
  transmission: 'Manual' | 'Automatic';
  fuelType: string;
  features: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
}