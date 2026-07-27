import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testimonialsService } from '../services/testimonials.service';
import type { AdminTestimonial } from '../types/testimonial';

export function useAdminTestimonials() {
  return useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: () => testimonialsService.getAll(),
    staleTime: 30000,
  });
}

export function useAdminTestimonial(id: string) {
  return useQuery({
    queryKey: ['admin-testimonial', id],
    queryFn: () => testimonialsService.getOne(id),
    enabled: !!id,
    staleTime: 30000,
  });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<AdminTestimonial, '_id' | 'createdAt' | 'updatedAt'>) =>
      testimonialsService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] }),
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AdminTestimonial> }) =>
      testimonialsService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['admin-testimonial', id] });
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => testimonialsService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] }),
  });
}
