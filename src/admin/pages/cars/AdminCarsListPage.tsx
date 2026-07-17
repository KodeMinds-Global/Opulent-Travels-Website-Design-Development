import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAdminCars, useDeleteCar } from '../../hooks/useAdminCars';
import { AdminDataTable, type TableColumn } from '../../components/AdminDataTable';
import { ConfirmDeleteDialog } from '../../components/ConfirmDeleteDialog';
import { DestinationBadge } from '../../components/DestinationBadge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getImageUrl } from '../../api/axios';
import { useAdminTheme } from '../../components/AdminLayout';
import type { AdminCar } from '../../types/car';

type Destination = 'all' | 'sriLanka' | 'maldives';

export function AdminCarsListPage() {
  const navigate = useNavigate();
  const { isDark } = useAdminTheme();
  const [destination, setDestination] = useState<Destination>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: cars = [], isLoading } = useAdminCars(
    destination === 'all' ? undefined : destination,
  );
  const deleteMutation = useDeleteCar();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Car deleted successfully');
    } catch {
      toast.error('Failed to delete car');
    } finally {
      setDeleteId(null);
    }
  };

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';

  const columns: TableColumn<AdminCar>[] = [
    {
      key: 'imageUrl',
      header: 'Image',
      render: (row) => (
        row.imageUrl
          ? <img src={getImageUrl(row.imageUrl as string)} alt={row.name as string} className="w-14 h-10 object-cover rounded-md" />
          : <div className="w-14 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">No img</div>
      ),
    },
    { key: 'name', header: 'Name', render: (row) => <span className="font-medium">{row.name}</span> },
    { key: 'category', header: 'Category' },
    {
      key: 'destination',
      header: 'Destination',
      render: (row) => <DestinationBadge destination={row.destination} />,
    },
    {
      key: 'pricePerDay',
      header: 'Price/Day',
      render: (row) => {
        const price = row.pricePerDay as number;
        const currency = (row.currency as string) ?? 'USD';
        const symbol = currency === 'LKR' ? 'Rs' : '$';
        const formatted = Number(price ?? 0).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return `${symbol} ${formatted}`;
      },
    },
    { key: 'seats', header: 'Seats', render: (row) => row.seats ?? '—' },
    { key: 'transmission', header: 'Guide/Driver', render: (row) => row.transmission ?? '—' },
    {
      key: 'available',
      header: 'Available',
      render: (row) => (
        <span className={row.available ? 'text-green-500 font-medium' : 'text-gray-400'}>
          {row.available ? '✓ Yes' : '– No'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/cars/${row._id}/edit`)}
            className="gap-1 px-2 text-xs"
            style={isDark ? { borderColor: '#1E3A6B', color: '#93C5FD', background: 'transparent' } : {}}
          >
            <Pencil size={11} /> Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteId(row._id as string)}
            className="gap-1 px-2 text-xs"
          >
            <Trash2 size={11} /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page header — stacks on mobile */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-playfair text-xl sm:text-2xl font-bold" style={{ color: headingColor }}>
          Rent Cars
        </h2>
        <Button onClick={() => navigate('/admin/cars/new')} className="gap-2 font-montserrat text-sm">
          <Plus size={15} /> Add Car
        </Button>
      </div>

      {/* Tabs — scrollable on mobile */}
      <div className="overflow-x-auto">
        <Tabs value={destination} onValueChange={(v) => setDestination(v as Destination)}>
          <TabsList
            className="w-full sm:w-auto"
            style={isDark ? { background: '#0F1E3D', border: '1px solid #1E3A6B' } : {}}
          >
            <TabsTrigger
              value="all"
              className="font-montserrat text-xs sm:text-sm flex-1 sm:flex-none"
              style={isDark ? { color: '#93C5FD' } : {}}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="sriLanka"
              className="font-montserrat text-xs sm:text-sm flex-1 sm:flex-none"
              style={isDark ? { color: '#93C5FD' } : {}}
            >
              🇱🇰 Sri Lanka
            </TabsTrigger>
            <TabsTrigger
              value="maldives"
              className="font-montserrat text-xs sm:text-sm flex-1 sm:flex-none"
              style={isDark ? { color: '#93C5FD' } : {}}
            >
              🇲🇻 Maldives
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <AdminDataTable
        columns={columns as TableColumn<Record<string, unknown>>[]}
        data={cars as unknown as Record<string, unknown>[]}
        isLoading={isLoading}
        isDark={isDark}
        emptyMessage="No cars found. Click 'Add Car' to add one."
      />

      <ConfirmDeleteDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
        description="This will permanently delete the car."
      />
    </div>
  );
}