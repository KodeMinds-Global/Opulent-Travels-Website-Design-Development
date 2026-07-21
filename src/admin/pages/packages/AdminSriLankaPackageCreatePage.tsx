import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useCreatePackage } from '../../hooks/useAdminPackages';
import { SriLankaPackageForm, type SriLankaPackageFormData } from '../../components/SriLankaPackageForm';
import { Button } from '@/components/ui/button';
import { useAdminTheme } from '../../components/AdminLayout';

export function AdminSriLankaPackageCreatePage() {
  const navigate = useNavigate();
  const { isDark } = useAdminTheme();
  const createMutation = useCreatePackage();

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';

  const handleSubmit = async (data: SriLankaPackageFormData & { hotelList?: Record<string, unknown>; seasonalSupplements?: Record<string, unknown> }) => {
    try {
      await createMutation.mutateAsync({
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
        pricingTable: data.pricingTable,
        hotelList: data.hotelList,
        seasonalSupplements: data.seasonalSupplements,
      });
      toast.success('Package created successfully!');
      navigate('/admin/packages/sri-lanka');
    } catch {
      toast.error('Failed to create package');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/packages/sri-lanka')} className="gap-2">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold" style={{ color: headingColor }}>Add Sri Lanka Package</h2>
      </div>
      <SriLankaPackageForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
    </div>
  );
}