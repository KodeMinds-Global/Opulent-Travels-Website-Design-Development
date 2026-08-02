import { useQuery } from '@tanstack/react-query';
import { carsPublicService } from '@/services/cars.service';

export function useCars() {
  return useQuery({
    queryKey: ['cars'],
    queryFn: () => carsPublicService.getAll(),
    staleTime: 60000,
  });
}
