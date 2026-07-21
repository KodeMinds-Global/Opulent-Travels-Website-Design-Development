import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAdminPackages, useDeletePackage } from '../../hooks/useAdminPackages';
import { AdminDataTable, type TableColumn } from '../../components/AdminDataTable';
import { ConfirmDeleteDialog } from '../../components/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
import type { AdminPackage } from '../../types/admin-package';
import { getImageUrl } from '../../api/axios';
import { useAdminTheme } from '../../components/AdminLayout';

export function AdminSriLankaPackagesListPage() {
  const navigate = useNavigate();
  const { isDark } = useAdminTheme();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: packages = [], isLoading } = useAdminPackages('sriLanka');
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

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';

  const columns: TableColumn<AdminPackage>[] = [
    {
      key: 'imageUrl',
      header: 'Image',
      render: (row) =>
        row.imageUrl
          ? <img src={getImageUrl(row.imageUrl)} alt={row.title} className="w-12 h-10 object-cover rounded-md" />
          : <div className="w-12 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">No img</div>,
    },
    { key: 'title', header: 'Title', render: (row) => <span className="font-medium">{row.title}</span> },
    { key: 'duration', header: 'Duration' },
    { key: 'price', header: 'Price', render: (row) => row.price ? `$${row.price}` : '-' },
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
          <Button variant="outline" size="sm" onClick={() => navigate(`/admin/packages/sri-lanka/${row._id}/edit`)} className="gap-1">
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
        <h2 className="font-playfair text-2xl font-bold" style={{ color: headingColor }}>
          🇱🇰 Sri Lanka Packages
        </h2>
        <Button onClick={() => navigate('/admin/packages/sri-lanka/new')} className="gap-2">
          <Plus size={16} /> Add Package
        </Button>
      </div>

      <AdminDataTable
        columns={columns as TableColumn<Record<string, unknown>>[]}
        data={packages as unknown as Record<string, unknown>[]}
        isLoading={isLoading}
        emptyMessage="No Sri Lanka packages found. Click 'Add Package' to create one."
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