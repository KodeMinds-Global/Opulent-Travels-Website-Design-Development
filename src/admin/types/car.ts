export interface AdminCar {
  _id: string;
  name: string;
  category: string;
  imageUrl: string;
  transmission?: string;
  fuelType?: string;
  features?: string[];
  passengers?: string;
  luggage?: string;
  highlight?: string;
  createdAt: string;
  updatedAt: string;
}
