import { STATUS_COLORS } from '@/utils/constants';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const colorMap: Record<string, string> = {
  success: 'bg-success/15 text-success border-success/20',
  warning: 'bg-warning/15 text-warning border-warning/20',
  destructive: 'bg-destructive/15 text-destructive border-destructive/20',
  info: 'bg-info/15 text-info border-info/20',
  muted: 'bg-muted text-muted-foreground border-border',
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const colorKey = STATUS_COLORS[status] || 'muted';
  const colors = colorMap[colorKey] || colorMap.muted;
  const label = status.replace(/_/g, ' ');

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${colors} ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
