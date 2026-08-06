import { useQuery } from '@tanstack/react-query';
import { packagesPublicService, type AllMaldivesPackage } from '@/services/packages.service';

export function useAllMaldivesPackages() {
  return useQuery<AllMaldivesPackage[]>({
    queryKey: ['all-maldives-packages'],
    queryFn: () => packagesPublicService.getAllMaldives(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}