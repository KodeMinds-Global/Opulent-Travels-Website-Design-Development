import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { useAdminSriLankaGalleryItem, useUpdateSriLankaGalleryItem } from '../../hooks/useAdminSriLankaGallery';
import { SriLankaGalleryItemForm, type SriLankaGalleryItemFormData } from '../../components/SriLankaGalleryItemForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminSriLankaGalleryEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item, isLoading } = useAdminSriLankaGalleryItem(id ?? '');
  const updateMutation = useUpdateSriLankaGalleryItem();

  const handleSubmit = async (data: SriLankaGalleryItemFormData) => {
    if (!id) return;
    try {
      await updateMutation.mutateAsync({
        id,
        data: {
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          order: data.order,
        },
      });
      toast.success('Gallery item updated successfully!');
      navigate('/admin/sri-lanka-gallery');
    } catch {
      toast.error('Failed to update gallery item');
    }
  };

  if (isLoading) return <Skeleton className="h-96 w-full rounded-xl" />;

  const getInitialPreviewUrl = (imageUrl?: string) => {
    if (!imageUrl) return undefined;
    if (imageUrl.startsWith('http')) return imageUrl;
    return imageUrl; // relative path like /assets/images/...
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/sri-lanka-gallery')} className="gap-2 hover:bg-gray-200 dark:hover:bg-gray-700">
          <ArrowLeft size={14} /> Back
        </Button>
        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Edit Gallery Item</h2>
      </div>
      {item && (
        <SriLankaGalleryItemForm
          initialData={{
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            order: item.order,
          }}
          initialPreviewUrl={getInitialPreviewUrl(item.imageUrl)}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
        />
      )}
    </div>
  );
}