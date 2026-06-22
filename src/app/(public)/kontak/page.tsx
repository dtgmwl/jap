import type { Metadata } from 'next';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { getCompanyInfo } from '@/lib/dataReader';
import { formatWhatsAppUrl } from '@/lib/utils';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi Jaya Abadi Poultry untuk pemesanan dan konsultasi bibit unggas. Tersedia layanan WhatsApp dan kunjungan langsung ke lokasi.',
};

export default function KontakPage() {
  const company = getCompanyInfo();
  const waUrl = formatWhatsAppUrl(
    company.phone,
    `Halo ${company.name}, saya ingin bertanya lebih lanjut mengenai produk yang tersedia.`,
  );

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      value: company.address,
    },
    {
      icon: Phone,
      title: 'Telepon / WhatsApp',
      value: company.phone,
      href: `tel:${company.phone}`,
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      value: company.operationalHours,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
      <div className="mb-12">
        <span className="text-sm font-semibold text-farm-green uppercase tracking-widest">Kontak</span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-farm-stone mt-2">
          Hubungi Kami
        </h1>
        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-farm-green to-farm-green-light" />
        <p className="mt-4 text-farm-stone-light">
          Silakan hubungi tim kami untuk pemesanan dan konsultasi
        </p>
      </div>
      </Reveal>

      <Reveal delay={150}>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-farm-green/10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-farm-green-pale text-farm-green">
                <item.icon className="h-7 w-7" />
              </div>
              <div className="pt-1">
                <h3 className="font-heading font-bold text-farm-stone">{item.title}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1 block text-farm-stone-light hover:text-farm-green transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 text-farm-stone-light">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-farm-accent to-farm-accent-dark px-6 py-4 text-base font-bold text-farm-stone hover:from-farm-accent-dark hover:to-farm-accent-dark transition-all shadow-lg shadow-farm-accent/20 sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            Hubungi via WhatsApp
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-farm-green/10">
          <iframe
            src={company.mapsEmbedUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Lokasi ${company.name}`}
          />
        </div>
      </div>
      </Reveal>
    </div>
  );
}
