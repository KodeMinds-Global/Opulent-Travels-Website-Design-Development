import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useAdminPackage, useUpdatePackage } from '../../hooks/useAdminPackages';
import { PackageForm, type PackageFormData } from '../../components/PackageForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminPackageEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: pkg, isLoading } = useAdminPackage(id ?? '');
  const updateMutation = useUpdatePackage();

  const handleSubmit = async (data: PackageFormData) => {
    if (!id) return;
    try {
      await updateMutation.mutateAsync({ id, data });
      toast.success('Package updated successfully!');
      navigate('/admin/packages');
    } catch {
      toast.error('Failed to update package');
    }
  };

  if (isLoading) return <Skeleton className="h-96 w-full rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/packages')} className="gap-2">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Edit Package</h2>
      </div>
      {pkg && (
        <PackageForm
          initialData={pkg as unknown as PackageFormData}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
        />
      )}
    </div>
  );
}