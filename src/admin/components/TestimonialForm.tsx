import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  date: z.string().min(1, 'Date is required'),
  text: z.string().min(1, 'Review text is required'),
});

export type TestimonialFormData = z.infer<typeof schema>;

interface TestimonialFormProps {
  initialData?: Partial<TestimonialFormData>;
  onSubmit: (data: TestimonialFormData) => void;
  isSubmitting: boolean;
}

// Parse a stored date string like "12 Jan 2026" back to a Date object
function parseStoredDate(dateStr: string): Date | undefined {
  if (!dateStr) return undefined;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? undefined : parsed;
}

export function TestimonialForm({ initialData, onSubmit, isSubmitting }: TestimonialFormProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      location: '',
      date: '',
      text: '',
      ...initialData,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Client Info */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Client Details</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Client Name *</Label>
            <Input {...form.register('name')} placeholder="e.g. Sarah Johnson" />
            {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
          </div>
          {/* Location */}
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Location *</Label>
            <Input {...form.register('location')} placeholder="e.g. New York, USA" />
            {form.formState.errors.location && <p className="text-xs text-red-500">{form.formState.errors.location.message}</p>}
          </div>
          {/* Date — Calendar Picker */}
          <div className="space-y-1 md:col-span-2">
            <Label className="font-montserrat text-sm">Date *</Label>
            <Controller
              control={form.control}
              name="date"
              render={({ field }) => {
                const selectedDate = parseStoredDate(field.value);
                return (
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? field.value : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date) {
                            // Format as "12 Jan 2026" to match the existing display format
                            field.onChange(format(date, 'd MMM yyyy'));
                          } else {
                            field.onChange('');
                          }
                          setCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
            {form.formState.errors.date && <p className="text-xs text-red-500">{form.formState.errors.date.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Review Text */}
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-lg">Review</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Label className="font-montserrat text-sm">Review Text *</Label>
            <Textarea
              {...form.register('text')}
              placeholder="Enter the client's review..."
              className="min-h-[120px] resize-y"
            />
            {form.formState.errors.text && <p className="text-xs text-red-500">{form.formState.errors.text.message}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="gap-2 font-montserrat px-8">
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Testimonial'}
        </Button>
      </div>
    </form>
  );
}