import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAdminTestimonials, useDeleteTestimonial } from '../../hooks/useAdminTestimonials';
import { AdminDataTable, type TableColumn } from '../../components/AdminDataTable';
import { ConfirmDeleteDialog } from '../../components/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
import { useAdminTheme } from '../../components/AdminLayout';
import type { AdminTestimonial } from '../../types/testimonial';

export function AdminTestimonialsListPage() {
  const navigate = useNavigate();
  const { isDark } = useAdminTheme();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: testimonials = [], isLoading } = useAdminTestimonials();
  const deleteMutation = useDeleteTestimonial();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Testimonial deleted successfully');
    } catch {
      toast.error('Failed to delete testimonial');
    } finally {
      setDeleteId(null);
    }
  };

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';

  const columns: TableColumn<AdminTestimonial>[] = [
    {
      key: 'name',
      header: 'Client',
      render: (row) => (
        <div>
          <p className="font-medium text-sm">{row.name as string}</p>
          <p className="text-xs text-gray-500">{row.location as string}</p>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (row) => (
        <span className="text-sm font-montserrat">{row.date as string}</span>
      ),
    },
    {
      key: 'text',
      header: 'Review',
      render: (row) => {
        const t = row.text as string;
        return <span className="text-sm">{t.length > 70 ? t.slice(0, 70) + '...' : t}</span>;
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/testimonials/${row._id}/edit`)}
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-playfair text-xl sm:text-2xl font-bold" style={{ color: headingColor }}>
          Testimonials
        </h2>
        <Button onClick={() => navigate('/admin/testimonials/new')} className="gap-2 font-montserrat text-sm">
          <Plus size={15} /> Add Testimonial
        </Button>
      </div>

      <AdminDataTable
        columns={columns as TableColumn<Record<string, unknown>>[]}
        data={testimonials as unknown as Record<string, unknown>[]}
        isLoading={isLoading}
        isDark={isDark}
        emptyMessage="No testimonials found. Click 'Add Testimonial' to add one."
      />

      <ConfirmDeleteDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
        description="This will permanently delete the testimonial."
      />
    </div>
  );
}
