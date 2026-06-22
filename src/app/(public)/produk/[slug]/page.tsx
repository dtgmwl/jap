import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, MessageCircle, Package, Ruler, Syringe, Wheat, CheckCircle } from 'lucide-react';
import Badge from '@/components/ui/badge';
import ProductGallery from '@/components/ProductGallery';
import Reveal from '@/components/Reveal';
import { getProductBySlug, getAllProducts, getCompanyInfo } from '@/lib/dataReader';
import { formatRupiah, formatWhatsAppUrl } from '@/lib/utils';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.description} Minimal order ${product.moq} ekor. Hubungi kami untuk harga terbaru.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.media[0]?.url }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const company = getCompanyInfo();
  const waUrl = formatWhatsAppUrl(
    company.phone,
    `Halo ${company.name}, saya tertarik dan ingin bertanya lebih lanjut mengenai produk ${product.name} dengan harga Rp ${product.priceMin.toLocaleString('id-ID')} - ${product.priceMax.toLocaleString('id-ID')}.`,
  );

  const specs = [
    { label: 'Umur', value: product.specifications.age, icon: Ruler },
    { label: 'Mortalitas', value: product.specifications.mortalityRate, icon: Package },
    { label: 'Vaksinasi', value: product.specifications.vaccination, icon: Syringe },
    { label: 'Jenis Pakan', value: product.specifications.feedType, icon: Wheat },
  ];

  const benefits = [
    'Vaksinasi lengkap sesuai standar',
    'Bibit sehat dan berkualitas',
    'Pengiriman aman & bergaransi',
    'Konsultasi gratis via WhatsApp',
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/produk"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-farm-stone-light hover:text-farm-green mb-8 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Produk
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal direction="left">
          <ProductGallery media={product.media} productName={product.name} />
        </Reveal>

        <Reveal direction="right" delay={150}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-farm-green-pale px-3 py-1 text-xs font-semibold text-farm-green-dark">
                {product.category === 'ayam' ? 'Ayam' : product.category === 'itik' ? 'Itik' : product.category === 'angsa' ? 'Angsa' : product.category === 'entok' ? 'Entok' : 'Lainnya'}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-farm-stone mt-3 leading-tight">
                {product.name}
              </h1>
            </div>
            <Badge variant={product.stock} />
          </div>

          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-farm-warm to-white border border-farm-green/10">
            <p className="text-xs text-farm-stone-light font-semibold uppercase tracking-wider">Harga</p>
            <p className="font-heading text-3xl font-bold text-farm-green-dark mt-1">
              {formatRupiah(product.priceMin)}
              {product.priceMax > product.priceMin && (
                <span className="text-xl font-normal text-farm-stone-light ml-1">
                  — {formatRupiah(product.priceMax)}
                </span>
              )}
            </p>
            <p className="text-sm text-farm-stone-light mt-1">Min. Order: {product.moq} ekor</p>
          </div>

          <p className="mt-6 text-farm-stone leading-relaxed">{product.description}</p>

          <Reveal delay={300}>
          <div className="mt-8">
            <h2 className="font-heading text-lg font-bold text-farm-stone mb-4">Spesifikasi Produk</h2>
            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-start gap-3 rounded-xl bg-farm-warm p-4 border border-farm-green/5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-farm-green-pale text-farm-green">
                    <spec.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-farm-stone-light">{spec.label}</p>
                    <p className="text-sm font-semibold text-farm-stone">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </Reveal>

          <Reveal delay={450}>
          <div className="mt-8">
            <h2 className="font-heading text-lg font-bold text-farm-stone mb-4">Mengapa Produk Ini?</h2>
            <ul className="space-y-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-farm-stone">
                  <CheckCircle className="h-4 w-4 text-farm-green shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          </Reveal>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-farm-accent to-farm-accent-dark px-6 py-4 text-base font-bold text-farm-stone hover:from-farm-accent-dark hover:to-farm-accent-dark transition-all shadow-lg shadow-farm-accent/20 sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            Beli via WhatsApp
          </a>
        </Reveal>
      </div>
    </div>
  );
}
