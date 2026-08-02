import { useQuery } from '@tanstack/react-query';
import { testimonialsPublicService } from '@/services/testimonials.service';

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => testimonialsPublicService.getAll(),
    staleTime: 60000,
  });
}
