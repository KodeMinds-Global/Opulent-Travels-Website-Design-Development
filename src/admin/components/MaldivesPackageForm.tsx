import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Plus, Trash2, Loader2, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { adminAxios, getImageUrl } from '../api/axios';

const schema = z.object({
  resortName: z.string().min(1, 'Resort name is required'),
  resortRating: z.number().min(1).max(5),
  featured: z.boolean().optional(),
  imageUrl: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  descriptionPoints: z.array(z.string()).max(4, 'Maximum 4 description points').optional(),
});

export type MaldivesPackageFormData = z.infer<typeof schema>;

interface MaldivesPackageFormProps {
  initialData?: Partial<MaldivesPackageFormData>;
  initialImageUrl?: string;
  initialGalleryUrls?: string[];
  onSubmit: (data: MaldivesPackageFormData) => void;
  isSubmitting: boolean;
}

function resolveUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('blob:') || url.startsWith('http')) return url;
  if (url.startsWith('/uploads/')) return getImageUrl(url);
  const base = (import.meta as any).env?.BASE_URL?.replace(/\/$/, '') ?? '';
  return `${base}${url.startsWith('/') ? url : '/' + url}`;
}

interface GalleryFileEntry {
  id: string;
  file?: File;        // pending upload
  previewUrl: string; // blob: or resolved server URL
  serverUrl?: string; // set after upload or from initial data
}

function StarRatingPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            size={28}
            className={`transition-colors ${
              star <= (hovered || value)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-transparent text-gray-300'
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm font-montserrat text-gray-600 dark:text-gray-400 self-center">
        {value > 0 ? `${value} / 5` : 'Select rating'}
      </span>
    </div>
  );
}

export function MaldivesPackageForm({ initialData, initialImageUrl, initialGalleryUrls, onSubmit, isSubmitting }: MaldivesPackageFormProps) {
  const form = useForm<MaldivesPackageFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      resortName: '',
      resortRating: 0,
      featured: false,
      descriptionPoints: [],
      galleryImages: [],
      ...initialData,
    },
  });

  // Hero image state
  const [uploadingHero, setUploadingHero] = useState(false);
  const [heroPreview, setHeroPreview] = useState<string | undefined>(resolveUrl(initialImageUrl ?? initialData?.imageUrl));
  const [heroPendingFile, setHeroPendingFile] = useState<File | null>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  // Gallery images state
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [galleryEntries, setGalleryEntries] = useState<GalleryFileEntry[]>(() =>
    (initialGalleryUrls ?? initialData?.galleryImages ?? []).map(url => ({
      id: crypto.randomUUID(),
      previewUrl: resolveUrl(url) ?? url,
      serverUrl: url,
    }))
  );
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroPendingFile(file);
    setHeroPreview(URL.createObjectURL(file));
    form.setValue('imageUrl', '');
  };

  const removeHeroImage = () => {
    setHeroPreview(undefined);
    setHeroPendingFile(null);
    form.setValue('imageUrl', '');
    if (heroInputRef.current) heroInputRef.current.value = '';
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newEntries: GalleryFileEntry[] = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setGalleryEntries(prev => [...prev, ...newEntries]);
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const removeGalleryEntry = (id: string) => {
    setGalleryEntries(prev => prev.filter(e => e.id !== id));
  };

  const handleSubmit = async (data: MaldivesPackageFormData) => {
    // Upload hero image if pending
    if (heroPendingFile) {
      setUploadingHero(true);
      try {
        const fd = new FormData();
        fd.append('file', heroPendingFile);
        const res = await adminAxios.post<{ url: string }>('/upload/image', fd);
        data.imageUrl = res.data.url;
        form.setValue('imageUrl', res.data.url);
        setHeroPendingFile(null);
      } catch {
        form.setError('imageUrl', { message: 'Hero image upload failed.' });
        setUploadingHero(false);
        return;
      } finally {
        setUploadingHero(false);
      }
    }

    // Upload any pending gallery images
    const finalGalleryUrls: string[] = [];
    const hasPending = galleryEntries.some(e => !!e.file);
    if (hasPending) {
      setUploadingGallery(true);
      try {
        for (const entry of galleryEntries) {
          if (entry.file) {
            const fd = new FormData();
            fd.append('file', entry.file);
            const res = await adminAxios.post<{ url: string }>('/upload/image', fd);
            finalGalleryUrls.push(res.data.url);
          } else if (entry.serverUrl) {
            finalGalleryUrls.push(entry.serverUrl);
          }
        }
      } catch {
        setUploadingGallery(false);
        return;
      } finally {
        setUploadingGallery(false);
      }
    } else {
      galleryEntries.forEach(e => { if (e.serverUrl) finalGalleryUrls.push(e.serverUrl); });
    }

    data.galleryImages = finalGalleryUrls;
    form.setValue('galleryImages', finalGalleryUrls);
    onSubmit(data);
  };

  const isBusy = uploadingHero || uploadingGallery || isSubmitting;
  const descPoints = form.watch('descriptionPoints') ?? [];

  const addDescPoint = () => {
    if (descPoints.length >= 4) return;
    form.setValue('descriptionPoints', [...descPoints, '']);
  };
  const removeDescPoint = (i: number) => {
    form.setValue('descriptionPoints', descPoints.filter((_, idx) => idx !== i));
  };
  const updateDescPoint = (i: number, v: string) => {
    const n = [...descPoints];
    n[i] = v;
    form.setValue('descriptionPoints', n);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Resort Info */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Resort Information</CardTitle><Separator /></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Resort Name *</Label>
            <Input {...form.register('resortName')} placeholder="e.g. Sun Siyam Iru Fushi" />
            {form.formState.errors.resortName && <p className="text-xs text-red-500">{form.formState.errors.resortName.message}</p>}
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label className="font-montserrat text-sm">Star Rating</Label>
            <Controller
              control={form.control}
              name="resortRating"
              render={({ field }) => <StarRatingPicker value={field.value} onChange={field.onChange} />}
            />
            {form.formState.errors.resortRating && <p className="text-xs text-red-500">{form.formState.errors.resortRating.message}</p>}
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" id="featured" {...form.register('featured')} className="w-4 h-4" />
            <Label htmlFor="featured" className="font-montserrat text-sm cursor-pointer">Featured package</Label>
          </div>
        </CardContent>
      </Card>

      {/* Description Points */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Description Points <span className="text-sm font-normal text-gray-500">(max 4)</span></CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-3">
          {descPoints.map((point, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex items-center justify-center w-6 h-9 text-gray-400 font-bold text-sm">{i + 1}.</div>
              <Input value={point} onChange={e => updateDescPoint(i, e.target.value)} placeholder={`Point ${i + 1}`} className="flex-1" />
              <Button type="button" variant="outline" size="icon" onClick={() => removeDescPoint(i)}><Trash2 size={14} /></Button>
            </div>
          ))}
          {descPoints.length === 0 && <p className="text-sm text-gray-400 font-lora">No description points added yet.</p>}
          {descPoints.length < 4 && (
            <Button type="button" variant="outline" size="sm" onClick={addDescPoint} className="gap-1">
              <Plus size={12} /> Add Point {descPoints.length < 4 ? `(${4 - descPoints.length} remaining)` : ''}
            </Button>
          )}
          {form.formState.errors.descriptionPoints && <p className="text-xs text-red-500">{form.formState.errors.descriptionPoints.message}</p>}
        </CardContent>
      </Card>

      {/* Background / Hero Image */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Background Image</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-3">
          <input ref={heroInputRef} type="file" accept="image/*" className="hidden" onChange={handleHeroFileChange} />
          {heroPreview ? (
            <div className="relative w-full bg-gray-50 dark:bg-gray-800 rounded-lg border flex items-center justify-center overflow-hidden" style={{ maxHeight: '280px' }}>
              <img src={heroPreview} alt="Background preview" className="max-h-64 w-full object-contain rounded-lg" />
              {uploadingHero && <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>}
              {!isBusy && <button type="button" onClick={removeHeroImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"><X size={14} /></button>}
            </div>
          ) : (
            <button type="button" onClick={() => heroInputRef.current?.click()} disabled={isBusy}
              className="w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <UploadCloud className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-montserrat text-gray-500">Click to upload background image</span>
              <span className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</span>
            </button>
          )}
          {!heroPreview && <Button type="button" variant="outline" size="sm" onClick={() => heroInputRef.current?.click()} disabled={isBusy} className="gap-2"><UploadCloud size={14} /> Choose Image</Button>}
          {heroPendingFile && <p className="text-xs text-blue-500 font-montserrat">Image will be uploaded when you save.</p>}
          {form.formState.errors.imageUrl && <p className="text-xs text-red-500">{form.formState.errors.imageUrl.message}</p>}
        </CardContent>
      </Card>

      {/* Gallery Images */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Gallery Images</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-4">
          <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryFileChange} />
          {galleryEntries.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {galleryEntries.map(entry => (
                <div key={entry.id} className="relative group rounded-lg overflow-hidden border bg-gray-50 dark:bg-gray-800" style={{ aspectRatio: '4/3' }}>
                  <img src={entry.previewUrl} alt="Gallery" className="w-full h-full object-cover" />
                  {entry.file && (
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-500/80 text-white text-[10px] text-center py-0.5 font-montserrat">Pending</div>
                  )}
                  {!isBusy && (
                    <button
                      type="button"
                      onClick={() => removeGalleryEntry(entry.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  )}
                  {uploadingGallery && entry.file && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <Button type="button" variant="outline" size="sm" onClick={() => galleryInputRef.current?.click()} disabled={isBusy} className="gap-2">
            <UploadCloud size={14} /> Add Gallery Images
          </Button>
          {galleryEntries.some(e => !!e.file) && (
            <p className="text-xs text-blue-500 font-montserrat">{galleryEntries.filter(e => !!e.file).length} image(s) will be uploaded when you save.</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isBusy} className="gap-2 font-montserrat px-8">
          {(uploadingHero || uploadingGallery) ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Package'}
        </Button>
      </div>
    </form>
  );
}