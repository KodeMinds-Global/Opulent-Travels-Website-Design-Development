import { Skeleton } from '@/components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminDataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  isDark?: boolean;
}

export function AdminDataTable<T extends Record<string, unknown>>({
  columns, data, isLoading, emptyMessage = 'No records found.', isDark = false,
}: AdminDataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  const wrapperBorder = isDark ? '#1E3A6B' : '#DBEAFE';
  const wrapperShadow = isDark
    ? '0 2px 8px rgba(0,0,0,0.4)'
    : '0 2px 8px rgba(27,58,107,0.07)';
  const rowBorder = isDark ? '#1A2F50' : '#EFF6FF';
  const cellColor = isDark ? '#CBD5E1' : '#374151';
  const emptyColor = isDark ? '#4A6080' : '#94A3B8';
  const hoverBg = isDark ? '#162035' : '#F0F6FF';

  return (
    <div
      className="rounded-xl overflow-hidden w-full"
      style={{ border: `1px solid ${wrapperBorder}`, boxShadow: wrapperShadow }}
    >
      {/* horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <Table style={{ minWidth: '600px' }}>
          <TableHeader>
            <TableRow
              style={{
                background: 'linear-gradient(90deg, #1B3A6B 0%, #2563EB 100%)',
                borderBottom: 'none',
              }}
            >
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="font-montserrat text-xs uppercase tracking-wider whitespace-nowrap"
                  style={{ color: '#BFDBFE', borderBottom: 'none' }}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10 font-lora"
                  style={{ color: emptyColor }}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIdx) => (
                <TableRow
                  key={rowIdx}
                  className="transition-colors duration-150 cursor-default"
                  style={{ borderBottom: `1px solid ${rowBorder}` }}
                  onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className="font-lora text-sm whitespace-nowrap"
                      style={{ color: cellColor }}
                    >
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}