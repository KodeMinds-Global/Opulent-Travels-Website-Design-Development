import { Badge } from '@/components/ui/badge';

interface DestinationBadgeProps {
  destination: 'sriLanka' | 'maldives';
}

export function DestinationBadge({ destination }: DestinationBadgeProps) {
  if (destination === 'sriLanka') {
    return (
      <Badge variant="outline" className="text-teal-600 border-teal-300 bg-teal-50 font-montserrat text-xs">
        🇱🇰 Sri Lanka
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50 font-montserrat text-xs">
      🇲🇻 Maldives
    </Badge>
  );
}