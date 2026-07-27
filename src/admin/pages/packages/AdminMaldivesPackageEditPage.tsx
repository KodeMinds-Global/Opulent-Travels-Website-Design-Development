import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useAdminPackage, useUpdatePackage } from '../../hooks/useAdminPackages';
import { MaldivesPackageForm, type MaldivesPackageFormData } from '../../components/MaldivesPackageForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminTheme } from '../../components/AdminLayout';

export function AdminMaldivesPackageEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDark } = useAdminTheme();
  const { data: pkg, isLoading } = useAdminPackage(id ?? '');
  const updateMutation = useUpdatePackage();

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';

  const handleSubmit = async (data: MaldivesPackageFormData) => {
    if (!id) return;
    try {
      await updateMutation.mutateAsync({
        id,
        data: {
          destination: 'maldives',
          resortName: data.resortName,
          resortRating: data.resortRating,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          imageUrl: data.imageUrl,
          price: data.price,
          duration: data.duration,
          descriptionPoints: data.descriptionPoints,
          galleryImages: data.galleryImages,
          title: data.resortName,
        },
      });
      toast.success('Package updated successfully!');
      navigate('/admin/packages/maldives');
    } catch {
      toast.error('Failed to update package');
    }
  };

  if (isLoading) return <Skeleton className="h-96 w-full rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/packages/maldives')} className="gap-2">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold" style={{ color: headingColor }}>Edit Maldives Package</h2>
      </div>
      {pkg && (
        <MaldivesPackageForm
          initialData={{
            resortName: pkg.resortName ?? '',
            resortRating: pkg.resortRating ?? 0,
            shortDescription: pkg.shortDescription,
            longDescription: pkg.longDescription,
            imageUrl: pkg.imageUrl,
            price: pkg.price,
            duration: pkg.duration,
            descriptionPoints: pkg.descriptionPoints ?? [],
            galleryImages: pkg.galleryImages ?? [],
          }}
          initialImageUrl={pkg.imageUrl}
          initialGalleryUrls={pkg.galleryImages ?? []}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
        />
      )}
    </div>
  );
}