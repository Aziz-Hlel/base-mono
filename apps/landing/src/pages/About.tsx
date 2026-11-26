import { CheckCircle2 } from 'lucide-react';
import { Reveal } from '../components/Animated';
import SectionHeader from '../components/SectionHeader';
import { images } from '../data/content';
import type { Translation } from '../translations';

export default function About({ t }: { t: Translation }) {
  return (
    <main className='page-bg' dir={t.isRtl ? 'rtl' : 'ltr'}>
      {/* HERO — FULL BACKGROUND IMAGE */}{' '}
      <section className='relative isolate flex min-h-[500px] items-center overflow-hidden bg-[#071A2B] md:min-h-[650px]'>
        {/* Background image */}
        <div
          className={`absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat+ ${t.isRtl ? '-scale-x-100' : ''}`}
          style={{
            backgroundImage: "url('/image/hero/About.jpg')",
          }}
          aria-hidden='true'
        />
        {/* Dark overlay */}
        <div
          className='absolute inset-0 -z-10 bg-gradient-to-r from-[#071A2B]/95 via-[#071A2B]/75 to-[#071A2B]/35'
          aria-hidden='true'
        />
        {/* Decorative effects */}
        <div
          className='pointer-events-none absolute -right-20 -top-20 -z-10 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl'
          aria-hidden='true'
        />
        <div
          className='pointer-events-none absolute bottom-0 left-1/4 -z-10 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl'
          aria-hidden='true'
        />
        {/* Hero content */}
        <div className={'  w-full max-w-7xl  ps-6 py-24 md:py-32'}>
          <div className='max-w-3xl'>
            <div className='mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-100 backdrop-blur-md'>
              <span className='h-2 w-2 rounded-full bg-amber-400' />
              {t.about.eyebrow}
            </div>

            <h1 className='font-display text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl'>
              {t.about.title}
            </h1>

            <p className='mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg'>
              {t.about.text}
            </p>
          </div>
        </div>
        {/* Bottom decorative line */}
        <div className='absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent' />
      </section>
      {/* ABOUT THE SUMMIT */}
      <section className='py-24 md:py-32'>
        <div className='mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2'>
          <Reveal>
            <img
              src={images.leadership}
              alt='Education leaders collaborating on school excellence'
              className='h-[380px] w-full rounded-3xl object-cover shadow-luxe md:h-[520px]'
              loading='lazy'
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <SectionHeader eyebrow={t.summit.eyebrow} title={t.summit.title} />

              <p className='leading-8 text-slate-600'>{t.about.source}</p>

              <div className='mt-8 grid gap-4'>
                {[t.about.quality, t.about.ai, t.about.digital].map((x: string) => (
                  <div
                    key={x}
                    className='flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition duration-300 hover:border-blue-200 hover:shadow-md'
                  >
                    <CheckCircle2 className='mt-0.5 shrink-0 text-royal' size={20} />
                    <span className='font-semibold text-navy'>{x}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* SUMMIT OBJECTIVES */}
      <section className='relative overflow-hidden bg-navy py-24 text-white md:py-28'>
        {/* Background decoration */}
        <div
          className='pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl'
          aria-hidden='true'
        />

        <div className='relative mx-auto max-w-7xl px-6'>
          <SectionHeader eyebrow={t.objectives.eyebrow} title={t.objectives.title} light />

          <div className='mt-12 grid gap-5 md:grid-cols-3'>
            {t.objectives.items.map((x: any[], i: number) => (
              <Reveal key={x[0]} delay={i * 0.04}>
                <div className='group h-full rounded-2xl border border-white/10 bg-white/[.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[.07] hover:shadow-xl'>
                  <span className='font-display text-3xl text-champagne'>{x[0]}</span>

                  <div className='mt-5 h-px w-12 bg-champagne/70 transition-all duration-300 group-hover:w-20' />

                  <h3 className='mt-6 font-display text-xl font-semibold'>{x[1]}</h3>

                  <p className='mt-3 text-sm leading-7 text-slate-400'>{x[2]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
