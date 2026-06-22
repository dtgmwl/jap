'use client';

import { MessageCircle } from 'lucide-react';
import { formatWhatsAppUrl } from '@/lib/utils';

interface WhatsAppButtonProps {
  phone: string;
  name: string;
}

export default function WhatsAppButton({ phone, name }: WhatsAppButtonProps) {
  const waUrl = formatWhatsAppUrl(
    phone,
    `Halo ${name}, saya ingin bertanya lebih lanjut mengenai produk unggas yang tersedia.`,
  );

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-farm-accent to-farm-accent-dark text-farm-stone shadow-lg transition-all hover:from-farm-accent-dark hover:to-farm-accent-dark hover:scale-110 animate-pulse"
      aria-label="Hubungi via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
