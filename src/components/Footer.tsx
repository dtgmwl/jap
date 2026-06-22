import Link from 'next/link';
import { Bird, MapPin, Phone, Clock } from 'lucide-react';
import { getCompanyInfo } from '@/lib/dataReader';

export default function Footer() {
  const company = getCompanyInfo();

  return (
    <footer className="bg-gradient-to-b from-farm-stone to-[#292524] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-farm-green text-white">
                <Bird className="h-5 w-5" />
              </div>
              <div>
                <span className="font-heading text-lg font-bold text-white group-hover:text-farm-green-light transition-colors">
                  Jaya Abadi
                </span>
                <span className="block text-[10px] font-medium text-gray-400 -mt-1">
                  Poultry
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Supplier bibit unggas, telur, karkas, dan daging frozen premium untuk peternak di seluruh Indonesia sejak 2018.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-white font-semibold mb-5 text-sm tracking-wider uppercase">
              Navigasi
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/produk', label: 'Produk' },
                { href: '/blog', label: 'Blog' },
                { href: '/tentang', label: 'Tentang Kami' },
                { href: '/kontak', label: 'Kontak' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-farm-green-light transition-colors flex items-center gap-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-farm-green-light/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-white font-semibold mb-5 text-sm tracking-wider uppercase">
              Kontak
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-farm-green-light" />
                <span className="text-gray-400">{company.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-farm-green-light" />
                <a href={`tel:${company.phone}`} className="text-gray-400 hover:text-farm-green-light transition-colors">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-farm-green-light" />
                <span className="text-gray-400">{company.operationalHours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-white font-semibold mb-5 text-sm tracking-wider uppercase">
              Jam Operasional
            </h3>
            <div className="rounded-lg bg-white/5 p-4 border border-white/10">
              <p className="text-sm text-gray-300">{company.operationalHours}</p>
              <p className="text-xs text-gray-500 mt-2">
                *Pemesanan di luar jam kerja dapat dilayani via WhatsApp
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Dibuat dengan ❤️ untuk peternak Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
