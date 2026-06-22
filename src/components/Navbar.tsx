'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Bird } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/produk', label: 'Produk' },
  { href: '/blog', label: 'Blog' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/kontak', label: 'Kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-farm-green/10 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-farm-green to-farm-green-dark text-white shadow-sm">
              <Bird className="h-5 w-5" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-farm-stone group-hover:text-farm-green-dark transition-colors">
                Jaya Abadi
              </span>
              <span className="block text-[10px] font-medium text-farm-stone-light -mt-1">
                Poultry
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-farm-stone rounded-lg hover:text-farm-green-dark transition-colors after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-farm-green after:scale-x-0 after:transition-transform hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-farm-stone hover:bg-farm-green-pale"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-farm-green/10',
          isOpen ? 'max-h-64' : 'max-h-0',
        )}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-farm-stone rounded-lg hover:bg-farm-green-pale hover:text-farm-green-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
