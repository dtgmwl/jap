import Link from 'next/link';
import { Shield, Truck, BadgePercent, ArrowRight, ChevronRight, Sprout, ArrowUpWideNarrow } from 'lucide-react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import { getCompanyInfo, getAllProducts, getHomepageData } from '@/lib/dataReader';

export const revalidate = 3600;

const valueIcons = [Shield, Truck, BadgePercent];

export default function HomePage() {
  const company = getCompanyInfo();
  const products = getAllProducts().slice(0, 3);
  const homepage = getHomepageData();

  return (
    <>
      <Hero hero={homepage.hero} />

      <Reveal>
        <section className="relative -mt-16 z-10 pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {company.stats && company.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white p-6 text-center shadow-lg shadow-black/5 border border-farm-green/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-farm-green-pale text-farm-green mb-3">
                    {i === 0 ? <Sprout className="h-6 w-6" /> : i === 1 ? <ArrowUpWideNarrow className="h-6 w-6" /> : <Truck className="h-6 w-6" />}
                  </div>
                  <p className="font-heading text-2xl font-bold text-farm-green-dark">
                    {stat.prefix || ''}<Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-sm font-semibold text-farm-green uppercase tracking-widest">Koleksi</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-farm-stone mt-2">
                  {homepage.featuredProductsTitle}
                </h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-farm-green to-farm-green-light" />
                <p className="mt-4 text-farm-stone-light max-w-lg">
                  {homepage.featuredProductsDescription}
                </p>
              </div>
              <Link
                href="/produk"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-farm-green hover:text-farm-green-dark transition-colors group"
              >
                Lihat Semua Produk
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <Reveal key={product.id} delay={i * 150}>
                  <ProductCard product={product} company={company} />
                </Reveal>
              ))}
            </div>

            <div className="mt-10 text-center sm:hidden">
              <Link
                href="/produk"
                className="inline-flex items-center gap-2 text-sm font-semibold text-farm-green hover:text-farm-green-dark transition-colors"
              >
                Lihat Semua Produk
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-20 bg-farm-warm relative overflow-hidden">
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-farm-cream/50 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-farm-green-pale/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-farm-green uppercase tracking-widest">Keunggulan</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-farm-stone mt-2">
                Mengapa Memilih Kami?
              </h2>
              <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-farm-green to-farm-green-light" />
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {homepage.values.map((item, i) => {
                const Icon = valueIcons[i];
                return (
                  <Reveal key={item.title} delay={i * 150}>
                    <div className="group relative rounded-2xl bg-white p-8 shadow-md shadow-black/5 border border-farm-green/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-farm-green text-white text-sm font-bold shadow-lg">
                        0{i + 1}
                      </div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-farm-green-pale text-farm-green mb-5 group-hover:bg-farm-green group-hover:text-white transition-colors">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-farm-stone mb-3">{item.title}</h3>
                      <p className="text-farm-stone-light leading-relaxed">{item.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="py-20 bg-gradient-to-r from-farm-green to-farm-green-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white" />
            <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-white" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
              {homepage.ctaSection.title}
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              {homepage.ctaSection.description}
            </p>
            <Link
              href={homepage.ctaSection.buttonHref}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-farm-accent to-farm-accent-dark px-8 py-4 text-base font-bold text-farm-stone hover:from-farm-accent-dark hover:to-farm-accent-dark transition-all shadow-xl shadow-farm-accent/30"
            >
              {homepage.ctaSection.buttonLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
