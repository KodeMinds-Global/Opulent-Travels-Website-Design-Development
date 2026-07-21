import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useAdminPackage, useUpdatePackage } from '../../hooks/useAdminPackages';
import { SriLankaPackageForm, type SriLankaPackageFormData } from '../../components/SriLankaPackageForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminTheme } from '../../components/AdminLayout';

export function AdminSriLankaPackageEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDark } = useAdminTheme();
  const { data: pkg, isLoading } = useAdminPackage(id ?? '');
  const updateMutation = useUpdatePackage();

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';

  const handleSubmit = async (data: SriLankaPackageFormData & { hotelList?: Record<string, unknown>; seasonalSupplements?: Record<string, unknown> }) => {
    if (!id) return;
    try {
      await updateMutation.mutateAsync({
        id,
        data: {
          destination: 'sriLanka',
          title: data.title,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          imageUrl: data.imageUrl,
          price: data.price,
          duration: data.duration,
          featured: data.featured,
          highlights: data.highlights,
          inclusions: data.inclusions,
          exclusions: data.exclusions,
          supplements: data.supplements,
          locations: data.locations,
          culturalExperiences: data.culturalExperiences,
          detailedItinerary: data.detailedItinerary,
          pricingTable: data.pricingTable as any,
          hotelList: data.hotelList as any,
          seasonalSupplements: data.seasonalSupplements as any,
        },
      });
      toast.success('Package updated successfully!');
      navigate('/admin/packages/sri-lanka');
    } catch {
      toast.error('Failed to update package');
    }
  };

  if (isLoading) return <Skeleton className="h-96 w-full rounded-xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/packages/sri-lanka')} className="gap-2">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold" style={{ color: headingColor }}>Edit Sri Lanka Package</h2>
      </div>
      {pkg && (
        <SriLankaPackageForm
          initialData={{
            title: pkg.title,
            shortDescription: pkg.shortDescription,
            longDescription: pkg.longDescription,
            imageUrl: pkg.imageUrl,
            price: pkg.price,
            duration: pkg.duration,
            featured: pkg.featured,
            highlights: pkg.highlights ?? [],
            inclusions: pkg.inclusions ?? [],
            exclusions: pkg.exclusions ?? [],
            supplements: pkg.supplements ?? [],
            locations: pkg.locations ?? [],
            culturalExperiences: pkg.culturalExperiences ?? [],
            detailedItinerary: (pkg.detailedItinerary ?? []) as any,
            pricingTable: pkg.pricingTable as any,
            hotelList: pkg.hotelList as any,
            seasonalSupplements: pkg.seasonalSupplements as any,
          }}
          initialImageUrl={pkg.imageUrl}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
        />
      )}
    </div>
  );
}