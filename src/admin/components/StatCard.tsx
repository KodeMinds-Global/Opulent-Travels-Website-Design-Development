import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  accentClass: string;
  bgClass: string;
  borderColor?: string;
  subtitle?: string;
  isDark?: boolean;
}

export function StatCard({ title, value, icon: Icon, accentClass, bgClass, borderColor, subtitle, isDark }: StatCardProps) {
  const cardBg = isDark ? '#112240' : '#FFFFFF';
  const cardBorder = isDark ? '#1E3A6B' : '#DBEAFE';
  const titleColor = isDark ? '#93C5FD' : '#64748B';
  const subtitleColor = isDark ? '#4A6080' : '#94A3B8';
  const iconBg = isDark ? 'rgba(30,58,107,0.5)' : undefined;

  return (
    <div
      className="rounded-xl p-5 transition-shadow duration-200 hover:shadow-lg"
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderTop: `3px solid ${borderColor ?? '#3B82F6'}`,
        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(27,58,107,0.07)',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p
            className="font-montserrat text-xs uppercase tracking-wider mb-1 truncate"
            style={{ color: titleColor }}
          >
            {title}
          </p>
          <p className={`font-playfair text-3xl font-bold ${accentClass}`}>{value}</p>
          {subtitle && (
            <p className="font-lora text-xs mt-1" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={`p-3 rounded-xl flex-shrink-0 ml-3 ${!isDark ? bgClass : ''}`}
          style={isDark ? { background: iconBg } : {}}
        >
          <Icon className={`w-6 h-6 ${accentClass}`} />
        </div>
      </div>
    </div>
  );
}