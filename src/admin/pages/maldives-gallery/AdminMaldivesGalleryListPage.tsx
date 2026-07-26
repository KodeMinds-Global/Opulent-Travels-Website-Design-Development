import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Pencil, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAdminMaldivesGallery, useReorderMaldivesGallery } from '../../hooks/useAdminMaldivesGallery';
import { useAdminTheme } from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getImageUrl } from '../../api/axios';
import type { MaldivesGalleryItem } from '../../types/maldives-gallery';

interface SortableRowProps {
  row: MaldivesGalleryItem;
  isDark: boolean;
  navigate: (path: string) => void;
}

function SortableRow({ row, isDark, navigate }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging
      ? (isDark ? '#162035' : '#F0F6FF')
      : 'transparent',
    boxShadow: isDragging ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
    opacity: isDragging ? 0.95 : 1,
    zIndex: isDragging ? 10 : 'auto',
    borderBottom: `1px solid ${isDark ? '#1E3A6B' : '#EFF6FF'}`,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td
        className="p-3 w-8"
        style={{ cursor: isDragging ? 'grabbing' : 'grab', color: isDark ? '#64748B' : '#94A3B8' }}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
      </td>

      <td className="p-3 w-16">
        <span className="font-bold text-sm" style={{ color: isDark ? '#64748B' : '#6B7280' }}>
          #{row.order}
        </span>
      </td>

      <td className="p-3 w-20">
        {row.imageUrl ? (
          <img
            src={getImageUrl(row.imageUrl)}
            alt={row.title}
            className="w-12 h-10 object-cover rounded-md"
          />
        ) : (
          <div
            className="w-12 h-10 rounded-md flex items-center justify-center text-xs"
            style={{ background: isDark ? '#1E3A6B' : '#F1F5F9', color: isDark ? '#64748B' : '#94A3B8' }}
          >
            No img
          </div>
        )}
      </td>

      <td className="p-3">
        <span className="font-medium text-sm" style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}>
          {row.title}
        </span>
      </td>

      <td className="p-3">
        <span className="text-sm" style={{ color: isDark ? '#94A3B8' : '#64748B' }}>
          {(() => {
            const desc = String(row.description ?? '');
            return `${desc.slice(0, 60)}${desc.length > 60 ? '...' : ''}`;
          })()}
        </span>
      </td>

      <td className="p-3 w-24">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/admin/maldives-gallery/${row.id}/edit`)}
          className="gap-1 px-2 text-xs"
          style={isDark ? { borderColor: '#1E3A6B', color: '#93C5FD', background: 'transparent' } : {}}
        >
          <Pencil size={11} /> Edit
        </Button>
      </td>
    </tr>
  );
}

export function AdminMaldivesGalleryListPage() {
  const navigate = useNavigate();
  const { isDark } = useAdminTheme();

  const { data: items = [], isLoading } = useAdminMaldivesGallery();
  const reorderMutation = useReorderMaldivesGallery();

  const [localItems, setLocalItems] = useState<MaldivesGalleryItem[]>([]);

  useEffect(() => {
    if (items.length > 0) {
      setLocalItems([...items].sort((a, b) => a.order - b.order));
    }
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localItems.findIndex(item => item.id === active.id);
    const newIndex = localItems.findIndex(item => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(localItems, oldIndex, newIndex);
      setLocalItems(newItems);
      try {
        await reorderMutation.mutateAsync(newItems.map(item => item.id));
        toast.success('Order updated');
      } catch {
        toast.error('Failed to update order');
        setLocalItems(localItems);
      }
    }
  };

  const headingColor = isDark ? '#BFDBFE' : '#1B3A6B';
  const tableWrapperStyle = {
    border: `1px solid ${isDark ? '#1E3A6B' : '#DBEAFE'}`,
    boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.15)' : '0 2px 8px rgba(27,58,107,0.07)',
  };
  const headerStyle = {
    background: isDark
      ? 'linear-gradient(90deg, #0F1E3D 0%, #1E3A6B 100%)'
      : 'linear-gradient(90deg, #1B3A6B 0%, #2563EB 100%)',
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="font-playfair text-xl sm:text-2xl font-bold" style={{ color: headingColor }}>Maldives Gallery</h2>
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-playfair text-xl sm:text-2xl font-bold" style={{ color: headingColor }}>Maldives Gallery</h2>

      {localItems.length === 0 ? (
        <div
          className="rounded-xl p-8 text-center"
          style={{ border: `1px solid ${isDark ? '#1E3A6B' : '#DBEAFE'}`, background: isDark ? '#0F1E3D' : 'white' }}
        >
          <p style={{ color: isDark ? '#94A3B8' : '#64748B' }}>No gallery items found.</p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden" style={tableWrapperStyle}>
          <div className="overflow-x-auto">
            <table style={{ minWidth: '600px', width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={headerStyle}>
                  {['', '#', 'Image', 'Title', 'Description', 'Actions'].map((h, i) => (
                    <th
                      key={i}
                      className="font-montserrat text-xs uppercase tracking-wider text-left"
                      style={{ color: '#BFDBFE', padding: '12px 16px' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={localItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
                  <tbody style={{ background: isDark ? '#0F1E3D' : 'white' }}>
                    {localItems.map(row => (
                      <SortableRow key={row.id} row={row} isDark={isDark} navigate={navigate} />
                    ))}
                  </tbody>
                </SortableContext>
              </DndContext>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
