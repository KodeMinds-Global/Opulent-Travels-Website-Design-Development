import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useCreateTestimonial } from '../../hooks/useAdminTestimonials';
import { TestimonialForm, type TestimonialFormData } from '../../components/TestimonialForm';
import { Button } from '@/components/ui/button';

export function AdminTestimonialCreatePage() {
  const navigate = useNavigate();
  const createMutation = useCreateTestimonial();

  const handleSubmit = async (data: TestimonialFormData) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success('Testimonial added successfully!');
      navigate('/admin/testimonials');
    } catch {
      toast.error('Failed to add testimonial');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/testimonials')} className="gap-2 hover:bg-gray-200 dark:hover:bg-gray-700">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Add Testimonial</h2>
      </div>
      <TestimonialForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
    </div>
  );
}
