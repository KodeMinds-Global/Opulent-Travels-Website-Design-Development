import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAdminPackages, useDeletePackage } from '../../hooks/useAdminPackages';
import { AdminDataTable, type TableColumn } from '../../components/AdminDataTable';
import { ConfirmDeleteDialog } from '../../components/ConfirmDeleteDialog';
import { DestinationBadge } from '../../components/DestinationBadge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { AdminPackage } from '../../types/admin-package';

type Destination = 'all' | 'sriLanka' | 'maldives';

export function AdminPackagesListPage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: packages = [], isLoading } = useAdminPackages(
    destination === 'all' ? undefined : destination,
  );
  const deleteMutation = useDeletePackage();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Package deleted successfully');
    } catch {
      toast.error('Failed to delete package');
    } finally {
      setDeleteId(null);
    }
  };

  const columns: TableColumn<AdminPackage>[] = [
    {
      key: 'imageUrl',
      header: 'Image',
      render: (row) => (
        row.imageUrl
          ? <img src={row.imageUrl} alt={row.title} className="w-12 h-10 object-cover rounded-md" />
          : <div className="w-12 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">No img</div>
      ),
    },
    { key: 'title', header: 'Title', render: (row) => <span className="font-medium">{row.title}</span> },
    {
      key: 'destination',
      header: 'Destination',
      render: (row) => <DestinationBadge destination={row.destination} />,
    },
    { key: 'price', header: 'Price', render: (row) => `$${row.price}` },
    { key: 'duration', header: 'Duration' },
    {
      key: 'featured',
      header: 'Featured',
      render: (row) => (
        <span className={row.featured ? 'text-green-600 font-medium' : 'text-gray-400'}>
          {row.featured ? '✓ Yes' : '– No'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/packages/${row._id}/edit`)}
            className="gap-1"
          >
            <Pencil size={12} /> Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteId(row._id)}
            className="gap-1"
          >
            <Trash2 size={12} /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-playfair text-2xl font-bold text-gray-800 dark:text-white">Packages</h2>
        <Button onClick={() => navigate('/admin/packages/new')} className="gap-2">
          <Plus size={16} /> Add Package
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
        data={packages as unknown as Record<string, unknown>[]}
        isLoading={isLoading}
        emptyMessage="No packages found. Click 'Add Package' to create one."
      />

      <ConfirmDeleteDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
        description="This will permanently delete the package."
      />
    </div>
  );
}