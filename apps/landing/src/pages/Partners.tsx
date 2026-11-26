import {
  BadgeCheck,
  Handshake,
  Megaphone,
  Presentation,
  Trophy,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Reveal } from '../components/Animated';
import SectionHeader from '../components/SectionHeader';
import { partnerTypes } from '../data/content';
import type { Translation } from '../translations';

export default function Partners({ t }: { t: Translation }) {
  type PartnerTypeKey = keyof typeof t.partners.types;

  const icons = [
    Trophy,
    Trophy,
    Trophy,
    Presentation,
    BadgeCheck,
    Presentation,
    Handshake,
    Megaphone,
  ];

  const typedPartnerTypes = partnerTypes as readonly PartnerTypeKey[];

  return (
    <main className='page-bg'>
      {/* HERO */}
      <section className='relative isolate flex min-h-[500px] items-center overflow-hidden bg-[#071A2B] md:min-h-[650px]'>
        {/* Background image */}
        <div
          className={`absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat ${
            t.isRtl ? '-scale-x-100' : ''
          }`}
          style={{
            backgroundImage: "url('/image/hero/Leaders.jpg')",
          }}
          aria-hidden='true'
        />
        {/* Dark overlay */}
        <div
          className={`absolute inset-0 -z-10 ${
            t.isRtl
              ? 'bg-gradient-to-l from-[#071A2B]/95 via-[#071A2B]/80 to-[#071A2B]/35'
              : 'bg-gradient-to-r from-[#071A2B]/95 via-[#071A2B]/80 to-[#071A2B]/35'
          }`}
        />
        <div className='absolute inset-0 -z-10 bg-gradient-to-t from-[#071A2B]/65 via-transparent to-[#071A2B]/20' />

        {/* Decorative elements */}
        <div className='absolute -right-20 top-20 h-72 w-72 rounded-full border border-white/10' />
        <div className='absolute -right-8 top-32 h-48 w-48 rounded-full border border-[#C6A75E]/25' />

        <div className='relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-32'>
          <Reveal>
            <div className='max-w-3xl'>
              <div className='mb-6 flex items-center gap-3'>
                <span className='h-px w-12 bg-[#C6A75E]' />
                <span className='text-xs font-bold uppercase tracking-[0.28em] text-[#D8BD78]'>
                  {t.partners.eyebrow}
                </span>
              </div>

              <h1 className='font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-7xl'>
                {t.partners.title}
              </h1>

              <p className='mt-7 max-w-2xl text-base leading-8 text-slate-200 md:text-lg'>
                {t.partners.sponsorText}
              </p>

              <a
                href='/sponsorship'
                className='mt-9 inline-flex items-center gap-3 rounded-full bg-[#C6A75E] px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#071A2B] transition duration-300 hover:-translate-y-1 hover:bg-white'
              >
                {t.partners.cta}
                <ArrowRight size={16} className={t.isRtl ? 'rotate-180' : ''} />
              </a>
            </div>
          </Reveal>
        </div>
        <div className='absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent' />
      </section>

      {/* PARTNERSHIP OPPORTUNITIES */}
      <section id='partnership-opportunities' className='relative overflow-hidden py-20 md:py-28'>
        <div className='pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl' />
        <div className='pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl' />

        <div className='relative mx-auto max-w-7xl px-6'>
          <Reveal>
            <SectionHeader
              eyebrow={t.partners.sponsors}
              title={t.partners.sponsorTitle}
              text={t.partners.sponsorText}
            />
          </Reveal>

          <div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {typedPartnerTypes.map((key, i) => {
              const Icon = icons[i % icons.length] ?? Trophy;
              const label = t.partners.types[key] ?? String(key);

              return (
                <Reveal key={String(key)} delay={i * 0.05}>
                  <article className='group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_8px_30px_rgba(7,26,43,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C6A75E]/60 hover:shadow-[0_20px_50px_rgba(7,26,43,0.10)]'>
                    <div className='absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-slate-50 transition-colors duration-500 group-hover:bg-amber-50' />

                    <div className='relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C6A75E]/25 bg-[#C6A75E]/10 text-[#A78337] transition-all duration-500 group-hover:bg-[#071A2B] group-hover:text-[#D8BD78]'>
                      <Icon size={26} strokeWidth={1.7} />
                    </div>

                    <h3 className='relative mt-7 font-display text-xl font-semibold leading-snug text-[#071A2B]'>
                      {label}
                    </h3>

                    <div className='mt-5 h-px w-12 bg-[#C6A75E] transition-all duration-500 group-hover:w-20' />

                    <p className='mt-5 text-sm leading-7 text-slate-500'>
                      {t.partners.partnershipText}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* EXHIBITION FEATURE */}
          <Reveal>
            <section className='relative mt-20 overflow-hidden rounded-3xl bg-[#071A2B] md:mt-28'>
              <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(198,167,94,0.20),_transparent_55%)]' />
              <div className='absolute -right-16 -top-20 h-72 w-72 rounded-full border border-white/10' />
              <div className='absolute -right-4 -top-8 h-48 w-48 rounded-full border border-[#C6A75E]/25' />

              <div className='relative grid gap-10 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-14 lg:p-16'>
                <div className='max-w-3xl'>
                  <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-[#C6A75E]/30 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D8BD78]'>
                    <Sparkles size={14} />
                    {t.partners.exhibition}
                  </div>

                  <h2 className='font-display text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl'>
                    {t.partners.exhibition}
                  </h2>

                  <p className='mt-6 max-w-2xl text-sm leading-8 text-slate-300 md:text-base'>
                    {t.partners.exhibitionText}
                  </p>
                </div>

                <a
                  href='/exhibition'
                  className='inline-flex w-fit items-center justify-center gap-3 rounded-full border border-[#C6A75E]/70 px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#D8BD78] transition-all duration-300 hover:bg-[#C6A75E] hover:text-[#071A2B]'
                >
                  {t.partners.cta}
                  <ArrowRight size={16} className={t.isRtl ? 'rotate-180' : ''} />
                </a>
              </div>
            </section>
          </Reveal>

          {/* FINAL CALL TO ACTION */}
          <div id='partnership-contact' className='mt-20 md:mt-28'>
            <Reveal>
              <div className='rounded-3xl border border-slate-200 bg-white px-7 py-12 text-center shadow-sm md:px-16 md:py-16'>
                <div className='mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C6A75E]/15 text-[#A78337]'>
                  <Handshake size={28} strokeWidth={1.6} />
                </div>

                <SectionHeader eyebrow={t.partners.eyebrow2} title={t.partners.title2} />

                <p className='mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500'>
                  {t.partners.sponsorText}
                </p>

                <a
                  href='/sponsorship'
                  className='mt-8 inline-flex items-center gap-3 rounded-full bg-[#071A2B] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#183B5A]'
                >
                  {t.partners.cta}
                  <ArrowRight size={16} className={t.isRtl ? 'rotate-180' : ''} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
