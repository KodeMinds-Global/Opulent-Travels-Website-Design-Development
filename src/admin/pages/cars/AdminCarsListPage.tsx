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
import type { AdminCar } from '../../types/car';

type Destination = 'all' | 'sriLanka' | 'maldives';

export function AdminCarsListPage() {
  const navigate = useNavigate();
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
    { key: 'transmission', header: 'Trans.', render: (row) => row.transmission ?? '—' },
    {
      key: 'available',
      header: 'Available',
      render: (row) => (
        <span className={row.available ? 'text-green-600 font-medium' : 'text-gray-400'}>
          {row.available ? '✓ Yes' : '– No'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/admin/cars/${row._id}/edit`)} className="gap-1">
            <Pencil size={12} /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteId(row._id)} className="gap-1">
            <Trash2 size={12} /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Rent Cars</h2>
        <Button
          onClick={() => navigate('/admin/cars/new')}
          className="gap-2"
          style={{ backgroundColor: '#1E293B', color: '#fff' }}
        >
          <Plus size={16} /> Add Car
        </Button>
      </div>

      <Tabs value={destination} onValueChange={(v) => setDestination(v as Destination)}>
        <TabsList>
          <TabsTrigger value="all" className="font-montserrat text-sm">All</TabsTrigger>
          <TabsTrigger value="sriLanka" className="font-montserrat text-sm">🇱🇰 Sri Lanka</TabsTrigger>
          <TabsTrigger value="maldives" className="font-montserrat text-sm">🇲🇻 Maldives</TabsTrigger>
        </TabsList>
      </Tabs>

      <AdminDataTable
        columns={columns as TableColumn<Record<string, unknown>>[]}
        data={cars as unknown as Record<string, unknown>[]}
        isLoading={isLoading}
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