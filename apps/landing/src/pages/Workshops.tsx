import { ArrowRight, ClipboardCheck, Compass, FileCheck2, Rocket, Sparkles } from 'lucide-react';
import { Reveal } from '../components/Animated';
import SectionHeader from '../components/SectionHeader';
import { workshops } from '../data/content';
import { Link } from 'react-router-dom';
import type { Translation } from '../translations';

type WorkshopTupleKey = 'roadmap' | 'readiness' | 'policy' | 'action';

export default function Workshops({ t }: { t: Translation }) {
  const icons = [Compass, ClipboardCheck, FileCheck2, Rocket];

  return (
    <main className='page-bg' dir={t.isRtl ? 'rtl' : 'ltr'}>
      {/* HERO */}
      <section className='relative isolate flex min-h-[500px] items-center overflow-hidden bg-[#071A2B] md:min-h-[650px]'>
        {/* Background image */}
        <div
          className={`absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat ${
            t.isRtl ? '-scale-x-100' : ''
          }`}
          style={{
            backgroundImage: "url('/image/hero/Workshops.jpg')",
          }}
          aria-hidden='true'
        />

        <div
          className={`absolute inset-0 -z-10 ${
            t.isRtl
              ? 'bg-gradient-to-l from-[#071A2B]/95 via-[#071A2B]/80 to-[#071A2B]/40'
              : 'bg-gradient-to-r from-[#071A2B]/95 via-[#071A2B]/80 to-[#071A2B]/40'
          }`}
        />

        <div className='pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-champagne/20' />
        <div className='pointer-events-none absolute -right-12 -top-12 -z-10 h-56 w-56 rounded-full border border-white/10' />
        <div className='pointer-events-none absolute bottom-0 left-0 -z-10 h-1 w-40 bg-champagne' />

        <div className='mx-auto w-full max-w-7xl px-6 py-24 md:py-32'>
          <Reveal>
            <div className='max-w-3xl'>
              <div className='mb-6 inline-flex items-center gap-3 rounded-full border border-champagne/30 bg-white/5 px-4 py-2 backdrop-blur-sm'>
                <Sparkles size={15} className='text-champagne' />
                <span className='text-xs font-semibold uppercase tracking-[0.22em] text-champagne'>
                  EDUCATION • AI • INNOVATION
                </span>
              </div>

              <p className='mb-5 text-xs font-bold uppercase tracking-[0.3em] text-sky-200'>
                {t.workshopsPage.eyebrow}
              </p>

              <h1 className='font-display text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl'>
                {t.workshopsPage.title}
              </h1>

              <div className='mt-8 h-px w-24 bg-champagne' />
              <p className='mt-8 max-w-2xl text-base leading-8 text-slate-200 md:text-lg'>
                {t?.workshopsPage?.description ??
                  'Explore practical workshops designed to help education professionals transform ideas into actionable strategies, strengthen school quality, and embrace responsible innovation.'}
              </p>

              <div className='mt-10 flex flex-wrap gap-4'>
                <a
                  href='#workshops-list'
                  className='inline-flex items-center gap-3 rounded-full bg-champagne px-7 py-4 text-sm font-bold text-navy transition duration-300 hover:-translate-y-1 hover:bg-white'
                >
                  {t?.workshopsPage?.exploreButton ?? 'Explore Workshops'}

                  <ArrowRight size={17} className={t.isRtl ? 'rotate-180' : ''} />
                </a>

                <Link
                  to='/contact'
                  className='inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-champagne hover:text-champagne'
                >
                  {t.nav.contact}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className='absolute bottom-8 end-8 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/60 lg:flex'>
          <span className='h-px w-10 bg-champagne' />
          Future Schools Excellence Summit
        </div>
      </section>

      {/* WORKSHOPS */}
      <section id='workshops-list' className='relative overflow-hidden py-20 md:py-28'>
        <div className='pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl' />
        <div className='pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl' />

        <div className='relative mx-auto max-w-7xl px-6'>
          <Reveal>
            <div className='mx-auto mb-14 max-w-3xl text-center'>
              <SectionHeader
                eyebrow={t?.workshopsPage?.eyebrow ?? 'PRACTICAL LEARNING'}
                title={t.workshopsPage.title}
              />
              <p className='mx-auto mt-5 max-w-2xl leading-8 text-slate-600'>
                {t?.workshopsPage?.description1 ??
                  'Discover focused learning experiences that connect strategic thinking with practical implementation in modern schools.'}
              </p>
            </div>
          </Reveal>

          <div className='grid gap-7 md:grid-cols-2'>
            {workshops.map((w, i) => {
              const rawEntry = t.workshopsPage[w.key as WorkshopTupleKey];
              const [workshopTitle = '', workshopDesc = ''] = Array.isArray(rawEntry)
                ? rawEntry
                : [];
              const Icon = icons[i % icons.length] ?? Compass;

              return (
                <Reveal key={w.key} delay={i * 0.08}>
                  <article className='group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-champagne/70 hover:shadow-luxe'>
                    {/* Card header */}
                    <div className='relative overflow-hidden bg-gradient-to-br from-[#071A2B] via-[#102D49] to-[#17416A] p-8 text-white md:p-9'>
                      <div className='pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125' />
                      <div className='pointer-events-none absolute -right-2 -top-5 h-28 w-28 rounded-full border border-champagne/20' />

                      <div className='relative flex items-center justify-between gap-4'>
                        <div>
                          <p className='text-[10px] font-bold uppercase tracking-[0.25em] text-sky-200'>
                            {t.isRtl ? `ورشة عمل • اليوم ${w.day}` : `WORKSHOP • DAY ${w.day}`}
                          </p>
                          <span className='mt-3 block font-display text-5xl font-semibold text-champagne md:text-6xl'>
                            {w.no}
                          </span>
                        </div>

                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-sky-200 backdrop-blur-sm transition-all duration-500 group-hover:border-champagne/50 group-hover:bg-champagne/10 group-hover:text-champagne'>
                          <Icon size={30} strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className='relative mt-7 h-px w-full bg-white/15'>
                        <div className='h-px w-16 bg-champagne transition-all duration-500 group-hover:w-28' />
                      </div>
                    </div>

                    {/* Card content */}
                    <div className='flex flex-1 flex-col p-8 md:p-9'>
                      <div className='mb-4 flex items-center gap-2'>
                        <span className='h-2 w-2 rounded-full bg-champagne' />
                        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-royal'>
                          {t.isRtl ? `ورشة العمل ${w.no}` : `Workshop ${w.no}`}
                        </span>
                      </div>

                      <h3 className='font-display text-2xl font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-royal md:text-3xl'>
                        {workshopTitle}
                      </h3>

                      <p className='mt-4 flex-1 text-sm leading-8 text-slate-600 md:text-base'>
                        {workshopDesc}
                      </p>

                      <div className='mt-8 border-t border-slate-100 pt-6'>
                        <Link
                          to='/contact'
                          className='inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-royal transition-colors hover:text-amber-700'
                        >
                          {t.nav.contact}
                          <span className='flex h-8 w-8 items-center justify-center rounded-full border border-royal/20 transition-all duration-300 group-hover:border-champagne group-hover:bg-champagne group-hover:text-navy'>
                            <ArrowRight size={15} className={t.isRtl ? 'rotate-180' : ''} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <Reveal delay={0.15}>
            <div className='relative mt-16 overflow-hidden rounded-3xl bg-[#071A2B] p-8 md:p-12'>
              <div
                className={`pointer-events-none absolute -top-24 h-64 w-64 rounded-full border border-champagne/20 ${
                  t.isRtl ? '-left-12' : '-right-12'
                }`}
              />
              <div
                className={`pointer-events-none absolute -top-16 h-48 w-48 rounded-full border border-white/10 ${
                  t.isRtl ? '-left-4' : '-right-4'
                }`}
              />

              <div className='relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center'>
                <div className='max-w-2xl'>
                  <div className='mb-4 flex items-center gap-3 text-champagne'>
                    <Sparkles size={18} />
                    <span className='text-xs font-bold uppercase tracking-[0.24em]'>
                      {t?.workshopsPage?.nextStep?.eyebrow ?? 'NEXT STEP'}
                    </span>
                  </div>
                  <h2 className='font-display text-3xl font-semibold leading-tight text-white md:text-4xl'>
                    {t?.workshopsPage?.nextStep?.title ?? 'Turn new ideas into meaningful action'}
                  </h2>
                  <p className='mt-4 max-w-xl leading-7 text-slate-300'>
                    {t?.workshopsPage?.nextStep?.description ??
                      'Get in touch to learn more about the workshops and opportunities to participate.'}
                  </p>
                </div>

                <Link
                  to='/contact'
                  className='inline-flex shrink-0 items-center gap-3 rounded-full bg-champagne px-7 py-4 text-sm font-bold text-navy transition duration-300 hover:-translate-y-1 hover:bg-white'
                >
                  {t.nav.contact}
                  <ArrowRight size={17} className={t.isRtl ? 'rotate-180' : ''} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
