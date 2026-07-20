import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useCreateCar } from '../../hooks/useAdminCars';
import { CarForm, type CarFormData } from '../../components/CarForm';
import { Button } from '@/components/ui/button';

export function AdminCarCreatePage() {
  const navigate = useNavigate();
  const createMutation = useCreateCar();

  const handleSubmit = async (data: CarFormData) => {
    try {
      await createMutation.mutateAsync({ ...data, destination: 'sriLanka' });
      toast.success('Car added successfully!');
      navigate('/admin/cars');
    } catch {
      toast.error('Failed to add car');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/cars')} className="gap-2 hover:bg-gray-200 dark:hover:bg-gray-700">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Add Car</h2>
      </div>
      <CarForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
    </div>
  );
}