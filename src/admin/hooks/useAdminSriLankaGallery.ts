import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sriLankaGalleryService } from '../services/sri-lanka-gallery.service';
import type { SriLankaGalleryItem } from '../types/sri-lanka-gallery';

// Hook to fetch all Sri Lanka gallery items
export function useAdminSriLankaGallery() {
  return useQuery({
    queryKey: ['admin-sri-lanka-gallery'],
    queryFn: () => sriLankaGalleryService.getAll(),
  });
}

// Hook to fetch a single Sri Lanka gallery item by ID
export function useAdminSriLankaGalleryItem(id: string) {
  return useQuery({
    queryKey: ['admin-sri-lanka-gallery-item', id],
    queryFn: () => sriLankaGalleryService.getById(id),
    enabled: !!id,
  });
}

// Hook to create a new Sri Lanka gallery item
export function useCreateSriLankaGalleryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<SriLankaGalleryItem, 'id' | 'createdAt' | 'updatedAt'>) => 
      sriLankaGalleryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-sri-lanka-gallery'],
      });
    },
  });
}

// Hook to update a Sri Lanka gallery item
export function useUpdateSriLankaGalleryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<SriLankaGalleryItem, 'id' | 'createdAt'>> }) =>
      sriLankaGalleryService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ['admin-sri-lanka-gallery'],
      });
      queryClient.invalidateQueries({
        queryKey: ['admin-sri-lanka-gallery-item', id],
      });
    },
  });
}

// Hook to delete a Sri Lanka gallery item
export function useDeleteSriLankaGalleryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sriLankaGalleryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-sri-lanka-gallery'],
      });
    },
  });
}

// Hook to reorder Sri Lanka gallery items
export function useReorderSriLankaGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderedIds: string[]) => sriLankaGalleryService.reorder(orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-sri-lanka-gallery'],
      });
    },
  });
}