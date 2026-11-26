import { Clock3, MapPin, Sparkles, ArrowUpRight, CalendarDays } from 'lucide-react';

import { Reveal } from '../components/Animated';
import SectionHeader from '../components/SectionHeader';
import { aiDayOne, aiDayTwo, type Lang } from '../data/content';
import type { Translation } from '../translations';

/* =========================================================
   OFFICIAL SUMMIT SCHEDULE
========================================================= */

type ScheduleItem = {
  key: string;
  timeKey?: string;
};

const dayOne: ScheduleItem[] = [
  { key: 'registration', timeKey: 'registration' },
  { key: 'opening', timeKey: 'opening' },
  { key: 'openingKeynote', timeKey: 'openingKeynote' },
  { key: 'internationalPanel', timeKey: 'internationalPanel' },
  { key: 'networkingBreak', timeKey: 'networkingBreak' },
  { key: 'qualityAccreditation', timeKey: 'qualityAccreditation' },
  { key: 'responsibleAI', timeKey: 'responsibleAI' },
  { key: 'lunchExhibition', timeKey: 'lunchExhibition1' },
  { key: 'parallelWorkshops1', timeKey: 'parallelWorkshops1' },
  { key: 'coffeeNetworking', timeKey: 'coffeeNetworking' },
  { key: 'caseStudies', timeKey: 'caseStudies' },
  { key: 'day1Reflection', timeKey: 'day1Reflection' },
];

const dayTwo: ScheduleItem[] = [
  { key: 'implementationKeynote', timeKey: 'implementationKeynote' },
  { key: 'curriculumSkills', timeKey: 'curriculumSkills' },
  { key: 'networkingBreak', timeKey: 'networkingBreak2' },
  { key: 'assessmentIntegrity', timeKey: 'assessmentIntegrity' },
  { key: 'leadershipData', timeKey: 'leadershipData' },
  { key: 'lunchExhibition', timeKey: 'lunchExhibition2' },
  { key: 'parallelWorkshops2', timeKey: 'parallelWorkshops2' },
  { key: 'coffeeBreak', timeKey: 'coffeeBreak' },
  { key: 'roundtable', timeKey: 'roundtable' },
  { key: 'actionPlan', timeKey: 'actionPlan' },
  { key: 'closing', timeKey: 'closing' },
];

/* =========================================================
   TIMELINE
========================================================= */

