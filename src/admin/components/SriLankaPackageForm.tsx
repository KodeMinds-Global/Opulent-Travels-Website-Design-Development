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

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  longDescription: z.string().optional(),
  imageUrl: z.string().optional(),
  mapImageUrl: z.string().optional(),
  price: z.coerce.number().min(0).optional(),
  duration: z.string().optional(),
  destinationsCount: z.coerce.number().min(0).optional(),
  highlights: z.array(z.string()).max(4, 'Maximum 4 highlights').optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  detailedItinerary: z.array(z.object({
    day: z.coerce.number(),
    title: z.string().min(1, 'Day title required'),
    description: z.string().optional(),
    activities: z.array(z.string()).optional(),
    meals: z.array(z.string()).optional(),
    accommodation: z.string().optional(),
  })).optional(),
  // Hotel list as structured rows — serialised to hotelList on submit
  hotelListEntries: z.array(z.object({
    category: z.string(),
    location: z.string(),
    hotelName: z.string(),
  })).optional(),
});

export type SriLankaPackageFormData = z.infer<typeof schema>;

interface SriLankaPackageFormProps {
  initialData?: Partial<SriLankaPackageFormData> & {
    hotelList?: Record<string, unknown>;
  };
  initialImageUrl?: string;
  initialMapImageUrl?: string;
  onSubmit: (
    data: SriLankaPackageFormData & { hotelList?: Record<string, unknown> }
  ) => void;
  isSubmitting: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert structured hotelListEntries → the nested Record used by the backend */
function entriesToHotelList(
  entries: { category: string; location: string; hotelName: string }[]
): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};
  for (const e of entries) {
    if (!e.category || !e.location) continue;
    if (!result[e.category]) result[e.category] = {};
    result[e.category][e.location] = e.hotelName;
  }
  return result;
}

/** Convert nested hotelList Record → flat array of entries for the form */
function hotelListToEntries(
  hotelList?: Record<string, unknown>
): { category: string; location: string; hotelName: string }[] {
  if (!hotelList) return [];
  const entries: { category: string; location: string; hotelName: string }[] = [];
  for (const [category, locations] of Object.entries(hotelList)) {
    if (typeof locations === 'object' && locations !== null) {
      for (const [location, hotelName] of Object.entries(
        locations as Record<string, string>
      )) {
        entries.push({ category, location, hotelName: hotelName ?? '' });
      }
    }
  }
  return entries;
}

function resolvePreviewUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('blob:') || url.startsWith('http')) return url;
  if (url.startsWith('/uploads/')) return getImageUrl(url);
  const base = (import.meta as any).env?.BASE_URL?.replace(/\/$/, '') ?? '';
  return `${base}${url.startsWith('/') ? url : '/' + url}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

/** Generic bullet-point list field with + Add button */
function BulletListField({
  label,
  value,
  onChange,
  maxItems,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  maxItems?: number;
  placeholder?: string;
}) {
  const add = () => onChange([...value, '']);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i: number, v: string) => {
    const n = [...value];
    n[i] = v;
    onChange(n);
  };
  const atMax = maxItems !== undefined && value.length >= maxItems;
  return (
    <div className="space-y-2">
      <Label className="font-montserrat text-sm">{label}</Label>
      {value.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <span className="text-gray-400 text-sm w-5 flex-shrink-0">{i + 1}.</span>
          <Input
            value={item}
            onChange={e => update(i, e.target.value)}
            placeholder={placeholder ?? `${label} item`}
            className="flex-1"
          />
          <Button type="button" variant="outline" size="icon" onClick={() => remove(i)}>
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={add}
        disabled={atMax}
        className="gap-1"
      >
        <Plus size={12} /> Add {label}{atMax ? ` (max ${maxItems})` : ''}
      </Button>
    </div>
  );
}

/** Meal checkboxes: Breakfast, Lunch, Dinner */
const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner'] as const;

function MealsField({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (meal: string) => {
    if (value.includes(meal)) {
      onChange(value.filter(m => m !== meal));
    } else {
      onChange([...value, meal]);
    }
  };
  return (
    <div className="space-y-1">
      <Label className="font-montserrat text-xs">Meals</Label>
      <div className="flex gap-4 flex-wrap">
        {MEAL_OPTIONS.map(meal => (
          <label key={meal} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded accent-blue-600"
              checked={value.includes(meal)}
              onChange={() => toggle(meal)}
            />
            <span className="font-montserrat text-sm">{meal}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

/** Image upload block */
function ImageUploadBlock({
  label,
  subtitle,
  previewUrl,
  isBusy,
  onFileChange,
  onRemove,
  inputRef,
  pendingFile,
  error,
  uploadHint,
}: {
  label: string;
  subtitle?: string;
  previewUrl?: string;
  isBusy: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  pendingFile: File | null;
  error?: string;
  uploadHint: string;
}) {
  return (
    <CardContent className="space-y-3">
      {subtitle && <p className="text-xs text-gray-500 font-montserrat">{subtitle}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
      {previewUrl ? (
        <div
          className="relative w-full bg-gray-50 dark:bg-gray-800 rounded-lg border flex items-center justify-center overflow-hidden"
          style={{ maxHeight: '280px' }}
        >
          <img src={previewUrl} alt={label} className="max-h-64 w-full object-contain rounded-lg" />
          {isBusy && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
          {!isBusy && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isBusy}
          className="w-full h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <UploadCloud className="h-8 w-8 text-gray-400" />
          <span className="text-sm font-montserrat text-gray-500">{uploadHint}</span>
          <span className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</span>
        </button>
      )}
      {!previewUrl && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={isBusy}
          className="gap-2"
        >
          <UploadCloud size={14} /> Choose Image
        </Button>
      )}
      {pendingFile && (
        <p className="text-xs text-blue-500 font-montserrat">Image will be uploaded when you save.</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </CardContent>
  );
}

// ── Main Form ─────────────────────────────────────────────────────────────────

export function SriLankaPackageForm({
  initialData,
  initialImageUrl,
  initialMapImageUrl,
  onSubmit,
  isSubmitting,
}: SriLankaPackageFormProps) {
  const form = useForm<SriLankaPackageFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      highlights: [],
      inclusions: [],
      exclusions: [],
      detailedItinerary: [],
      hotelListEntries: [],
      destinationsCount: 0,
      imageUrl: '',
      mapImageUrl: '',
      ...initialData,
      hotelListEntries:
        initialData?.hotelListEntries ??
        hotelListToEntries(initialData?.hotelList),
    },
  });

  const {
    fields: itineraryFields,
    append: appendDay,
    remove: removeDay,
  } = useFieldArray({ control: form.control, name: 'detailedItinerary' });

  const {
    fields: hotelFields,
    append: appendHotel,
    remove: removeHotel,
  } = useFieldArray({ control: form.control, name: 'hotelListEntries' });

  // Hero image
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    resolvePreviewUrl(initialImageUrl ?? initialData?.imageUrl)
  );
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

  // Journey map image
  const [mapPreviewUrl, setMapPreviewUrl] = useState<string | undefined>(
    resolvePreviewUrl(initialMapImageUrl ?? initialData?.mapImageUrl)
  );
  const [mapPendingFile, setMapPendingFile] = useState<File | null>(null);
  const mapFileInputRef = useRef<HTMLInputElement>(null);

  const handleMapFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMapPendingFile(file);
    setMapPreviewUrl(URL.createObjectURL(file));
    form.setValue('mapImageUrl', '');
  };
  const removeMapImage = () => {
    setMapPreviewUrl(undefined);
    setMapPendingFile(null);
    form.setValue('mapImageUrl', '');
    if (mapFileInputRef.current) mapFileInputRef.current.value = '';
  };

  const isBusy = uploading || isSubmitting;

  const handleSubmit = async (data: SriLankaPackageFormData) => {
    // Upload hero image
    if (pendingFile) {
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append('file', pendingFile);
        const res = await adminAxios.post<{ url: string }>('/upload/image', fd);
        data.imageUrl = res.data.url;
        form.setValue('imageUrl', res.data.url);
        setPendingFile(null);
      } catch {
        form.setError('imageUrl', { message: 'Image upload failed.' });
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }
    // Upload journey map image
    if (mapPendingFile) {
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append('file', mapPendingFile);
        const res = await adminAxios.post<{ url: string }>('/upload/image', fd);
        data.mapImageUrl = res.data.url;
        form.setValue('mapImageUrl', res.data.url);
        setMapPendingFile(null);
      } catch {
        form.setError('mapImageUrl', { message: 'Map image upload failed.' });
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }
    // Serialise hotel list entries → nested Record
    const hotelList = entriesToHotelList(data.hotelListEntries ?? []);
    // Ensure mapImageUrl is explicitly included (zod may strip undefined optional fields)
    const mapImageUrl = data.mapImageUrl || form.getValues('mapImageUrl') || '';
    onSubmit({ ...data, mapImageUrl, hotelList });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

      {/* ── Basic Information ── */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Basic Information</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Title *</Label>
            <Input {...form.register('title')} placeholder="e.g. 5N6D Sri Lanka Tour" />
            {form.formState.errors.title && (
              <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Duration</Label>
            <Input {...form.register('duration')} placeholder="e.g. 5 nights / 6 days" />
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Price (USD)</Label>
            <Input type="number" {...form.register('price')} placeholder="0" />
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Destinations</Label>
            <Input
              type="number"
              min={0}
              {...form.register('destinationsCount')}
              placeholder="e.g. 3"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label className="font-montserrat text-sm">Description</Label>
            <Textarea
              {...form.register('longDescription')}
              rows={4}
              placeholder="Detailed description..."
            />
          </div>
          {/* Highlights — max 4 */}
          <div className="md:col-span-2">
            <Controller
              control={form.control}
              name="highlights"
              render={({ field }) => (
                <BulletListField
                  label="Highlights"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  maxItems={4}
                  placeholder="e.g. Visit Pinnawala Elephant Orphanage"
                />
              )}
            />
            {form.formState.errors.highlights && (
              <p className="text-xs text-red-500 mt-1">
                {form.formState.errors.highlights.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Hero Image ── */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Hero Image</CardTitle>
          <Separator />
        </CardHeader>
        <ImageUploadBlock
          label="Hero Image"
          previewUrl={previewUrl}
          isBusy={isBusy}
          onFileChange={handleFileChange}
          onRemove={removeImage}
          inputRef={fileInputRef}
          pendingFile={pendingFile}
          error={form.formState.errors.imageUrl?.message}
          uploadHint="Click to upload hero image"
        />
      </Card>

      {/* ── Journey Map ── */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Journey Map</CardTitle>
          <Separator />
        </CardHeader>
        <ImageUploadBlock
          label="Journey Map"
          subtitle="Upload the package journey map image shown in the itinerary section."
          previewUrl={mapPreviewUrl}
          isBusy={isBusy}
          onFileChange={handleMapFileChange}
          onRemove={removeMapImage}
          inputRef={mapFileInputRef}
          pendingFile={mapPendingFile}
          error={form.formState.errors.mapImageUrl?.message}
          uploadHint="Click to upload journey map"
        />
      </Card>

      {/* ── Inclusions & Exclusions ── */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Inclusions &amp; Exclusions</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-6">
          <Controller
            control={form.control}
            name="inclusions"
            render={({ field }) => (
              <BulletListField
                label="Inclusions"
                value={field.value ?? []}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={form.control}
            name="exclusions"
            render={({ field }) => (
              <BulletListField
                label="Exclusions"
                value={field.value ?? []}
                onChange={field.onChange}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* ── Detailed Itinerary ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-playfair text-lg">Detailed Itinerary</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendDay({
                  day: itineraryFields.length + 1,
                  title: '',
                  description: '',
                  activities: [],
                  meals: [],
                  accommodation: '',
                })
              }
              className="gap-1"
            >
              <Plus size={12} /> Add Day
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          {itineraryFields.map((field, idx) => (
            <div
              key={field.id}
              className="border rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <span className="font-montserrat font-semibold text-sm">Day {idx + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDay(idx)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <Label className="font-montserrat text-xs">Day Number</Label>
                  <Input type="number" {...form.register(`detailedItinerary.${idx}.day`)} />
                </div>
                <div>
                  <Label className="font-montserrat text-xs">Title</Label>
                  <Input
                    {...form.register(`detailedItinerary.${idx}.title`)}
                    placeholder="Day title"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="font-montserrat text-xs">Description</Label>
                  <Textarea
                    {...form.register(`detailedItinerary.${idx}.description`)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="font-montserrat text-xs">Accommodation</Label>
                  <Input
                    {...form.register(`detailedItinerary.${idx}.accommodation`)}
                    placeholder="Hotel name"
                  />
                </div>
                {/* Activities & Highlights — bullet list */}
                <div className="md:col-span-2">
                  <Controller
                    control={form.control}
                    name={`detailedItinerary.${idx}.activities`}
                    render={({ field }) => (
                      <BulletListField
                        label="Activities & Highlights"
                        value={field.value ?? []}
                        onChange={field.onChange}
                        placeholder="e.g. Visit Pinnawala Elephant Orphanage"
                      />
                    )}
                  />
                </div>
                {/* Meals — checkboxes */}
                <div>
                  <Controller
                    control={form.control}
                    name={`detailedItinerary.${idx}.meals`}
                    render={({ field }) => (
                      <MealsField
                        value={field.value ?? []}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
          {itineraryFields.length === 0 && (
            <p className="text-sm text-gray-400 font-lora">No days added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* ── Hotel List ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-playfair text-lg">Hotel List</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendHotel({ category: '', location: '', hotelName: '' })
              }
              className="gap-1"
            >
              <Plus size={12} /> Add Hotel
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-3">
          {hotelFields.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-1">
              <Label className="font-montserrat text-xs text-gray-500">Star Category</Label>
              <Label className="font-montserrat text-xs text-gray-500">Location</Label>
              <Label className="font-montserrat text-xs text-gray-500">Hotel Name</Label>
            </div>
          )}
          {hotelFields.map((field, idx) => (
            <div key={field.id} className="grid grid-cols-3 gap-2 items-center">
              <Input
                {...form.register(`hotelListEntries.${idx}.category`)}
                placeholder="e.g. 3Star"
              />
              <Input
                {...form.register(`hotelListEntries.${idx}.location`)}
                placeholder="e.g. Kandy"
              />
              <div className="flex gap-2">
                <Input
                  {...form.register(`hotelListEntries.${idx}.hotelName`)}
                  placeholder="e.g. Topaz Hotel"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeHotel(idx)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
          {hotelFields.length === 0 && (
            <p className="text-sm text-gray-400 font-lora">No hotels added yet. Click &quot;Add Hotel&quot; to start.</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isBusy} className="gap-2 font-montserrat px-8">
          {uploading ? (
            <><Loader2 size={16} className="animate-spin" /> Uploading...</>
          ) : isSubmitting ? (
            <><Loader2 size={16} className="animate-spin" /> Saving...</>
          ) : (
            'Save Package'
          )}
        </Button>
      </div>
    </form>
  );
}