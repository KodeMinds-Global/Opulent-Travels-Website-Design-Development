import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { maldivesGalleryService } from '../services/maldives-gallery.service';
import type { MaldivesGalleryItem } from '../types/maldives-gallery';

export function useAdminMaldivesGallery() {
  return useQuery({
    queryKey: ['admin-maldives-gallery'],
    queryFn: () => maldivesGalleryService.getAll(),
  });
}

export function useAdminMaldivesGalleryItem(id: string) {
  return useQuery({
    queryKey: ['admin-maldives-gallery-item', id],
    queryFn: () => maldivesGalleryService.getById(id),
    enabled: !!id,
  });
}

export function useCreateMaldivesGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<MaldivesGalleryItem, 'id' | 'createdAt' | 'updatedAt'>) =>
      maldivesGalleryService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-maldives-gallery'] }),
  });
}

export function useUpdateMaldivesGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<MaldivesGalleryItem, 'id' | 'createdAt'>> }) =>
      maldivesGalleryService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-maldives-gallery'] });
      queryClient.invalidateQueries({ queryKey: ['admin-maldives-gallery-item', id] });
    },
  });
}

export function useDeleteMaldivesGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => maldivesGalleryService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-maldives-gallery'] }),
  });
}

export function useReorderMaldivesGallery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderedIds: string[]) => maldivesGalleryService.reorder(orderedIds),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-maldives-gallery'] }),
  });
}
