import { useState } from 'react';
import { toast } from 'sonner';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { useAdminEnquiries, useMarkEnquiryRead, useMarkEnquiryUnread, useDeleteEnquiry } from '../../hooks/useAdminEnquiries';
import { ConfirmDeleteDialog } from '../../components/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
import { useAdminTheme } from '../../components/AdminLayout';
import type { AdminEnquiry } from '../../types/enquiry';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function AdminEnquiriesPage() {
  const { isDark } = useAdminTheme();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data: enquiries = [], isLoading } = useAdminEnquiries();
  const markReadMutation = useMarkEnquiryRead();
  const markUnreadMutation = useMarkEnquiryUnread();
  const deleteMutation = useDeleteEnquiry();

  const unreadCount = enquiries.filter(e => !e.read).length;

  const handleToggleRead = async (enquiry: AdminEnquiry) => {
    try {
      if (enquiry.read) {
        await markUnreadMutation.mutateAsync(enquiry._id);
      } else {
        await markReadMutation.mutateAsync(enquiry._id);
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Enquiry deleted');
    } catch {
      toast.error('Failed to delete enquiry');
    } finally {
      setDeleteId(null);
    }
  };

  const handleRowClick = async (enquiry: AdminEnquiry) => {
    setExpanded(prev => prev === enquiry._id ? null : enquiry._id);
    // Auto mark as read when opened
    if (!enquiry.read) {
      try { await markReadMutation.mutateAsync(enquiry._id); } catch { /* silent */ }
    }
  };

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';
  const cardBg = isDark ? '#0F1E3D' : 'white';
  const borderColor = isDark ? '#1E3A6B' : '#DBEAFE';
  const textPrimary = isDark ? '#E2E8F0' : '#1E293B';
  const textSecondary = isDark ? '#94A3B8' : '#64748B';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-playfair text-xl sm:text-2xl font-bold" style={{ color: headingColor }}>
            Enquiries
          </h2>
          {unreadCount > 0 && (
            <p className="text-xs font-montserrat mt-0.5" style={{ color: isDark ? '#93C5FD' : '#2563EB' }}>
              {unreadCount} unread
            </p>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${borderColor}`, boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 8px rgba(27,58,107,0.07)' }}>
        <div className="overflow-x-auto">
          <table style={{ minWidth: '700px', width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: isDark ? 'linear-gradient(90deg, #0F1E3D 0%, #1E3A6B 100%)' : 'linear-gradient(90deg, #1B3A6B 0%, #2563EB 100%)' }}>
                {['Status', 'Name', 'Email', 'Phone', 'Date', 'Actions'].map(h => (
                  <th key={h} className="font-montserrat text-xs uppercase tracking-wider text-left" style={{ color: '#BFDBFE', padding: '12px 16px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody style={{ background: cardBg }}>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center p-8" style={{ color: textSecondary }}>Loading...</td></tr>
              ) : enquiries.length === 0 ? (
                <tr><td colSpan={6} className="text-center p-8 text-sm font-montserrat" style={{ color: textSecondary }}>No enquiries yet.</td></tr>
              ) : enquiries.map((row, i) => (
                <>
                  <tr
                    key={row._id}
                    style={{
                      borderBottom: expanded === row._id ? 'none' : `1px solid ${borderColor}`,
                      background: !row.read
                        ? (isDark ? 'rgba(59,130,246,0.08)' : 'rgba(219,234,254,0.4)')
                        : (i % 2 === 0 ? 'transparent' : (isDark ? 'rgba(30,58,107,0.08)' : 'rgba(219,234,254,0.1)')),
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRowClick(row)}
                  >
                    {/* Status */}
                    <td className="p-3 w-10">
                      {row.read
                        ? <MailOpen size={16} style={{ color: textSecondary }} />
                        : <Mail size={16} style={{ color: isDark ? '#60A5FA' : '#2563EB' }} />}
                    </td>
                    {/* Name */}
                    <td className="p-3">
                      <span className={`text-sm ${!row.read ? 'font-semibold' : ''}`} style={{ color: textPrimary }}>
                        {row.name}
                      </span>
                    </td>
                    {/* Email */}
                    <td className="p-3">
                      <span className="text-sm" style={{ color: textSecondary }}>{row.email}</span>
                    </td>
                    {/* Phone */}
                    <td className="p-3">
                      <span className="text-sm" style={{ color: textSecondary }}>{row.phone || '—'}</span>
                    </td>
                    {/* Date */}
                    <td className="p-3 whitespace-nowrap">
                      <span className="text-xs font-montserrat" style={{ color: textSecondary }}>{formatDate(row.createdAt)}</span>
                    </td>
                    {/* Actions */}
                    <td className="p-3" onClick={e => e.stopPropagation()}>
                      <div className="flex gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleRead(row)}
                          className="gap-1 px-2 text-xs"
                          style={isDark ? { borderColor: '#1E3A6B', color: '#93C5FD', background: 'transparent' } : {}}
                          title={row.read ? 'Mark as unread' : 'Mark as read'}
                        >
                          {row.read ? <Mail size={11} /> : <MailOpen size={11} />}
                          {row.read ? 'Unread' : 'Read'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(row._id)}
                          className="gap-1 px-2 text-xs"
                        >
                          <Trash2 size={11} /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {/* Expanded message row */}
                  {expanded === row._id && (
                    <tr key={`${row._id}-expanded`} style={{ borderBottom: `1px solid ${borderColor}` }}>
                      <td colSpan={6} style={{ background: isDark ? 'rgba(15,30,61,0.8)' : '#F8FAFF', padding: '12px 20px 16px 48px' }}>
                        <p className="font-montserrat text-xs uppercase tracking-wider mb-1" style={{ color: textSecondary }}>Message</p>
                        <p className="font-lora text-sm leading-relaxed" style={{ color: textPrimary }}>{row.message}</p>
                      </td>
                    </tr>
                  )}
                </>
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
        description="This will permanently delete the enquiry."
      />
    </div>
  );
}
