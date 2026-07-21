import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useCreatePackage } from '../../hooks/useAdminPackages';
import { MaldivesPackageForm, type MaldivesPackageFormData } from '../../components/MaldivesPackageForm';
import { Button } from '@/components/ui/button';
import { useAdminTheme } from '../../components/AdminLayout';

export function AdminMaldivesPackageCreatePage() {
  const navigate = useNavigate();
  const { isDark } = useAdminTheme();
  const createMutation = useCreatePackage();

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';

  const handleSubmit = async (data: MaldivesPackageFormData) => {
    try {
      await createMutation.mutateAsync({
        destination: 'maldives',
        resortName: data.resortName,
        resortRating: data.resortRating,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        imageUrl: data.imageUrl,
        price: data.price,
        duration: data.duration,
        featured: data.featured,
        descriptionPoints: data.descriptionPoints,
        galleryImages: data.galleryImages,
        title: data.resortName, // use resortName as title for Maldives
      });
      toast.success('Package created successfully!');
      navigate('/admin/packages/maldives');
    } catch {
      toast.error('Failed to create package');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/packages/maldives')} className="gap-2">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold" style={{ color: headingColor }}>Add Maldives Package</h2>
      </div>
      <MaldivesPackageForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
    </div>
  );
}