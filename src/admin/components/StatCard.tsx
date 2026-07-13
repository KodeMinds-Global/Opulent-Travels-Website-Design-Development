import { type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  accentClass: string; // e.g. 'text-teal-500'
  bgClass: string;     // e.g. 'bg-teal-50'
  subtitle?: string;
}

export function StatCard({ title, value, icon: Icon, accentClass, bgClass, subtitle }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
            <p className={`font-playfair text-3xl font-bold ${accentClass}`}>{value}</p>
            {subtitle && <p className="font-lora text-xs text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-xl ${bgClass}`}>
            <Icon className={`w-6 h-6 ${accentClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}