import type { Metadata } from 'next';
import ProductFilter from '@/components/ProductFilter';
import Reveal from '@/components/Reveal';
import { getAllProducts, getCompanyInfo } from '@/lib/dataReader';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Produk',
  description: 'Katalog lengkap produk peternakan: DOC ayam, itik, angsa, entok, telur, karkas, daging frozen, pakan, dan perlengkapan peternakan dengan harga transparan.',
};

export default function ProdukPage() {
  const products = getAllProducts();
  const company = getCompanyInfo();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-10">
          <span className="text-sm font-semibold text-farm-green uppercase tracking-widest">Katalog</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-farm-stone mt-2">
            Produk Kami
          </h1>
          <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-farm-green to-farm-green-light" />
          <p className="mt-4 text-farm-stone-light">
            Temukan produk peternakan berkualitas untuk usaha Anda
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <ProductFilter products={products} company={company} />
      </Reveal>
    </div>
  );
}
