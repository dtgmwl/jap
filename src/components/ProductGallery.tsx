'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductMedia } from '@/types';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  media: ProductMedia[];
  productName: string;
}

export default function ProductGallery({ media, productName }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = media[currentIndex];

  const goTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, media.length - 1)));
  };

  if (!media.length) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-farm-green-pale text-farm-stone-light shadow-xl">
        No Image
      </div>
    );
  }

  return (
    <div>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-farm-green-pale shadow-xl">
        {current.type === 'video' ? (
          <video
            src={current.url}
            poster={current.thumbnail}
            controls
            className="h-full w-full object-cover"
            muted
            autoPlay
            loop
            playsInline
          />
        ) : (
          <Image
            src={current.url}
            alt={`${productName} - Gambar ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}

        {media.length > 1 && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={() => goTo(currentIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
                aria-label="Previous media"
              >
                <ChevronLeft className="h-5 w-5 text-farm-stone" />
              </button>
            )}
            {currentIndex < media.length - 1 && (
              <button
                onClick={() => goTo(currentIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
                aria-label="Next media"
              >
                <ChevronRight className="h-5 w-5 text-farm-stone" />
              </button>
            )}
          </>
        )}

        <div className="absolute bottom-3 right-3">
          <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            {currentIndex + 1} / {media.length}
          </span>
        </div>
      </div>

      {media.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {media.map((item, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={cn(
                'relative shrink-0 h-20 w-20 overflow-hidden rounded-xl border-2 transition-all cursor-pointer',
                idx === currentIndex
                  ? 'border-farm-green ring-2 ring-farm-green/30'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              {item.type === 'video' ? (
                <div className="relative h-full w-full">
                  <Image
                    src={item.thumbnail || item.url}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="h-5 w-5 text-white drop-shadow-lg" />
                  </div>
                </div>
              ) : (
                <Image
                  src={item.url}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
