import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Eye, Play } from 'lucide-react';
import { Product } from '@/types';
import { formatRupiah, formatWhatsAppUrl } from '@/lib/utils';
import { CompanyInfo } from '@/types';
import Badge from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  company: CompanyInfo;
}

const categoryLabels: Record<string, string> = {
  ayam: 'Ayam',
  itik: 'Itik',
  angsa: 'Angsa',
  entok: 'Entok',
  lainnya: 'Lainnya',
};

export default function ProductCard({ product, company }: ProductCardProps) {
  const waUrl = formatWhatsAppUrl(
    company.phone,
    `Halo ${company.name}, saya tertarik dan ingin bertanya lebih lanjut mengenai produk ${product.name} dengan harga Rp ${product.priceMin.toLocaleString('id-ID')} - ${product.priceMax.toLocaleString('id-ID')}.`,
  );

  return (
    <div className="group rounded-2xl border border-farm-green/10 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-farm-green-pale">
        {product.media[0] ? (
          <div className="relative h-full w-full">
            <Image
              src={product.media[0].thumbnail || product.media[0].url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {product.media[0].type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <Play className="h-6 w-6 text-farm-stone ml-0.5" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-farm-stone-light">
            No Image
          </div>
        )}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant={product.stock} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-farm-green-dark shadow-sm">
            {categoryLabels[product.category]}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-heading text-base font-bold text-farm-stone line-clamp-2 min-h-[2.5rem] group-hover:text-farm-green-dark transition-colors">
          {product.name}
        </h3>

        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-heading text-xl font-bold text-farm-green-dark">
            {formatRupiah(product.priceMin)}
          </span>
          {product.priceMax > product.priceMin && (
            <span className="text-sm text-farm-stone-light">
              — {formatRupiah(product.priceMax)}
            </span>
          )}
        </div>
        <p className="text-xs text-farm-stone-light mt-1">
          Min. Order: {product.moq} ekor
        </p>

        <p className="mt-3 text-sm text-farm-stone-light line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-5 flex gap-2.5">
          <Link
            href={`/produk/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-farm-green/20 px-4 py-2.5 text-xs font-bold text-farm-stone hover:bg-farm-green-pale hover:border-farm-green/30 transition-all"
          >
            <Eye className="h-4 w-4" />
            Detail
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-farm-accent to-farm-accent-dark px-4 py-2.5 text-xs font-bold text-farm-stone hover:from-farm-accent-dark hover:to-farm-accent-dark transition-all shadow-md shadow-farm-accent/20"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
