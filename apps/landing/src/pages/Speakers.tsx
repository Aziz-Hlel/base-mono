import {
  ArrowUpRight,
  BrainCircuit,
  GraduationCap,
  Users,
  Lightbulb,
  Award,
  ShieldCheck,
  Globe2,
  Building2,
  CalendarDays,
  UserRound,
  Send,
  BookOpenCheck,
} from 'lucide-react';

import { Reveal } from '../components/Animated';
import SectionHeader from '../components/SectionHeader';
import type { Translation } from '../translations';

export default function Speakers({ t }: { t: Translation }) {
  const isArabic = t.isRtl;

  const icons = [Globe2, BrainCircuit, GraduationCap, Award, ShieldCheck, Users];

  const categories = t.speakers.categories;

  return (
    <main dir={t.isRtl ? 'rtl' : 'ltr'} className='page-bg overflow-hidden'>
      {/* =====================================================
          HERO — EXPERT COMMUNITY
      ===================================================== */}
      <section className='relative isolate flex min-h-[500px] items-center overflow-hidden bg-[#071A2B] md:min-h-[650px]'>
        {/* Background image */}
        <div
          className={`absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat+ ${t.isRtl ? '-scale-x-100' : ''}`}
          style={{
            backgroundImage: "url('/image/hero/Keynote.jpg')",
          }}
          aria-hidden='true'
        />
        <div className='absolute inset-0 bg-gradient-to-r from-[#071A2B]/95 via-[#071A2B]/80 to-[#071A2B]/35' />
        <div className='absolute inset-0 bg-gradient-to-t from-[#071A2B]/65 via-transparent to-[#071A2B]/20' />

        <div className='pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full border border-white/10' />
        <div className='pointer-events-none absolute -right-8 top-32 h-48 w-48 rounded-full border border-[#C6A75E]/25' />

        <div className='relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-32'>
          <Reveal>
            <div className={`max-w-3xl ${isArabic ? 'ml-auto text-right' : ''}`}>
              <div className={`mb-6 flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <span className='h-px w-12 bg-[#C6A75E]' />

                <span className='text-xs font-bold uppercase tracking-[0.28em] text-[#D8BD78]'>
                  {t.speakers.eyebrow}
                </span>
              </div>

              <h1 className='font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-7xl'>
                {t.speakers.title}
              </h1>

              <p className='mt-7 max-w-2xl text-base leading-8 text-slate-200 md:text-lg'>
                {t.speakers.text}
              </p>

              <a
                href='#expert-community'
                className={`mt-9 inline-flex items-center gap-3 rounded-full bg-[#C6A75E] px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#071A2B] transition duration-300 hover:-translate-y-1 hover:bg-white ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}
              >
                {t.speakers.exploreExperts}

                <ArrowUpRight size={17} className={isArabic ? '-rotate-90' : ''} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className='absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent' />
      </section>

      {/* =====================================================
          EXPERT COMMUNITY — INTRODUCTION
      ===================================================== */}
      <section id='expert-community' className='relative overflow-hidden py-24 md:py-32'>
        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div className='absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl' />
          <div className='absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl' />
        </div>

        <div className='relative mx-auto max-w-7xl px-6'>
          <Reveal>
            <SectionHeader
              eyebrow={t.speakers.categoriesEyebrow}
              title={t.speakers.categoriesTitle}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className={`mx-auto mt-6 max-w-3xl text-center text-base leading-8 text-slate-600 md:text-lg ${
                isArabic ? 'text-center' : ''
              }`}
            >
              {t.speakers.categoriesIntro}
            </p>
          </Reveal>

          {/* Six speaker categories */}
          <div className='mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {categories.map((category: any, index: number) => {
              const Icon = icons[index] ?? BrainCircuit;

              return (
                <Reveal key={category.title} delay={index * 0.08}>
                  <article
                    className={`group relative h-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C6A75E]/60 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)] ${
                      isArabic ? 'text-right' : ''
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute -top-5 font-display text-8xl font-bold leading-none text-slate-100 transition-colors duration-500 group-hover:text-amber-50 ${
                        isArabic ? 'left-4' : 'right-4'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div
                      className={`absolute top-0 h-1 w-0 bg-gradient-to-r from-[#C6A75E] to-yellow-500 transition-all duration-500 group-hover:w-full ${
                        isArabic ? 'right-0' : 'left-0'
                      }`}
                    />

                    <div className='relative z-10 grid h-16 w-16 place-items-center rounded-2xl border border-slate-200 bg-slate-50 text-[#173653] transition-all duration-500 group-hover:border-[#C6A75E]/40 group-hover:bg-[#071A2B] group-hover:text-white'>
                      <Icon size={28} strokeWidth={1.6} />
                    </div>

                    <h3 className='relative z-10 mt-8 font-display text-xl font-semibold leading-snug text-[#071A2B] transition-colors duration-300 group-hover:text-[#9A7934]'>
                      {category.title}
                    </h3>

                    <p className='relative z-10 mt-4 text-sm leading-7 text-slate-600'>
                      {category.description}
                    </p>

                    <div
                      className={`relative z-10 mt-7 flex items-center gap-3 ${
                        isArabic ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span className='h-px w-8 bg-[#C6A75E]' />
                      <span className='text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400'>
                        {t.speakers.categoryLabel}
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          INTERNATIONAL KEYNOTE SPEAKERS
      ===================================================== */}
      <section id='keynote-speakers' className='relative overflow-hidden bg-white py-24 md:py-32'>
        <div className='pointer-events-none absolute inset-0'>
          <div className='absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl' />
          <div className='absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl' />
        </div>

        <div className='relative mx-auto max-w-7xl px-6'>
          <Reveal>
            <SectionHeader eyebrow={t.speakers.keynoteEyebrow} title={t.speakers.keynoteTitle} />
          </Reveal>

          <div className='mt-14 grid items-stretch gap-10 lg:grid-cols-[0.85fr_1.15fr]'>
            {/* Speaker visual */}
            <Reveal>
              <div className='relative min-h-[340px] overflow-hidden rounded-[32px] bg-[#071A2B] p-8 md:min-h-[460px] md:p-12'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#163957] via-[#071A2B] to-[#030B13]' />

                <div className='absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10' />
                <div className='absolute -right-4 -top-4 h-40 w-40 rounded-full border border-[#C6A75E]/30' />

                <div className='relative flex h-full min-h-[300px] flex-col justify-between'>
                  <div className='grid h-20 w-20 place-items-center rounded-3xl border border-[#C6A75E]/40 bg-white/5 text-[#D8BD78]'>
                    <UserRound size={38} strokeWidth={1.3} />
                  </div>

                  <div>
                    <span className='text-xs font-bold uppercase tracking-[0.24em] text-[#D8BD78]'>
                      {t.speakers.keynoteEyebrow}
                    </span>

                    <h3 className='mt-4 max-w-md font-display text-3xl font-semibold leading-tight text-white md:text-4xl'>
                      {t.speakers.placeholderTitle}
                    </h3>

                    <p className='mt-4 max-w-sm text-sm leading-7 text-slate-300'>
                      {t.speakers.placeholderDescription}
                    </p>
                  </div>

                  <div className='mt-8 h-px w-full bg-gradient-to-r from-[#C6A75E]/70 to-transparent' />
                </div>
              </div>
            </Reveal>

            {/* Speaker profile card */}
            <Reveal delay={0.12}>
              <article
                id='speaker-profile'
                className={`flex h-full flex-col rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.07)] md:p-12 ${
                  isArabic ? 'text-right' : ''
                }`}
              >
                <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className='grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-[#9A7934]'>
                    <Award size={24} />
                  </span>

                  <span className='text-xs font-bold uppercase tracking-[0.2em] text-[#9A7934]'>
                    {t.speakers.profileLabel}
                  </span>
                </div>

                <h3 className='mt-7 font-display text-2xl font-semibold text-[#071A2B] md:text-3xl'>
                  {t.speakers.placeholderTitle}
                </h3>

                <div
                  className={`mt-4 flex items-center gap-3 text-sm text-slate-500 ${
                    isArabic ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Building2 size={18} className='shrink-0 text-[#B08D45]' />
                  <span>{t.speakers.institutionCountry}</span>
                </div>

                <div className='mt-8 rounded-2xl border border-amber-100 bg-amber-50/60 p-6'>
                  <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <BookOpenCheck size={20} className='shrink-0 text-[#9A7934]' />
                    <h4 className='font-semibold text-[#071A2B]'>{t.speakers.proposedKeynote}</h4>
                  </div>

                  <p className='mt-3 text-sm leading-7 text-slate-600'>{t.speakers.sessionTitle}</p>
                </div>

                <div className='mt-7'>
                  <h4 className='text-sm font-semibold text-[#071A2B]'>
                    {t.speakers.biographyLabel}
                  </h4>

                  <p className='mt-3 text-sm leading-7 text-slate-600'>
                    {t.speakers.biographyPlaceholder}
                  </p>
                </div>

                <div
                  className={`mt-auto flex flex-col gap-3 pt-8 sm:flex-row ${
                    isArabic ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <a
                    href='/contact'
                    className='inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-[#071A2B] transition hover:border-[#C6A75E] hover:bg-amber-50'
                  >
                    {t.speakers.viewProfile}
                    <ArrowUpRight size={16} className={isArabic ? '-rotate-90' : ''} />
                  </a>

                  <a
                    href='/program'
                    className='inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#071A2B] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#173653]'
                  >
                    <CalendarDays size={17} />
                    {t.speakers.addSession}
                  </a>
                </div>
              </article>
            </Reveal>
          </div>

          <p className='mt-8 text-center text-xs leading-6 text-slate-400'>
            {t.speakers.placeholderNote}
          </p>
        </div>
      </section>

      {/* =====================================================
          INVITATION — BECOME A SPEAKER
      ===================================================== */}
      <section className='relative overflow-hidden px-6 py-20 md:py-28'>
        <Reveal>
          <div className='relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#071A2B] px-7 py-14 shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:px-16 md:py-20'>
            <div className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10' />
            <div className='pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-white/10' />

            <div className='pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent' />

            <div className='relative mx-auto max-w-3xl text-center'>
              <div className='mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2'>
                <span className='h-2 w-2 rounded-full bg-[#C6A75E]' />
                <span className='text-xs font-bold uppercase tracking-[0.2em] text-[#D8BD78]'>
                  {t.speakers.invitationEyebrow}
                </span>
              </div>

              <div className='mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-[#C6A75E]/30 bg-white/5 text-[#D8BD78]'>
                <Lightbulb size={30} strokeWidth={1.5} />
              </div>

              <h2 className='mt-7 font-display text-3xl font-semibold leading-tight text-white md:text-5xl'>
                {t.speakers.cta}
              </h2>

              <p className='mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-300 md:text-base'>
                {t.speakers.ctaText}
              </p>

              <a
                href='/contact'
                className={`group mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-[#C6A75E] px-8 py-4 text-sm font-bold text-[#071A2B] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}
              >
                <Send size={17} />
                {t.speakers.becomeSpeaker}

                <ArrowUpRight
                  size={17}
                  className={`transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    isArabic ? '-rotate-90' : ''
                  }`}
                />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
