import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, User, MessageCircle, Tag } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { getBlogArticleBySlug, getAllBlogArticles, getCompanyInfo } from '@/lib/dataReader';
import { formatWhatsAppUrl } from '@/lib/utils';

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = getAllBlogArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.image }],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) notFound();

  const company = getCompanyInfo();
  const waUrl = formatWhatsAppUrl(
    company.phone,
    `Halo ${company.name}, saya mau konsultasi gratis mengenai kebutuhan produk peternakan.`,
  );

  function renderContent(content: string) {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        if (inList) {
          elements.push(
            <ol key={`list-${i}`} className="my-4 space-y-2 list-decimal list-inside text-farm-stone">
              {listItems.map((item, j) => (
                <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>,
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <h2 key={i} className="font-heading text-xl font-bold text-farm-stone mt-10 mb-4">
            {line.replace('## ', '')}
          </h2>,
        );
      } else if (line.match(/^\d+\.\s/)) {
        inList = true;
        listItems.push(line);
      } else if (line.startsWith('- ')) {
        // skip individual list items (handled by ordered list)
      } else if (line.trim() === '') {
        if (inList) {
          elements.push(
            <ol key={`list-${i}`} className="my-4 space-y-2 list-decimal list-inside text-farm-stone">
              {listItems.map((item, j) => (
                <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>,
          );
          listItems = [];
          inList = false;
        }
      } else {
        if (inList) {
          elements.push(
            <ol key={`list-${i}`} className="my-4 space-y-2 list-decimal list-inside text-farm-stone">
              {listItems.map((item, j) => (
                <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>,
          );
          listItems = [];
          inList = false;
        }
        elements.push(
          <p key={i} className="text-farm-stone leading-relaxed mb-4">
            {line}
          </p>,
        );
      }
    }

    if (inList) {
      elements.push(
        <ol key="list-final" className="my-4 space-y-2 list-decimal list-inside text-farm-stone">
          {listItems.map((item, j) => (
            <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
          ))}
        </ol>,
      );
    }

    return elements;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-farm-stone-light hover:text-farm-green mb-8 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Blog
      </Link>

      <article>
        <Reveal>
        <header>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-farm-stone leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-farm-stone-light">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {article.author}
            </span>
          </div>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Tag className="h-3.5 w-3.5 text-farm-stone-light" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-farm-green-pale px-3 py-1 text-xs font-semibold text-farm-green-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        </Reveal>

        <Reveal delay={150}>
        {article.image && (
          <div className="relative aspect-[16/9] mt-8 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <div className="mt-10">
          {renderContent(article.content)}
        </div>
        </Reveal>
      </article>

      <Reveal delay={300}>
      <section className="mt-14 rounded-2xl bg-gradient-to-br from-farm-green to-farm-green-dark p-8 sm:p-10 text-center shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
        <div className="relative">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Mau Memulai Peternakan Unggas Sendiri?
          </h2>
          <p className="mt-3 text-white/80 text-lg">
            Konsultasikan kebutuhan bibit Anda gratis via WhatsApp!
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-farm-accent to-farm-accent-dark px-8 py-4 text-base font-bold text-farm-stone hover:from-farm-accent-dark hover:to-farm-accent-dark transition-all shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            Konsultasi Gratis
          </a>
        </div>
      </section>
      </Reveal>
    </div>
  );
}
