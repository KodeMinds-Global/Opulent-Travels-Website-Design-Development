import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useAdminCar, useUpdateCar } from '../../hooks/useAdminCars';
import { CarForm, type CarFormData } from '../../components/CarForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getImageUrl } from '../../api/axios';

export function AdminCarEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: car, isLoading } = useAdminCar(id ?? '');
  const updateMutation = useUpdateCar();

  const handleSubmit = async (data: CarFormData) => {
    if (!id) return;
    try {
      await updateMutation.mutateAsync({ id, data });
      toast.success('Car updated successfully!');
      navigate('/admin/cars');
    } catch {
      toast.error('Failed to update car');
    }
  };

  if (isLoading) return <Skeleton className="h-96 w-full rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/cars')} className="gap-2 hover:bg-gray-200 dark:hover:bg-gray-700">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Edit Car</h2>
      </div>
      {car && (
        <CarForm
          key={car._id}
          initialData={{
            name: car.name,
            category: car.category,
            imageUrl: car.imageUrl,
            available: car.available,
            passengers: car.passengers,
            luggage: car.luggage,
            transmission: car.transmission,
            highlight: car.highlight,
          }}
          initialPreviewUrl={getImageUrl(car.imageUrl)}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
        />
      )}
    </div>
  );
}
