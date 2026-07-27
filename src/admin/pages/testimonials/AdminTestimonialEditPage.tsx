import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useAdminTestimonial, useUpdateTestimonial } from '../../hooks/useAdminTestimonials';
import { TestimonialForm, type TestimonialFormData } from '../../components/TestimonialForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminTestimonialEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: testimonial, isLoading } = useAdminTestimonial(id ?? '');
  const updateMutation = useUpdateTestimonial();

  const handleSubmit = async (data: TestimonialFormData) => {
    if (!id) return;
    try {
      await updateMutation.mutateAsync({ id, data });
      toast.success('Testimonial updated successfully!');
      navigate('/admin/testimonials');
    } catch {
      toast.error('Failed to update testimonial');
    }
  };

  if (isLoading) return <Skeleton className="h-96 w-full rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/testimonials')} className="gap-2 hover:bg-gray-200 dark:hover:bg-gray-700">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Edit Testimonial</h2>
      </div>
      {testimonial && (
        <TestimonialForm
          key={testimonial._id}
          initialData={{
            name: testimonial.name,
            location: testimonial.location,
            date: testimonial.date,
            text: testimonial.text,
          }}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
        />
      )}
    </div>
  );
}
