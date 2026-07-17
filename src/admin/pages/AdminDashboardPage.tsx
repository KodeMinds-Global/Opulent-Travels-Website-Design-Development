import { useQuery } from '@tanstack/react-query';
import { MapPin, Waves, CarFront, RefreshCw } from 'lucide-react';
import { dashboardService } from '../services/dashboard.service';
import { StatCard } from '../components/StatCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useAdminTheme } from '../components/AdminLayout';

export function AdminDashboardPage() {
  const { isDark } = useAdminTheme();

  const { data: stats, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: () => dashboardService.getStats(),
  });

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';
  const subtitleColor = isDark ? '#4A6080' : '#64748B';

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="font-playfair text-2xl font-bold" style={{ color: headingColor }}>Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <h2 className="font-playfair text-2xl font-bold" style={{ color: headingColor }}>Dashboard Overview</h2>
        <div className="text-center py-16">
          <p className="mb-4" style={{ color: subtitleColor }}>Failed to load statistics. Is the backend running?</p>
          <Button onClick={() => refetch()} variant="outline" className="gap-2">
            <RefreshCw size={16} /> Retry
          </Button>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Sri Lanka Packages',
      value: stats?.packages.sriLanka ?? 0,
      icon: MapPin,
      accentClass: 'text-[#0E7490]',
      bgClass: 'bg-[#ECFEFF]',
      borderColor: '#0E7490',
      subtitle: 'Tour packages',
    },
    {
      title: 'Maldives Packages',
      value: stats?.packages.maldives ?? 0,
      icon: Waves,
      accentClass: 'text-[#2563EB]',
      bgClass: 'bg-[#EFF6FF]',
      borderColor: '#2563EB',
      subtitle: 'Tour packages',
    },
    {
      title: 'Total Cars',
      value: stats?.cars.total ?? 0,
      icon: CarFront,
      accentClass: isDark ? 'text-[#60A5FA]' : 'text-[#1B3A6B]',
      bgClass: 'bg-[#EEF2F7]',
      borderColor: isDark ? '#2563EB' : '#1B3A6B',
      subtitle: 'All destinations',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-playfair text-xl sm:text-2xl font-bold" style={{ color: headingColor }}>
            Dashboard Overview
          </h2>
          <p className="font-lora text-sm mt-0.5" style={{ color: subtitleColor }}>
            Welcome back to Opulnet Travels admin
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          className="gap-2 font-montserrat text-xs"
          style={{
            borderColor: isDark ? '#1E3A6B' : '#BFDBFE',
            color: isDark ? '#93C5FD' : '#2563EB',
          }}
        >
          <RefreshCw size={14} /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <StatCard key={card.title} {...card} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}