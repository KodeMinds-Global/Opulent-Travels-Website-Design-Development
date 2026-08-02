import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enquiriesService } from '../services/enquiries.service';

export function useAdminEnquiries() {
  return useQuery({
    queryKey: ['admin-enquiries'],
    queryFn: () => enquiriesService.getAll(),
    staleTime: 30000,
  });
}

export function useMarkEnquiryRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => enquiriesService.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] }),
  });
}

export function useMarkEnquiryUnread() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => enquiriesService.markUnread(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] }),
  });
}

export function useDeleteEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => enquiriesService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] }),
  });
}
