import { useQuery } from '@tanstack/react-query';
import { packagesPublicService, type FeaturedMaldivesPackage } from '@/services/packages.service';

export function useFeaturedMaldivesPackages() {
  return useQuery<FeaturedMaldivesPackage[]>({
    queryKey: ['featured-maldives-packages'],
    queryFn: () => packagesPublicService.getFeaturedMaldives(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}