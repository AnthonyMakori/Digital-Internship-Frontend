import type { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: { value: number; label: string };
  variant?: 'default' | 'primary' | 'accent';
}

const variantStyles = {
  default: 'stat-card',
  primary: 'stat-card border-primary/20 bg-primary/5',
  accent: 'stat-card border-accent/20 bg-accent/5',
};

const iconVariants = {
  default: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
};

export function DashboardCard({ title, value, icon: Icon, description, trend, variant = 'default' }: DashboardCardProps) {
  return (
    <div className={`${variantStyles[variant]} animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {trend && (
            <p className={`text-xs font-medium ${trend.value >= 0 ? 'text-success' : 'text-destructive'}`}>
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        <div className={`rounded-lg p-2.5 ${iconVariants[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
