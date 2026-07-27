import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { adminAxios } from '../api/axios';

const schema = z.object({
  name: z.string().min(1, 'Car name is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().optional(),
  passengers: z.string().optional(),
  luggage: z.string().optional(),
  transmission: z.string().optional(),
  highlight: z.string().optional(),
});

export type CarFormData = z.infer<typeof schema>;

interface CarFormProps {
  initialData?: Partial<CarFormData>;
  initialPreviewUrl?: string;
  onSubmit: (data: CarFormData) => void;
  isSubmitting: boolean;
}

export function CarForm({ initialData, initialPreviewUrl, onSubmit, isSubmitting }: CarFormProps) {
  const form = useForm<CarFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      category: '',
      imageUrl: '',
      passengers: '',
      luggage: '',
      transmission: '',
      highlight: '',
      ...initialData,
    },
  });

  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialPreviewUrl ?? initialData?.imageUrl);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    form.setValue('imageUrl', '');
    form.clearErrors('imageUrl');
  };

  const removeImage = () => {
    setPreviewUrl(undefined);
    setPendingFile(null);
    form.setValue('imageUrl', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (data: CarFormData) => {
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
        return;
      } finally {
        setUploading(false);
      }
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Car Details */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Car Details</CardTitle><Separator /></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Car Name *</Label>
            <Input {...form.register('name')} placeholder="e.g. Toyota Allion / Sedan" />
            {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
          </div>
          {/* Category */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Category *</Label>
            <Controller control={form.control} name="category" render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {['Economy','Compact','Sedan','SUV','Luxury SUV','Premium Sedan','Van','Minibus','Bus','Other'].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </div>
        </CardContent>
      </Card>

      {/* Public Page Details */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Public Page Details</CardTitle>
          <p className="text-xs text-gray-500 font-lora mt-1">These details appear on the Rent Car page visible to website visitors</p>
          <Separator />
        </CardHeader>
        <CardContent className="grid md:grid-cols-1 gap-4">
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Passengers</Label>
            <Input {...form.register('passengers')} placeholder="e.g. 3 Passengers / 7 pax / 21 seater" />
            <p className="text-xs text-gray-400">How many passengers this vehicle carries</p>
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Luggage</Label>
            <Input {...form.register('luggage')} placeholder="e.g. Trunk Space - 3 luggage / Up-to 5 luggage / 400l Capacity" />
            <p className="text-xs text-gray-400">Luggage capacity description</p>
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Chauffeur / Guide Info</Label>
            <Input {...form.register('transmission')} placeholder="e.g. National Guide + Driver included / Chauffeur guide included" />
            <p className="text-xs text-gray-400">Driver or guide service included with this vehicle</p>
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Highlight</Label>
            <Input {...form.register('highlight')} placeholder="e.g. Vehicle & Passenger Insurance included" />
            <p className="text-xs text-gray-400">Key feature or selling point shown in the vehicle detail popup</p>
          </div>
        </CardContent>
      </Card>

      {/* Car Image Upload */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Car Image</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-3">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

          {previewUrl ? (
            <div className="relative w-full bg-gray-50 dark:bg-gray-800 rounded-lg border flex items-center justify-center">
              <img src={previewUrl} alt="Car preview" className="max-h-80 w-full object-contain rounded-lg" />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              {!uploading && (
                <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                  <X size={14} />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <UploadCloud className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-montserrat text-gray-500">Click to upload car image</span>
              <span className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</span>
            </button>
          )}

          {!previewUrl && (
            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="gap-2">
              {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : <><UploadCloud size={14} /> Choose Image</>}
            </Button>
          )}

          {pendingFile && <p className="text-xs text-blue-500 font-montserrat">Image will be uploaded when you save.</p>}
          {form.formState.errors.imageUrl && <p className="text-xs text-red-500">{form.formState.errors.imageUrl.message}</p>}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || uploading} className="gap-2 font-montserrat px-8">
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Car'}
        </Button>
      </div>
    </form>
  );
}
