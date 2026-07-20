import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { adminAxios, getImageUrl } from '../api/axios';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type SriLankaGalleryItemFormData = z.infer<typeof schema>;

interface SriLankaGalleryItemFormProps {
  initialData?: Partial<SriLankaGalleryItemFormData>;
  initialPreviewUrl?: string;
  onSubmit: (data: SriLankaGalleryItemFormData) => void;
  isSubmitting: boolean;
}

function resolvePreviewUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('blob:') || url.startsWith('http')) return url;
  if (url.startsWith('/uploads/')) return getImageUrl(url);
  // Public asset — prepend Vite base URL
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${base}${path}`;
}

export function SriLankaGalleryItemForm({ initialData, initialPreviewUrl, onSubmit, isSubmitting }: SriLankaGalleryItemFormProps) {
  const form = useForm<SriLankaGalleryItemFormData>({
    resolver: zodResolver(schema),
    defaultValues: { ...initialData },
  });

  const [uploading, setUploading] = useState(false);
  // Preview shown to user (blob URL for new picks, resolved URL for existing)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    resolvePreviewUrl(initialPreviewUrl ?? initialData?.imageUrl)
  );
  // Holds the actual File object waiting to be uploaded on submit
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // When user picks a file: show preview only, do NOT upload yet
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    // Clear any previous imageUrl so we know a new file is pending
    form.setValue('imageUrl', '');
    form.clearErrors('imageUrl');
  };

  const removeImage = () => {
    setPreviewUrl(undefined);
    setPendingFile(null);
    form.setValue('imageUrl', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // On submit: upload pending file first (if any), then call onSubmit
  const handleSubmit = async (data: SriLankaGalleryItemFormData) => {
    if (pendingFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', pendingFile);
        const res = await adminAxios.post<{ url: string }>('/upload/image', formData);
        data.imageUrl = res.data.url;
        form.setValue('imageUrl', res.data.url);
        setPendingFile(null);
      } catch {
        form.setError('imageUrl', { message: 'Image upload failed. Please try again.' });
        setUploading(false);
        return; // stop — don't save if upload failed
      } finally {
        setUploading(false);
      }
    }
    onSubmit(data);
  };

  const isBusy = uploading || isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Gallery Item Details */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Gallery Item Details</CardTitle><Separator /></CardHeader>
        <CardContent className="grid md:grid-cols-1 gap-4">
          {/* Title */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Title *</Label>
            <Input {...form.register('title')} placeholder="Gallery item title" />
            {form.formState.errors.title && <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>}
          </div>
          {/* Description */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Description</Label>
            <Textarea {...form.register('description')} rows={3} placeholder="Optional description of the gallery item" />
          </div>
        </CardContent>
      </Card>

      {/* Image Upload */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Image</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {previewUrl ? (
            <div className="relative w-full bg-gray-50 dark:bg-gray-800 rounded-lg border flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Gallery item preview"
                className="max-h-80 w-full object-contain rounded-lg"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              {!isBusy && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isBusy}
              className="w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <UploadCloud className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-montserrat text-gray-500">Click to upload gallery image</span>
              <span className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</span>
            </button>
          )}

          {!previewUrl && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isBusy}
              className="gap-2"
            >
              <UploadCloud size={14} /> Choose Image
            </Button>
          )}

          {pendingFile && (
            <p className="text-xs text-blue-500 font-montserrat">
              Image will be uploaded when you save.
            </p>
          )}

          {form.formState.errors.imageUrl && (
            <p className="text-xs text-red-500">{form.formState.errors.imageUrl.message}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isBusy}
          className="gap-2 font-montserrat px-8"
        >
          {uploading
            ? <><Loader2 size={16} className="animate-spin" /> Uploading...</>
            : isSubmitting
            ? <><Loader2 size={16} className="animate-spin" /> Saving...</>
            : 'Save Item'
          }
        </Button>
      </div>
    </form>
  );
}
