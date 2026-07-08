import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useCreatePackage } from '../../hooks/useAdminPackages';
import { PackageForm, type PackageFormData } from '../../components/PackageForm';
import { Button } from '@/components/ui/button';

export function AdminPackageCreatePage() {
  const navigate = useNavigate();
  const createMutation = useCreatePackage();

  const handleSubmit = async (data: PackageFormData) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success('Package created successfully!');
      navigate('/admin/packages');
    } catch {
      toast.error('Failed to create package');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/packages')} className="gap-2">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Add Package</h2>
      </div>
      <PackageForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
    </div>
  );
}