import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carsService } from '../services/cars.service';
import type { AdminCar } from '../types/car';

export function useAdminCars(destination?: string) {
  return useQuery({
    queryKey: ['admin-cars', destination],
    queryFn: () => carsService.getCars(destination),
  });
}

export function useAdminCar(id: string) {
  return useQuery({
    queryKey: ['admin-car', id],
    queryFn: () => carsService.getCar(id),
    enabled: !!id,
  });
}

export function useCreateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminCar>) => carsService.createCar(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-cars'] }),
  });
}

export function useUpdateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AdminCar> }) =>
      carsService.updateCar(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-cars'] }),
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => carsService.deleteCar(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-cars'] }),
  });
}