function Timeline({
  items,
  t,
  ai = false,
  isArabic = false,
}: {
  items: (string | ScheduleItem)[];
  t: Translation;
  ai?: boolean;
  isArabic?: boolean;
}) {
  return (
    <div className={`relative ${isArabic ? 'pr-2 md:pr-3' : 'pl-2 md:pl-3'}`}>
      <div
        className={`absolute top-3 bottom-3 w-px ${
          isArabic ? 'right-[22px] md:right-[27px]' : 'left-[22px] md:left-[27px]'
        } ${
          ai
            ? 'bg-gradient-to-b from-champagne via-champagne/30 to-transparent'
            : 'bg-gradient-to-b from-royal via-royal/25 to-transparent'
        }`}
      />

      <div className='space-y-4 md:space-y-5'>
        {items.map((item, i) => {
          const itemKey = typeof item === 'string' ? item : item.key;

          const timeKey = typeof item === 'string' ? item : (item.timeKey ?? item.key);

          const x = ai
            ? t.ai?.items?.[itemKey as keyof typeof t.ai.items]
            : t.program?.items?.[itemKey as keyof typeof t.program.items];

          if (!x) return null;

          const time = !ai
            ? t.program?.schedule?.[timeKey as keyof typeof t.program.schedule]
            : null;

          return (
            <Reveal key={`${itemKey}-${i}`} delay={i * 0.035}>
              <article className='group relative flex gap-4 md:gap-5'>
                {/* Timeline number */}
                <div
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-white text-[10px] font-bold shadow-[0_8px_25px_rgba(15,23,42,0.08)] transition-all duration-500 group-hover:scale-110 md:h-[54px] md:w-[54px] ${
                    ai
                      ? 'border-champagne/40 text-champagne group-hover:border-champagne'
                      : 'border-royal/20 text-royal group-hover:border-royal'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Session card */}
                <div className='relative min-w-0 flex-1 overflow-hidden rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)] md:p-6'>
                  {/* Hover glow */}
                  <div
                    className={`pointer-events-none absolute -top-16 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                      isArabic ? '-left-16' : '-right-16'
                    } ${ai ? 'bg-champagne/10' : 'bg-royal/5'}`}
                  />

                  {/* Top accent */}
                  <div
                    className={`absolute top-0 h-[2px] w-0 transition-all duration-500 group-hover:w-20 ${
                      isArabic ? 'right-0' : 'left-0'
                    } ${ai ? 'bg-champagne' : 'bg-royal'}`}
                  />

                  <div className='relative'>
                    {/* Session metadata */}
                    <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
                      <div
                        className={`flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] ${
                          ai ? 'text-champagne' : 'text-royal'
                        }`}
                      >
                        <Clock3 size={14} />

                        {time ? (
                          <span className='text-xs tracking-normal md:text-sm'>{time}</span>
                        ) : (
                          <span>
                            {i < 3
                              ? t.program.morning || 'Morning'
                              : t.program.afternoon || 'Afternoon'}
                          </span>
                        )}
                      </div>

                      <span className='rounded-full bg-slate-50 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-slate-400'>
                        {t.program.session || 'Session'} {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Session title */}
                    <h3 className='font-display text-lg font-semibold leading-snug text-navy md:text-[22px]'>
                      {x[0]}
                    </h3>

                    {/* Session description */}
                    <p className='mt-2 text-[13px] leading-6 text-slate-500 md:text-sm md:leading-7'>
                      {x[1]}
                    </p>

                    {/* Bottom decoration */}
                    <div className='mt-5 flex items-center justify-between'>
                      <div
                        className={`h-px w-10 transition-all duration-500 group-hover:w-20 ${
                          ai ? 'bg-champagne/50' : 'bg-royal/30'
                        }`}
                      />

                      <ArrowUpRight
                        size={15}
                        className={`opacity-0 transition-all duration-500 group-hover:opacity-100 ${
                          isArabic ? '-rotate-90' : ''
                        } ${ai ? 'text-champagne' : 'text-royal'}`}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   SUMMIT DAY CARD
========================================================= */

function DayCard({
  day,
  title,
  items,
  t,
  location,
  isArabic = false,
}: {
  day: string;
  title: string;
  items: ScheduleItem[];
  t: any;
  location?: string;
  isArabic?: boolean;
}) {
  return (
    <Reveal>
      <div className='group relative h-full overflow-hidden rounded-[30px] border border-slate-200 bg-[#fbfaf7] p-5 shadow-[0_15px_50px_rgba(15,23,42,0.05)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_30px_75px_rgba(15,23,42,0.10)] md:p-7'>
        {/* Decorative glow */}
        <div
          className={`pointer-events-none absolute -top-24 h-56 w-56 rounded-full bg-royal/[0.035] blur-3xl ${
            isArabic ? '-left-24' : '-right-24'
          }`}
        />

        {/* Header */}
        <div className='relative mb-7 border-b border-slate-200 pb-6'>
          <div className='mb-5 flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
              <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-champagne shadow-lg'>
                {day.replace(/\D/g, '').padStart(2, '0')}
              </div>

              <div>
                <div className='text-[9px] font-bold uppercase tracking-[0.22em] text-royal'>
                  {day}
                </div>

                <div className='mt-1 text-[10px] font-medium text-slate-400'>
                  {t.program?.summit || 'Future Schools Summit'}
                </div>
              </div>
            </div>

            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white'>
              <CalendarDays size={16} className='text-royal' />
            </div>
          </div>

          <h2 className='font-display text-2xl font-semibold leading-tight text-navy md:text-[32px]'>
            {title}
          </h2>

          {location && (
            <div className='mt-4 flex items-center gap-2 text-xs font-medium text-slate-500'>
              <MapPin size={13} className='text-champagne' />
              <span>{location}</span>
            </div>
          )}

          <div className='mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400'>
            <Clock3 size={13} />
            <span>
              {items.length} {t.program?.sessionsLabel || 'scheduled sessions'}
            </span>
          </div>
        </div>

        {/* Official timeline */}
        <Timeline items={items} t={t} isArabic={isArabic} />
      </div>
    </Reveal>
  );
}

/* =========================================================
   AI WORKSHOP DAY CARD
========================================================= */

function AIDayCard({
  day,
  items,
  t,
  isArabic = false,
}: {
  day: string;
  items: string[];
  t: Translation;
  isArabic?: boolean;
}) {
  return (
    <Reveal>
      <div className='group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-champagne/30 hover:bg-white/[0.065] md:p-7'>
        {/* Background glow */}
        <div
          className={`pointer-events-none absolute -top-24 h-64 w-64 rounded-full bg-champagne/[0.08] blur-[80px] ${
            isArabic ? '-left-24' : '-right-24'
          }`}
        />

        {/* Header */}
        <div className='relative mb-7 border-b border-white/10 pb-6'>
          <div className='mb-4 flex items-center justify-between'>
            <span className='rounded-full border border-champagne/20 bg-champagne/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-champagne'>
              {t.ai.workshop || 'AI Workshop'}
            </span>

            <div className='flex h-10 w-10 items-center justify-center rounded-full border border-champagne/20 bg-champagne/5'>
              <Sparkles size={15} className='text-champagne' />
            </div>
          </div>

          <h3 className='font-display text-3xl font-semibold text-white'>{day}</h3>
        </div>

        <Timeline items={items} t={t} ai isArabic={isArabic} />
      </div>
    </Reveal>
  );
}

/* =========================================================
   MAIN PROGRAM PAGE
========================================================= */

export default function Program({ t, currentLang }: { t: Translation; currentLang?: Lang }) {
  const isArabic = Boolean(t?.isRtl || currentLang === 'ar' || (t as any)?.lang === 'ar');

  return (
    <main dir={isArabic ? 'rtl' : 'ltr'} className='page-bg overflow-hidden bg-[#faf9f6]'>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className='relative flex min-h-[580px] items-center overflow-hidden bg-cover bg-center md:min-h-[680px]'
        style={{
          backgroundImage: "url('/image/hero/Programme.jpg')",
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-[#071A2B]/95 via-[#071A2B]/80 to-[#071A2B]/35' />

        <div className='absolute inset-0 bg-gradient-to-t from-[#071A2B]/65 via-transparent to-[#071A2B]/20' />

        <div className='absolute -right-20 top-20 h-72 w-72 rounded-full border border-white/10' />

        <div className='absolute -right-8 top-32 h-48 w-48 rounded-full border border-[#C6A75E]/25' />

        <div className='relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-32'>
          <Reveal>
            <div className='max-w-3xl'>
              <div className='mb-6 flex items-center gap-3'>
                <span className='h-px w-12 bg-[#C6A75E]' />

                <span className='text-xs font-bold uppercase tracking-[0.28em] text-[#D8BD78]'>
                  {t.program.eyebrow}
                </span>
              </div>

              <h1 className='font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-7xl'>
                {t.program.title}
              </h1>

              <p className='mt-7 max-w-2xl text-base leading-8 text-slate-200 md:text-lg'>
                {t.program.intro}
              </p>

              <a
                href='#summit-program'
                className='mt-9 inline-flex items-center gap-3 rounded-full bg-[#C6A75E] px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#071A2B] transition duration-300 hover:-translate-y-1 hover:bg-white'
              >
                <CalendarDays size={16} />

                {t.program.day1}

                <ArrowUpRight size={15} className={isArabic ? '-rotate-90' : ''} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className='absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#C6A75E] to-transparent' />
      </section>

      {/* =====================================================
          OFFICIAL TWO-DAY SUMMIT PROGRAM
      ===================================================== */}

      <section id='summit-program' className='relative overflow-hidden py-24 md:py-32'>
        <div className='pointer-events-none absolute right-[-10%] top-[-10%] h-[550px] w-[550px] rounded-full bg-royal/[0.035] blur-[120px]' />

        <div className='pointer-events-none absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-champagne/[0.06] blur-[120px]' />

        <div className='relative mx-auto max-w-7xl px-6'>
          {/* Section introduction */}
          <Reveal>
            <div className='mb-16 max-w-3xl'>
              <div className='mb-4 flex items-center gap-3'>
                <span className='h-px w-10 bg-royal' />

                <span className='text-[10px] font-bold uppercase tracking-[0.25em] text-royal'>
                  {t.program.eyebrow}
                </span>
              </div>

              <h2 className='font-display text-4xl font-semibold leading-tight text-navy md:text-6xl'>
                {t.program.title}
              </h2>

              <p className='mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-[15px]'>
                {t.program.intro}
              </p>
            </div>
          </Reveal>

          {/* Day 1 (à droite en AR) and Day 2 (à gauche en AR) */}
          <div className='grid items-start gap-7 lg:grid-cols-2 lg:gap-8'>
            <DayCard
              day={t.program.day1}
              title={t.program.day1Title}
              items={dayOne}
              t={t}
              isArabic={isArabic}
            />

            <DayCard
              day={t.program.day2}
              title={t.program.day2Title}
              items={dayTwo}
              t={t}
              isArabic={isArabic}
            />
          </div>

          {/* Section separator */}
          <Reveal delay={0.2}>
            <div className='mt-16 flex items-center justify-center gap-4'>
              <div className='h-px w-24 bg-gradient-to-r from-transparent to-slate-300' />

              <div className='h-2 w-2 rotate-45 bg-champagne' />

              <div className='h-px w-24 bg-gradient-to-l from-transparent to-slate-300' />
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          AI WORKSHOP
      ===================================================== */}

      <section className='relative overflow-hidden bg-navy py-24 text-white md:py-32'>
        <div className='pointer-events-none absolute inset-0'>
          <div className='absolute left-[-15%] top-[-20%] h-[600px] w-[600px] rounded-full bg-royal/20 blur-[130px]' />

          <div className='absolute bottom-[-20%] right-[-15%] h-[600px] w-[600px] rounded-full bg-champagne/10 blur-[130px]' />

          <div
            className='absolute inset-0 opacity-[0.025]'
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '70px 70px',
            }}
          />
        </div>

        <div className='relative mx-auto max-w-7xl px-6'>
          <Reveal>
            <div className='mb-16 max-w-3xl'>
              <div className='mb-5 flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full border border-champagne/30 bg-champagne/10'>
                  <Sparkles size={17} className='text-champagne' />
                </div>

                <span className='text-[10px] font-bold uppercase tracking-[0.25em] text-champagne'>
                  {t.ai.eyebrow}
                </span>
              </div>

              <SectionHeader eyebrow='' title={t.ai.title} text={t.ai.text} light />
            </div>
          </Reveal>

          {/* AI Workshop Day 1 (à droite en AR) and Day 2 (à gauche en AR) */}
          <div className='grid gap-7 lg:grid-cols-2 lg:gap-8'>
            <AIDayCard day={t.ai.day1} items={aiDayOne} t={t} isArabic={isArabic} />

            <AIDayCard day={t.ai.day2} items={aiDayTwo} t={t} isArabic={isArabic} />
          </div>

          <Reveal delay={0.2}>
            <div className='mt-16 flex items-center justify-center gap-4'>
              <div className='h-px w-24 bg-gradient-to-r from-transparent to-champagne/50' />

              <Sparkles size={15} className='text-champagne' />

              <div className='h-px w-24 bg-gradient-to-l from-transparent to-champagne/50' />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
