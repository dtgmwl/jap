import { cn } from '@/lib/utils';

interface BadgeProps {
  variant: 'available' | 'limited' | 'out_of_stock';
  className?: string;
}

const labels: Record<BadgeProps['variant'], string> = {
  available: 'Tersedia',
  limited: 'Terbatas',
  out_of_stock: 'Habis',
};

export default function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        {
          'bg-farm-green-pale text-farm-green-dark': variant === 'available',
          'bg-farm-accent/20 text-farm-stone': variant === 'limited',
          'bg-red-100 text-red-700': variant === 'out_of_stock',
        },
        className,
      )}
    >
      {labels[variant]}
    </span>
  );
}
