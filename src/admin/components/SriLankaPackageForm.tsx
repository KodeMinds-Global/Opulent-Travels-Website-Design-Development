import { useState, useRef } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Loader2, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { adminAxios, getImageUrl } from '../api/axios';

const pricingCategorySchema = z.object({
  name: z.string().min(1),
  prices: z.object({
    '2Pax': z.coerce.number().default(0),
    '4Pax': z.coerce.number().default(0),
    '6Pax': z.coerce.number().default(0),
    '8Pax': z.coerce.number().default(0),
    ExtraAdult: z.coerce.number().default(0),
    ChildWithBed: z.coerce.number().default(0),
    ChildWithoutBed: z.coerce.number().default(0),
  }),
});

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.coerce.number().min(0).optional(),
  duration: z.string().optional(),
  featured: z.boolean().optional(),
  highlights: z.array(z.string()).optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  supplements: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  culturalExperiences: z.array(z.string()).optional(),
  detailedItinerary: z.array(z.object({
    day: z.coerce.number(),
    title: z.string().min(1, 'Day title required'),
    description: z.string().optional(),
    activities: z.array(z.string()).optional(),
    meals: z.array(z.string()).optional(),
    accommodation: z.string().optional(),
  })).optional(),
  pricingTable: z.object({
    currency: z.string().default('USD'),
    validFrom: z.string().optional(),
    validTo: z.string().optional(),
    categories: z.array(pricingCategorySchema).optional(),
  }).optional(),
  hotelListRaw: z.string().optional(), // JSON string for hotelList
  seasonalSupplementsRaw: z.string().optional(), // JSON string
});

export type SriLankaPackageFormData = z.infer<typeof schema>;

interface SriLankaPackageFormProps {
  initialData?: Partial<SriLankaPackageFormData> & { hotelList?: Record<string, unknown>; seasonalSupplements?: Record<string, unknown> };
  initialImageUrl?: string;
  onSubmit: (data: SriLankaPackageFormData & { hotelList?: Record<string, unknown>; seasonalSupplements?: Record<string, unknown> }) => void;
  isSubmitting: boolean;
}

function StringListField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const add = () => onChange([...value, '']);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i: number, v: string) => { const n = [...value]; n[i] = v; onChange(n); };
  return (
    <div className="space-y-2">
      <Label className="font-montserrat text-sm">{label}</Label>
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input value={item} onChange={e => update(i, e.target.value)} placeholder={`${label} item`} />
          <Button type="button" variant="outline" size="icon" onClick={() => remove(i)}><Trash2 size={14} /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add} className="gap-1">
        <Plus size={12} /> Add {label}
      </Button>
    </div>
  );
}

function resolvePreviewUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('blob:') || url.startsWith('http')) return url;
  if (url.startsWith('/uploads/')) return getImageUrl(url);
  const base = (import.meta as any).env?.BASE_URL?.replace(/\/$/, '') ?? '';
  return `${base}${url.startsWith('/') ? url : '/' + url}`;
}

