'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types';
import type { CompanyInfo } from '@/types';
import ProductCard from '@/components/ProductCard';

const categories = [
  { key: 'semua', label: 'Semua' },
  { key: 'ayam', label: 'Ayam' },
  { key: 'itik', label: 'Itik' },
  { key: 'angsa', label: 'Angsa' },
  { key: 'entok', label: 'Entok' },
] as const;

interface ProductFilterProps {
  products: Product[];
  company: CompanyInfo;
}

export default function ProductFilter({ products, company }: ProductFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('semua');

  const filteredProducts = useMemo(
    () =>
      activeCategory === 'semua'
        ? products
        : products.filter((p) => p.category === activeCategory),
    [products, activeCategory],
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-farm-green text-white shadow-md shadow-farm-green/20'
                : 'bg-farm-warm text-farm-stone hover:bg-farm-green-pale border border-farm-green/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-farm-stone-light">Belum ada produk dalam kategori ini.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} company={company} />
          ))}
        </div>
      )}
    </>
  );
}
