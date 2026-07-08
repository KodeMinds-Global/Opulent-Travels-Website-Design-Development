import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const schema = z.object({
  destination: z.enum(['sriLanka', 'maldives']),
  name: z.string().min(1, 'Car name is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().optional(),
  pricePerDay: z.coerce.number().min(0),
  currency: z.string().default('USD'),
  seats: z.coerce.number().min(1).optional(),
  transmission: z.enum(['Manual', 'Automatic']).optional(),
  fuelType: z.string().optional(),
  features: z.array(z.string()).optional(),
  available: z.boolean().default(true),
});

export type CarFormData = z.infer<typeof schema>;

interface CarFormProps {
  initialData?: Partial<CarFormData>;
  onSubmit: (data: CarFormData) => void;
  isSubmitting: boolean;
}

export function CarForm({ initialData, onSubmit, isSubmitting }: CarFormProps) {
  const form = useForm<CarFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      destination: 'sriLanka',
      currency: 'USD',
      available: true,
      features: [],
      ...initialData,
    },
  });

  const [features, setFeatures] = useState<string[]>(initialData?.features ?? []);
  const [newFeature, setNewFeature] = useState('');
  const imageUrl = form.watch('imageUrl');

  const addFeature = () => {
    if (!newFeature.trim()) return;
    const updated = [...features, newFeature.trim()];
    setFeatures(updated);
    form.setValue('features', updated);
    setNewFeature('');
  };

  const removeFeature = (i: number) => {
    const updated = features.filter((_, idx) => idx !== i);
    setFeatures(updated);
    form.setValue('features', updated);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Car Details</CardTitle><Separator /></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          {/* Destination */}
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
          {/* Name */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Car Name *</Label>
            <Input {...form.register('name')} placeholder="e.g. Toyota Prius" />
            {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
          </div>
          {/* Category */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Category *</Label>
            <Controller control={form.control} name="category" render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {['Economy','Compact','Sedan','SUV','Luxury SUV','Premium Sedan','Van','Minibus','Other'].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </div>
          {/* Price per day */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Price Per Day *</Label>
            <div className="flex gap-2">
              <Input type="number" min={0} {...form.register('pricePerDay')} placeholder="0" className="flex-1" />
              <Input {...form.register('currency')} placeholder="USD" className="w-20" />
            </div>
          </div>
          {/* Seats */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Seats</Label>
            <Input type="number" min={1} {...form.register('seats')} placeholder="5" />
          </div>
          {/* Transmission */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Transmission</Label>
            <Controller control={form.control} name="transmission" render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            )} />
          </div>
          {/* Fuel Type */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Fuel Type</Label>
            <Controller control={form.control} name="fuelType" render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {['Petrol','Diesel','Hybrid','Electric'].map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </div>
          {/* Available */}
          <div className="flex items-center gap-2 mt-4">
            <Controller control={form.control} name="available" render={({ field }) => (
              <Checkbox checked={!!field.value} onCheckedChange={field.onChange} id="available" />
            )} />
            <Label htmlFor="available" className="font-montserrat text-sm cursor-pointer">Available for booking</Label>
          </div>
        </CardContent>
      </Card>

      {/* Image URL with preview */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Car Image</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Image URL</Label>
            <Input {...form.register('imageUrl')} placeholder="https://..." />
          </div>
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Car preview" className="h-40 w-full object-cover rounded-lg border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader><CardTitle className="font-playfair text-lg">Features</CardTitle><Separator /></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="e.g. Air Conditioning"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
            />
            <Button type="button" variant="outline" onClick={addFeature} className="gap-1">
              <Plus size={14} /> Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-sm px-3 py-1 rounded-full font-lora">
                {f}
                <button type="button" onClick={() => removeFeature(i)} className="text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="gap-2 font-montserrat px-8">
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Car'}
        </Button>
      </div>
    </form>
  );
}