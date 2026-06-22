import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import type { HomepageHero } from '@/types';
import Reveal from './Reveal';

interface HeroProps {
  hero: HomepageHero;
}

export default function Hero({ hero }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-farm-green-dark to-farm-green">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/farm/placeholder-1.svg"
          alt="Peternakan Unggas Jaya Abadi Poultry"
          fill
          className="object-cover"
          priority
          loading="eager"
          sizes="100vw"
        />
      </div>

      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-farm-green-light/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-40">
        <div className="max-w-2xl">
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white/90 mb-6 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              {hero.badge}
            </div>
          </Reveal>
          <Reveal delay={250}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              {hero.title}<br />
              <span className="text-farm-accent">{hero.titleHighlight}</span>
            </h1>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
              {hero.description}
            </p>
          </Reveal>
          <Reveal delay={550}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={hero.ctaPrimary.href}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-farm-accent to-farm-accent-dark px-7 py-3.5 text-sm font-semibold text-farm-stone hover:from-farm-accent-dark hover:to-farm-accent-dark transition-all shadow-lg shadow-farm-accent/30"
              >
                {hero.ctaPrimary.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href={hero.ctaSecondary.href}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="mr-2 h-4 w-4" />
                {hero.ctaSecondary.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fafaf9] to-transparent" />
    </section>
  );
}
