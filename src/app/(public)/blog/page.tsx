import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { getAllBlogArticles } from '@/lib/dataReader';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artikel edukasi seputar peternakan unggas, tips beternak, dan panduan lengkap budidaya ayam, itik, dan angsa.',
};

export default function BlogPage() {
  const articles = getAllBlogArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-12">
          <span className="text-sm font-semibold text-farm-green uppercase tracking-widest">Edukasi</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-farm-stone mt-2">
            Blog Peternakan
          </h1>
          <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-farm-green to-farm-green-light" />
          <p className="mt-4 text-farm-stone-light max-w-xl">
            Artikel edukasi dan panduan lengkap seputar peternakan unggas, tips beternak, dan budidaya.
          </p>
        </div>
      </Reveal>

      {articles.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="mx-auto h-12 w-12 text-farm-stone-light/50" />
          <p className="mt-4 text-farm-stone-light">Belum ada artikel blog.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 100}>
              <Link
                href={`/blog/${article.slug}`}
                className="group rounded-2xl border border-farm-green/10 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
              <div className="relative aspect-[16/9] overflow-hidden bg-farm-green-pale">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-farm-stone-light">
                    No Image
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-farm-stone-light mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.publishedAt}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {article.author}
                  </span>
                </div>
                <h2 className="font-heading text-base font-bold text-farm-stone line-clamp-2 group-hover:text-farm-green-dark transition-colors">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-farm-stone-light line-clamp-2 leading-relaxed">{article.summary}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-bold text-farm-green group-hover:gap-2.5 transition-all">
                  Baca Selengkapnya
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
