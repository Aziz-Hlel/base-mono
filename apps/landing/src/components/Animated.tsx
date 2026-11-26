import { motion } from 'framer-motion';
import AIBackground from './AIBackground';
import type { ReactNode } from 'react';

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <section className='relative min-h-screen overflow-hidden bg-navy text-white flex items-center'>
      {' '}
      <AIBackground dark />
      <div className='absolute inset-0 z-[1] luxe-grid opacity-20' />
      <div className='absolute -left-24 top-10 z-[1] h-72 w-72 rounded-full bg-royal/20 blur-3xl' />
      <div className='absolute -right-24 bottom-0 z-[1] h-80 w-80 rounded-full bg-champagne/10 blur-3xl' />
      <div className='relative z-10 mx-auto max-w-7xl px-6'>
        <Reveal>
          <div className='mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-champagne'>
            {eyebrow}
          </div>
          <h1 className='max-w-4xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl'>
            {title}
          </h1>
          {text && (
            <p className='mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg'>{text}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
