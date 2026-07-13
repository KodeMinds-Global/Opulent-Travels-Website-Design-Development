import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const schema = z.object({
  destination: z.enum(['sriLanka', 'maldives']),
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
  itinerary: z.array(z.object({
    day: z.coerce.number(),
    title: z.string(),
    description: z.string().optional(),
    activities: z.array(z.string()).optional(),
    meals: z.array(z.string()).optional(),
    accommodation: z.string().optional(),
  })).optional(),
  // Destination specific
  locations: z.array(z.string()).optional(),
  culturalExperiences: z.array(z.string()).optional(),
  resortName: z.string().optional(),
  resortRating: z.coerce.number().min(1).max(5).optional(),
  waterActivities: z.array(z.string()).optional(),
});

export type PackageFormData = z.infer<typeof schema>;

interface PackageFormProps {
  initialData?: Partial<PackageFormData>;
  onSubmit: (data: PackageFormData) => void;
  isSubmitting: boolean;
}

function StringListField({ label, value, onChange }: {
  label: string;
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const add = () => onChange([...value, '']);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const update = (i: number, v: string) => {
    const next = [...value];
    next[i] = v;
    onChange(next);
  };
  return (
    <div className="space-y-2">
      <Label className="font-montserrat text-sm">{label}</Label>
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <Input value={item} onChange={(e) => update(i, e.target.value)} placeholder={`${label} item`} />
          <Button type="button" variant="outline" size="icon" onClick={() => remove(i)}><Trash2 size={14} /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add} className="gap-1">
        <Plus size={12} /> Add {label}
      </Button>
    </div>
  );
}

export function PackageForm({ initialData, onSubmit, isSubmitting }: PackageFormProps) {
  const form = useForm<PackageFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      destination: 'sriLanka',
      featured: false,
      highlights: [],
      inclusions: [],
      exclusions: [],
      itinerary: [],
      locations: [],
      culturalExperiences: [],
      waterActivities: [],
      ...initialData,
    },
  });

  const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary } = useFieldArray({
    control: form.control, name: 'itinerary',
  });

  const destination = form.watch('destination');

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Section 1: Basic Info */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Basic Information</CardTitle><Separator /></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Destination *</Label>
            <Controller control={form.control} name="destination" render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sriLanka">🇱🇰 Sri Lanka</SelectItem>
                  <SelectItem value="maldives">🇲🇻 Maldives</SelectItem>
                </SelectContent>
              </Select>
            )} />
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Title *</Label>
            <Input {...form.register('title')} placeholder="e.g. 5N6D Sri Lanka Tour" />
            {form.formState.errors.title && <p className="text-xs text-red-500">{form.formState.errors.title.message}</p>}
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label className="font-montserrat text-sm">Short Description</Label>
            <Textarea {...form.register('shortDescription')} rows={2} placeholder="Brief overview..." />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label className="font-montserrat text-sm">Long Description</Label>
            <Textarea {...form.register('longDescription')} rows={4} placeholder="Detailed description..." />
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Price (USD)</Label>
            <Input type="number" {...form.register('price')} placeholder="0" />
          </div>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Duration</Label>
            <Input {...form.register('duration')} placeholder="e.g. 5 nights / 6 days" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label className="font-montserrat text-sm">Image URL</Label>
            <Input {...form.register('imageUrl')} placeholder="https://..." />
          </div>
          <div className="flex items-center gap-2">
            <Controller control={form.control} name="featured" render={({ field }) => (
              <Checkbox checked={!!field.value} onCheckedChange={field.onChange} id="featured" />
            )} />
            <Label htmlFor="featured" className="font-montserrat text-sm cursor-pointer">Featured package</Label>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Highlights / Inclusions / Exclusions */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Highlights, Inclusions &amp; Exclusions</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-6">
          <Controller control={form.control} name="highlights" render={({ field }) => (
            <StringListField label="Highlights" value={field.value ?? []} onChange={field.onChange} />
          )} />
          <Controller control={form.control} name="inclusions" render={({ field }) => (
            <StringListField label="Inclusions" value={field.value ?? []} onChange={field.onChange} />
          )} />
          <Controller control={form.control} name="exclusions" render={({ field }) => (
            <StringListField label="Exclusions" value={field.value ?? []} onChange={field.onChange} />
          )} />
        </CardContent>
      </Card>

      {/* Section 3: Itinerary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-playfair text-lg">Itinerary</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={() => appendItinerary({ day: itineraryFields.length + 1, title: '', description: '', activities: [], meals: [], accommodation: '' })} className="gap-1">
              <Plus size={12} /> Add Day
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          {itineraryFields.map((field, idx) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <span className="font-montserrat font-semibold text-sm">Day {idx + 1}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeItinerary(idx)}><Trash2 size={14} /></Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <Label className="font-montserrat text-xs">Day Number</Label>
                  <Input type="number" {...form.register(`itinerary.${idx}.day`)} />
                </div>
                <div>
                  <Label className="font-montserrat text-xs">Title</Label>
                  <Input {...form.register(`itinerary.${idx}.title`)} placeholder="Day title" />
                </div>
                <div className="md:col-span-2">
                  <Label className="font-montserrat text-xs">Description</Label>
                  <Textarea {...form.register(`itinerary.${idx}.description`)} rows={2} />
                </div>
                <div>
                  <Label className="font-montserrat text-xs">Accommodation</Label>
                  <Input {...form.register(`itinerary.${idx}.accommodation`)} placeholder="Hotel name" />
                </div>
              </div>
            </div>
          ))}
          {itineraryFields.length === 0 && <p className="text-sm text-gray-400 font-lora">No days added yet.</p>}
        </CardContent>
      </Card>

      {/* Section 4: Destination-specific */}
      {destination === 'sriLanka' && (
        <Card>
          <CardHeader><CardTitle className="font-playfair text-lg">🇱🇰 Sri Lanka Details</CardTitle><Separator /></CardHeader>
          <CardContent className="space-y-4">
            <Controller control={form.control} name="locations" render={({ field }) => (
              <StringListField label="Locations" value={field.value ?? []} onChange={field.onChange} />
            )} />
            <Controller control={form.control} name="culturalExperiences" render={({ field }) => (
              <StringListField label="Cultural Experiences" value={field.value ?? []} onChange={field.onChange} />
            )} />
          </CardContent>
        </Card>
      )}

      {destination === 'maldives' && (
        <Card>
          <CardHeader><CardTitle className="font-playfair text-lg">🇲🇻 Maldives Details</CardTitle><Separator /></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="font-montserrat text-sm">Resort Name</Label>
              <Input {...form.register('resortName')} placeholder="Resort name" />
            </div>
            <div className="space-y-1">
              <Label className="font-montserrat text-sm">Resort Rating (1-5)</Label>
              <Input type="number" min={1} max={5} step={0.5} {...form.register('resortRating')} />
            </div>
            <div className="md:col-span-2">
              <Controller control={form.control} name="waterActivities" render={({ field }) => (
                <StringListField label="Water Activities" value={field.value ?? []} onChange={field.onChange} />
              )} />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isSubmitting} className="gap-2 font-montserrat px-8">
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Package'}
        </Button>
      </div>
    </form>
  );
}