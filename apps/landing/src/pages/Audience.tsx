import {
  Users,
  GraduationCap,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
  Cpu,
  BadgeCheck,
  Landmark,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import { Reveal } from '../components/Animated';
import SectionHeader from '../components/SectionHeader';
import { images } from '../data/content';
import type { Translation } from '../translations';

export default function Audience({ t }: { t: Translation }) {
  const icons = [
    Building2,
    Users,
    GraduationCap,
    BadgeCheck,
    Cpu,
    ShieldCheck,
    Landmark,
    BriefcaseBusiness,
  ];

  const roles = [
    'owners',
    'principals',
    'teachers',
    'quality',
    'digital',
    'inclusion',
    'government',
    'partners',
  ] as const;

  const principles = [
    t.audience.learn,
    t.audience.exchange,
    t.audience.connect,
    t.audience.implement,
  ];

  return (
    <main className='page-bg' dir={t.isRtl ? 'rtl' : 'ltr'}>
      {/* HERO */}
      <section className='relative isolate flex min-h-[500px] items-center overflow-hidden bg-[#071A2B] md:min-h-[600px]'>
        <div
          className={`absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat+ ${t.isRtl ? '-scale-x-100' : ''}`}
          style={{
            backgroundImage: "url('/image/hero/Audience.jpg')",
          }}
          aria-hidden='true'
        />

        <div
          className='absolute inset-0 -z-10 bg-gradient-to-r from-[#071A2B]/95 via-[#071A2B]/80 to-[#071A2B]/35'
          aria-hidden='true'
        />

        <div
          className='pointer-events-none absolute -right-20 -top-20 -z-10 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl'
          aria-hidden='true'
        />

        <div className='mx-auto w-full max-w-7xl px-6 py-24 md:py-32'>
          <Reveal>
            <div className='max-w-3xl'>
              <div className='mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-100 backdrop-blur-md'>
                <span className='h-2 w-2 rounded-full bg-amber-400' />
                {t.audience.eyebrow}
              </div>

              <h1 className='font-display text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl'>
                {t.audience.title}
              </h1>

              <p className='mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg'>
                {t.audience.text}
              </p>

              <a
                href='#audience-roles'
                className='mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#071A2B] transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl'
              >
                {t.audience.ctaButton}
                <ArrowRight size={17} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className='absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent' />
      </section>

      {/* WHO SHOULD ATTEND */}
      <section id='audience-roles' className='scroll-mt-20 py-24 md:py-32'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='mb-14 max-w-3xl'>
            <p className='text-xs font-bold uppercase tracking-[0.22em] text-royal'>
              {t.audience.rolesEyebrow}
            </p>

            <h2 className='mt-4 font-display text-3xl font-semibold leading-tight text-navy md:text-5xl'>
              {t.audience.rolesTitle}
            </h2>

            <p className='mt-5 text-base leading-8 text-slate-600 md:text-lg'>
              {t.audience.rolesIntro}
            </p>
          </div>

          <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {roles.map((key, i) => {
              const Icon = icons[i] ?? Building2;
              const role = t.audience.roles[key];

              return (
                <Reveal key={key} delay={i * 0.04}>
                  <article className='group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-luxe md:p-8'>
                    <div className='absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50/70 transition duration-300 group-hover:bg-blue-100/70' />

                    <div className='relative flex items-center justify-between'>
                      <div className='grid h-14 w-14 place-items-center rounded-xl bg-blue-50 text-royal transition duration-300 group-hover:bg-royal group-hover:text-white'>
                        <Icon size={25} strokeWidth={1.7} />
                      </div>

                      <span className='font-display text-sm font-semibold tracking-widest text-slate-300'>
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className='relative mt-7 font-display text-xl font-semibold leading-snug text-navy'>
                      {role.title}
                    </h3>

                    <p className='relative mt-3 flex-1 text-sm leading-7 text-slate-600'>
                      {role.description}
                    </p>

                    <div className='mt-6 h-px w-10 bg-royal/50 transition-all duration-300 group-hover:w-16' />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARN · EXCHANGE · CONNECT · IMPLEMENT */}
      <section className='relative overflow-hidden bg-navy py-24 text-white md:py-28'>
        <div
          className='pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl'
          aria-hidden='true'
        />

        <div className='relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16'>
          <Reveal>
            <div>
              <SectionHeader
                eyebrow={t.audience.ctaEyebrow}
                title={t.audience.ctaTitle}
                text={t.audience.ctaText}
                light
              />

              <div className='mt-8 grid gap-3 sm:grid-cols-2'>
                {principles.map((item, i) => (
                  <div
                    key={item}
                    className='group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 font-semibold transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]'
                  >
                    <span className='font-display text-lg text-champagne'>0{i + 1}</span>

                    <span className='flex-1'>{item}</span>

                    <ArrowRight
                      size={16}
                      className='text-slate-500 transition group-hover:translate-x-1 group-hover:text-white'
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className='group relative'>
              <div className='absolute -inset-3 rounded-3xl border border-white/10 transition group-hover:border-white/20' />

              <img
                src={images.audience}
                alt={t.audience.imageAlt}
                loading='lazy'
                className='relative h-[360px] w-full rounded-3xl object-cover shadow-2xl transition duration-500 group-hover:scale-[1.01] md:h-[460px]'
              />

              <div className='absolute inset-0 rounded-3xl bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent' />

              <div className='absolute bottom-6 left-6 right-6'>
                <p className='text-xs font-bold uppercase tracking-[0.2em] text-amber-300'>
                  Future Schools Excellence Summit
                </p>

                <p className='mt-2 font-display text-xl font-semibold text-white md:text-2xl'>
                  Education · AI · Quality · Innovation
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* BRING YOUR SCHOOL TEAM */}
        <div className='relative mx-auto mt-20 max-w-7xl px-6'>
          <Reveal>
            <div className='flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.05] p-8 md:flex-row md:items-center md:justify-between md:p-12'>
              <div className='max-w-3xl'>
                <div className='mb-4 flex items-center gap-3 text-amber-300'>
                  <CheckCircle2 size={22} />
                  <span className='text-xs font-bold uppercase tracking-[0.2em]'>
                    {t.audience.teamEyebrow}
                  </span>
                </div>

                <h2 className='font-display text-2xl font-semibold text-white md:text-4xl'>
                  {t.audience.teamTitle}
                </h2>

                <p className='mt-4 leading-8 text-slate-300'>{t.audience.teamText}</p>
              </div>

              <a
                href='/contact'
                className='inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#071A2B] transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl'
              >
                {t.audience.teamButton}
                <ArrowRight size={17} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
