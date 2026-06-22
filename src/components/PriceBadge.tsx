import { formatRupiah } from '@/lib/utils';

interface PriceBadgeProps {
  priceMin: number;
  priceMax: number;
  className?: string;
}

export default function PriceBadge({ priceMin, priceMax, className }: PriceBadgeProps) {
  return (
    <div className={className}>
      <span className="text-lg font-bold text-farm-green-dark">
        {formatRupiah(priceMin)}
      </span>
      {priceMax > priceMin && (
        <span className="text-sm font-normal text-gray-500">
          {' '}- {formatRupiah(priceMax)}
        </span>
      )}
    </div>
  );
}
