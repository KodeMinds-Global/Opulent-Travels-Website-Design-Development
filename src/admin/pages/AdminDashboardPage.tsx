import { useQuery } from '@tanstack/react-query';
import { MapPin, Waves, CarFront, RefreshCw } from 'lucide-react';
import { dashboardService } from '../services/dashboard.service';
import { StatCard } from '../components/StatCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export function AdminDashboardPage() {
  const { data: stats, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: () => dashboardService.getStats(),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">Failed to load statistics. Is the backend running?</p>
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
      accentClass: 'text-teal-600',
      bgClass: 'bg-teal-50',
      subtitle: 'Tour packages',
    },
    {
      title: 'Maldives Packages',
      value: stats?.packages.maldives ?? 0,
      icon: Waves,
      accentClass: 'text-blue-600',
      bgClass: 'bg-blue-50',
      subtitle: 'Tour packages',
    },
    {
      title: 'Total Cars',
      value: stats?.cars.total ?? 0,
      icon: CarFront,
      accentClass: 'text-purple-600',
      bgClass: 'bg-purple-50',
      subtitle: 'All destinations',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
        <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2">
          <RefreshCw size={14} /> Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}