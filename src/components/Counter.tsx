'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export default function Counter({ value, suffix = '', duration = 2000, label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(el);

          const startTime = performance.now();

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-heading text-3xl sm:text-4xl font-bold text-farm-green-dark">
        {count}
        {suffix}
      </span>
      <span className="mt-1 block text-sm text-farm-stone-light">{label}</span>
    </div>
  );
}
