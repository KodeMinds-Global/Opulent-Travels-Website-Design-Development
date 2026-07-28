import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { packagesService } from '../services/packages.service';
import type { AdminPackage } from '../types/admin-package';

export function useAdminPackages(destination?: string) {
  return useQuery({
    queryKey: ['admin-packages', destination],
    queryFn: () => packagesService.getPackages(destination),
  });
}

export function useAdminPackage(id: string) {
  return useQuery({
    queryKey: ['admin-package', id],
    queryFn: () => packagesService.getPackage(id),
    enabled: !!id,
  });
}

export function useCreatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminPackage>) => packagesService.createPackage(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-packages'] }),
  });
}

export function useUpdatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AdminPackage> }) =>
      packagesService.updatePackage(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-packages'] }),
  });
}

export function useDeletePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => packagesService.deletePackage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-packages'] }),
  });
}

export function useFeaturedMaldivesPackages() {
  return useQuery({
    queryKey: ['admin-packages-featured-maldives'],
    queryFn: () => packagesService.getFeaturedMaldives(),
  });
}

export function useSetFeaturedMaldives() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (packageIds: string[]) => packagesService.setFeaturedMaldives(packageIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-packages-featured-maldives'] });
      queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
    },
  });
}

export function useFeaturedSriLankaPackages() {
  return useQuery({
    queryKey: ['admin-packages-featured-srilanka'],
    queryFn: () => packagesService.getFeaturedSriLanka(),
  });
}

export function useSetFeaturedSriLanka() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (packageIds: string[]) => packagesService.setFeaturedSriLanka(packageIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-packages-featured-srilanka'] });
      queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
    },
  });
}