export function SriLankaPackageForm({ initialData, initialImageUrl, onSubmit, isSubmitting }: SriLankaPackageFormProps) {
  const form = useForm<SriLankaPackageFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      featured: false,
      highlights: [],
      inclusions: [],
      exclusions: [],
      supplements: [],
      locations: [],
      culturalExperiences: [],
      detailedItinerary: [],
      pricingTable: { currency: 'USD', validFrom: '', validTo: '', categories: [] },
      hotelListRaw: '',
      seasonalSupplementsRaw: '',
      ...initialData,
      hotelListRaw: initialData?.hotelList ? JSON.stringify(initialData.hotelList, null, 2) : '',
      seasonalSupplementsRaw: initialData?.seasonalSupplements ? JSON.stringify(initialData.seasonalSupplements, null, 2) : '',
    },
  });

  const { fields: itineraryFields, append: appendDay, remove: removeDay } = useFieldArray({ control: form.control, name: 'detailedItinerary' });
  const { fields: pricingFields, append: appendPricing, remove: removePricing } = useFieldArray({ control: form.control, name: 'pricingTable.categories' });

  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(resolvePreviewUrl(initialImageUrl ?? initialData?.imageUrl));
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    form.setValue('imageUrl', '');
  };

  const removeImage = () => {
    setPreviewUrl(undefined);
    setPendingFile(null);
    form.setValue('imageUrl', '');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (data: SriLankaPackageFormData) => {
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
    // Parse JSON fields
    let hotelList: Record<string, unknown> | undefined;
    let seasonalSupplements: Record<string, unknown> | undefined;
    try { hotelList = data.hotelListRaw ? JSON.parse(data.hotelListRaw) : undefined; } catch { hotelList = undefined; }
    try { seasonalSupplements = data.seasonalSupplementsRaw ? JSON.parse(data.seasonalSupplementsRaw) : undefined; } catch { seasonalSupplements = undefined; }
    onSubmit({ ...data, hotelList, seasonalSupplements });
  };

  const isBusy = uploading || isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Basic Information</CardTitle><Separator /></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Title *</Label>
            <Input {...form.register('title')} placeholder="e.g. 5N6D Sri Lanka Tour" />
            {form.formState.errors.title && <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>}
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Duration</Label>
            <Input {...form.register('duration')} placeholder="e.g. 5 nights / 6 days" />
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Price (USD)</Label>
            <Input type="number" {...form.register('price')} placeholder="0" />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" id="featured" {...form.register('featured')} className="w-4 h-4" />
            <Label htmlFor="featured" className="font-montserrat text-sm cursor-pointer">Featured package</Label>
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label className="font-montserrat text-sm">Short Description</Label>
            <Textarea {...form.register('shortDescription')} rows={2} placeholder="Brief overview..." />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label className="font-montserrat text-sm">Long Description</Label>
            <Textarea {...form.register('longDescription')} rows={4} placeholder="Detailed description..." />
          </div>
        </CardContent>
      </Card>

      {/* Hero Image Upload */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Hero Image</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-3">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          {previewUrl ? (
            <div className="relative w-full bg-gray-50 dark:bg-gray-800 rounded-lg border flex items-center justify-center overflow-hidden" style={{ maxHeight: '280px' }}>
              <img src={previewUrl} alt="Preview" className="max-h-64 w-full object-contain rounded-lg" />
              {uploading && <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>}
              {!isBusy && <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"><X size={14} /></button>}
            </div>
          ) : (
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isBusy}
              className="w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <UploadCloud className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-montserrat text-gray-500">Click to upload hero image</span>
              <span className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</span>
            </button>
          )}
          {!previewUrl && <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isBusy} className="gap-2"><UploadCloud size={14} /> Choose Image</Button>}
          {pendingFile && <p className="text-xs text-blue-500 font-montserrat">Image will be uploaded when you save.</p>}
          {form.formState.errors.imageUrl && <p className="text-xs text-red-500">{form.formState.errors.imageUrl.message}</p>}
        </CardContent>
      </Card>

      {/* Highlights / Inclusions / Exclusions / Supplements */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Highlights, Inclusions &amp; Exclusions</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-6">
          <Controller control={form.control} name="highlights" render={({ field }) => <StringListField label="Highlights" value={field.value ?? []} onChange={field.onChange} />} />
          <Controller control={form.control} name="inclusions" render={({ field }) => <StringListField label="Inclusions" value={field.value ?? []} onChange={field.onChange} />} />
          <Controller control={form.control} name="exclusions" render={({ field }) => <StringListField label="Exclusions" value={field.value ?? []} onChange={field.onChange} />} />
          <Controller control={form.control} name="supplements" render={({ field }) => <StringListField label="Supplements" value={field.value ?? []} onChange={field.onChange} />} />
        </CardContent>
      </Card>

      {/* Sri Lanka Specific */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">&#127473;&#127472; Sri Lanka Details</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-4">
          <Controller control={form.control} name="locations" render={({ field }) => <StringListField label="Locations" value={field.value ?? []} onChange={field.onChange} />} />
          <Controller control={form.control} name="culturalExperiences" render={({ field }) => <StringListField label="Cultural Experiences" value={field.value ?? []} onChange={field.onChange} />} />
        </CardContent>
      </Card>

      {/* Detailed Itinerary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-playfair text-lg">Detailed Itinerary</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={() => appendDay({ day: itineraryFields.length + 1, title: '', description: '', activities: [], meals: [], accommodation: '' })} className="gap-1"><Plus size={12} /> Add Day</Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          {itineraryFields.map((field, idx) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <span className="font-montserrat font-semibold text-sm">Day {idx + 1}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeDay(idx)}><Trash2 size={14} /></Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div><Label className="font-montserrat text-xs">Day Number</Label><Input type="number" {...form.register(`detailedItinerary.${idx}.day`)} /></div>
                <div><Label className="font-montserrat text-xs">Title</Label><Input {...form.register(`detailedItinerary.${idx}.title`)} placeholder="Day title" /></div>
                <div className="md:col-span-2"><Label className="font-montserrat text-xs">Description</Label><Textarea {...form.register(`detailedItinerary.${idx}.description`)} rows={2} /></div>
                <div><Label className="font-montserrat text-xs">Accommodation</Label><Input {...form.register(`detailedItinerary.${idx}.accommodation`)} placeholder="Hotel name" /></div>
                <div className="md:col-span-2">
                  <Label className="font-montserrat text-xs">Activities (one per line)</Label>
                  <Textarea
                    rows={3}
                    placeholder="Activity 1&#10;Activity 2"
                    value={(form.watch(`detailedItinerary.${idx}.activities`) ?? []).join('\n')}
                    onChange={e => form.setValue(`detailedItinerary.${idx}.activities`, e.target.value.split('\n').filter(Boolean))}
                  />
                </div>
                <div>
                  <Label className="font-montserrat text-xs">Meals (one per line)</Label>
                  <Textarea
                    rows={2}
                    placeholder="Breakfast&#10;Dinner"
                    value={(form.watch(`detailedItinerary.${idx}.meals`) ?? []).join('\n')}
                    onChange={e => form.setValue(`detailedItinerary.${idx}.meals`, e.target.value.split('\n').filter(Boolean))}
                  />
                </div>
              </div>
            </div>
          ))}
          {itineraryFields.length === 0 && <p className="text-sm text-gray-400 font-lora">No days added yet.</p>}
        </CardContent>
      </Card>

      {/* Pricing Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-playfair text-lg">Pricing Table</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={() => appendPricing({ name: '', prices: { '2Pax': 0, '4Pax': 0, '6Pax': 0, '8Pax': 0, ExtraAdult: 0, ChildWithBed: 0, ChildWithoutBed: 0 } })} className="gap-1"><Plus size={12} /> Add Category</Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div><Label className="font-montserrat text-xs">Currency</Label><Input {...form.register('pricingTable.currency')} placeholder="USD" /></div>
            <div><Label className="font-montserrat text-xs">Valid From</Label><Input {...form.register('pricingTable.validFrom')} placeholder="01 MAY 2025" /></div>
            <div><Label className="font-montserrat text-xs">Valid To</Label><Input {...form.register('pricingTable.validTo')} placeholder="31 OCT 2025" /></div>
          </div>
          {pricingFields.map((field, idx) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <Input {...form.register(`pricingTable.categories.${idx}.name`)} placeholder="Category name (e.g. 3 Star)" className="w-48" />
                <Button type="button" variant="ghost" size="icon" onClick={() => removePricing(idx)}><Trash2 size={14} /></Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                {(['2Pax','4Pax','6Pax','8Pax','ExtraAdult','ChildWithBed','ChildWithoutBed'] as const).map(key => (
                  <div key={key}>
                    <Label className="font-montserrat text-xs">{key}</Label>
                    <Input type="number" {...form.register(`pricingTable.categories.${idx}.prices.${key}`)} placeholder="0" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {pricingFields.length === 0 && <p className="text-sm text-gray-400 font-lora">No pricing categories added yet.</p>}
        </CardContent>
      </Card>

      {/* Hotel List (JSON) */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Hotel List (JSON)</CardTitle><Separator /></CardHeader>
        <CardContent>
          <Label className="font-montserrat text-xs text-gray-500 mb-2 block">Paste as JSON object, e.g.: {'{"3Star": {"Kandy": "Hotel Name"}}'}</Label>
          <Textarea {...form.register('hotelListRaw')} rows={6} placeholder='{&#10;  "3Star": {"Kandy": "...", "Beach": "..."},&#10;  "4Star": {"Kandy": "..."}&#10;}' className="font-mono text-xs" />
        </CardContent>
      </Card>

      {/* Seasonal Supplements (JSON) */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Seasonal Supplements (JSON)</CardTitle><Separator /></CardHeader>
        <CardContent>
          <Label className="font-montserrat text-xs text-gray-500 mb-2 block">Paste as JSON object</Label>
          <Textarea {...form.register('seasonalSupplementsRaw')} rows={4} placeholder='{&#10;  "peakSeason": {"period": "01 Jul - 31 Aug", "rates": {"3Star": 10}}&#10;}' className="font-mono text-xs" />
        </CardContent>
      </Card>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isBusy} className="gap-2 font-montserrat px-8">
          {uploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Package'}
        </Button>
      </div>
    </form>
  );
}