import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Star, Loader2 } from 'lucide-react';
import { useAdminPackages, useDeletePackage } from '../../hooks/useAdminPackages';
import { ConfirmDeleteDialog } from '../../components/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
import type { AdminPackage } from '../../types/admin-package';
import { getImageUrl } from '../../api/axios';
import { useAdminTheme } from '../../components/AdminLayout';

export function AdminMaldivesPackagesListPage() {
  const navigate = useNavigate();
  const { isDark } = useAdminTheme();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: packages = [], isLoading } = useAdminPackages('maldives');
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
  const cardBg = isDark ? '#0F1E3D' : 'white';
  const borderColor = isDark ? '#1E3A6B' : '#DBEAFE';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-playfair text-2xl font-bold" style={{ color: headingColor }}>
          Maldives Packages
        </h2>
        <Button onClick={() => navigate('/admin/packages/maldives/new')} className="gap-2">
          <Plus size={16} /> Add Package
        </Button>
      </div>

      {/* All Packages Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${borderColor}`, boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 8px rgba(27,58,107,0.07)' }}>
        <div className="overflow-x-auto">
          <table style={{ minWidth: '600px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: isDark ? 'linear-gradient(90deg, #0F1E3D 0%, #1E3A6B 100%)' : 'linear-gradient(90deg, #1B3A6B 0%, #2563EB 100%)' }}>
                {['Image', 'Resort', 'Rating', 'Featured', 'Actions'].map(h => (
                  <th key={h} className="font-montserrat text-xs uppercase tracking-wider text-left" style={{ color: '#BFDBFE', padding: '12px 16px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ background: cardBg }}>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center p-8"><Loader2 className="animate-spin mx-auto" size={20} /></td></tr>
              ) : packages.length === 0 ? (
                <tr><td colSpan={5} className="text-center p-8 text-sm font-montserrat" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>No packages found.</td></tr>
              ) : packages.map((row, i) => (
                <tr key={row._id} style={{ borderBottom: `1px solid ${borderColor}`, background: i % 2 === 0 ? 'transparent' : (isDark ? 'rgba(30,58,107,0.1)' : 'rgba(219,234,254,0.2)') }}>
                  <td className="p-3">
                    {row.imageUrl
                      ? <img src={getImageUrl(row.imageUrl)} alt={row.title} className="w-12 h-10 object-cover rounded-md" />
                      : <div className="w-12 h-10 rounded-md flex items-center justify-center text-xs" style={{ background: isDark ? '#1E3A6B' : '#F1F5F9', color: isDark ? '#64748B' : '#94A3B8' }}>No img</div>}
                  </td>
                  <td className="p-3">
                    <span className="font-medium text-sm" style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>{row.resortName || row.title}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= (row.resortRating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}
                    </div>
                  </td>
                  <td className="p-3">
                    {row.featured
                      ? <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600"><Star size={11} className="fill-yellow-400 text-yellow-400" /> Yes</span>
                      : <span className="text-xs" style={{ color: isDark ? '#64748B' : '#94A3B8' }}>– No</span>}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/admin/packages/maldives/${row._id}/edit`)} className="gap-1 px-2 text-xs" style={isDark ? { borderColor: '#1E3A6B', color: '#93C5FD', background: 'transparent' } : {}}>
                        <Pencil size={11} /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => setDeleteId(row._id)} className="gap-1 px-2 text-xs">
                        <Trash2 size={11} /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDeleteDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
        description="This will permanently delete the Maldives package."
      />
    </div>
  );
}