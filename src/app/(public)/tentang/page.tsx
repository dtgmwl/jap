import Image from 'next/image';
import type { Metadata } from 'next';
import { Shield, Heart, Users, Sprout } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { getCompanyInfo } from '@/lib/dataReader';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Jaya Abadi Poultry - Mitra terpercaya peternak Indonesia sejak 2018. Menyediakan bibit unggas, telur, karkas, dan daging frozen berkualitas dengan harga transparan.',
};

export default function TentangPage() {
  const company = getCompanyInfo();

  const highlights = [
    {
      icon: Shield,
      title: 'Vaksinasi Lengkap',
      description: 'Setiap bibit unggas yang kami kirim sudah melalui program vaksinasi ketat sesuai standar peternakan modern.',
    },
    {
      icon: Heart,
      title: 'Kesejahteraan Hewan',
      description: 'Kami menerapkan standar kesejahteraan hewan yang baik dalam setiap proses penetasan dan penanganan DOC.',
    },
    {
      icon: Users,
      title: 'Tim Profesional',
      description: 'Didukung oleh tim peternak berpengalaman yang siap memberikan konsultasi dan pendampingan teknis.',
    },
    {
      icon: Sprout,
      title: 'Beragam Jenis Unggas',
      description: 'Menyediakan berbagai produk unggas mulai dari DOC ayam, itik, angsa, entok, telur, karkas, hingga daging frozen untuk kebutuhan peternakan Anda.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
      <div className="mb-12">
        <span className="text-sm font-semibold text-farm-green uppercase tracking-widest">Profil</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-farm-stone mt-2">
          Tentang {company.name}
        </h1>
        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-farm-green to-farm-green-light" />
        <p className="mt-4 text-farm-stone-light">
          Mitra terpercaya peternak Indonesia sejak 2018
        </p>
      </div>
      </Reveal>

      <Reveal delay={150}>
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/farm/placeholder-1.svg"
            alt={`${company.name} - Peternakan Unggas`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-farm-stone">Profil Perusahaan</h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-farm-green to-farm-green-light" />
          <p className="mt-6 text-farm-stone leading-relaxed">
            {company.name} adalah perusahaan peternakan unggas yang berlokasi di Sukabumi, Jawa Barat.
            Kami berkomitmen untuk menyediakan bibit unggas, telur tetas, karkas, dan daging frozen berkualitas tinggi bagi peternak di seluruh Indonesia.
          </p>
          <p className="mt-4 text-farm-stone leading-relaxed">
            Dengan pengalaman sejak 2018, kami telah melayani ribuan peternak dari berbagai skala,
            mulai dari peternak skala kecil hingga perusahaan peternakan besar. Kapasitas produksi
            mencapai 50.000+ ekor per bulan dengan jangkauan distribusi ke seluruh Pulau Jawa.
          </p>
          <p className="mt-4 text-farm-stone leading-relaxed">
            Visi kami menjadi mitra peternakan terdepan di Indonesia yang mendukung ketahanan pangan
            nasional melalui penyediaan produk peternakan unggas berkualitas.
          </p>
        </div>
      </div>
      </Reveal>

      <Reveal delay={300}>
      <div className="mt-20">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-farm-green uppercase tracking-widest">Keunggulan</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-farm-stone mt-2">
            Keunggulan Kami
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-farm-green to-farm-green-light" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-farm-green/10 bg-white p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-farm-green-pale text-farm-green mb-5 group-hover:bg-farm-green group-hover:text-white transition-colors">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-lg font-bold text-farm-stone mb-2">{item.title}</h3>
              <p className="text-sm text-farm-stone-light leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </div>
  );
}
