import {
  ArrowRight,
  Award,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Reveal } from '../components/Animated';
import ThemeIcon from '../components/ThemeIcon';
import { themes, outcomes, images, ecosystem } from '../data/content';
import AIBackground from '../components/AIBackground';
import type { Translation } from '../translations';

type HomeValueItemKey =
  'vision' | 'practice' | 'quality' | 'responsibleAI' | 'accreditation' | 'action';

type ThemeTupleKey =
  'future' | 'teaching' | 'assessment' | 'governance' | 'ethics' | 'implementation';

type OutcomeItemKey =
  | 'maturity'
  | 'plan90'
  | 'policy'
  | 'activities'
  | 'schoolPlan'
  | 'risk'
  | 'strategy'
  | 'certificate';

type EcosystemItemKey = 'advisory' | 'academy' | 'events' | 'digital' | 'accreditation';

interface ValueCardDef {
  key: HomeValueItemKey;
  icon: LucideIcon;
  number: string;
  title: string;
  text: string;
}

const VALUE_CARDS: ValueCardDef[] = [
  {
    key: 'vision',
    icon: Target,
    number: '01',
    title: 'Vision',
    text: 'Understand what future-ready schooling means.',
  },
  {
    key: 'practice',
    icon: Lightbulb,
    number: '02',
    title: 'Practice',
    text: 'Leave with methods and tools you can use.',
  },
  {
    key: 'quality',
    icon: Award,
    number: '03',
    title: 'Quality',
    text: 'Connect innovation with measurable school improvement.',
  },
  {
    key: 'responsibleAI',
    icon: BrainCircuit,
    number: '04',
    title: 'Responsible AI',
    text: 'Use AI with clear safeguards and human oversight.',
  },
  {
    key: 'accreditation',
    icon: ShieldCheck,
    number: '05',
    title: 'Accreditation',
    text: 'Strengthen evidence, systems and readiness.',
  },
  {
    key: 'action',
    icon: CheckCircle2,
    number: '06',
    title: 'Action',
    text: 'Turn ideas into a realistic school roadmap.',
  },
];

export default function Home({ t }: { t: Translation }) {
  const isArabic = t.isRtl;

  const aboutCards: Array<[LucideIcon, string, string]> = [
    [Building2, t.about.quality, t.about.qualityText],
    [BrainCircuit, t.about.ai, t.about.aiText],
    [Sparkles, t.about.digital, t.about.digitalText],
  ];

  const homeValueItems = t.homeValue?.items as
    Partial<Record<HomeValueItemKey, { title: string; text: string }>> | undefined;

  return (
    <main dir={isArabic ? 'rtl' : 'ltr'}>
      {/* HERO */}
      <section className='relative flex min-h-screen items-center overflow-hidden bg-navy text-white'>
        <AIBackground dark />

        <img
          src='/image/hero/Home.jpg'
          alt='International education conference'
          className='absolute inset-0 z-0 h-full w-full object-cover'
        />

        <div
          className={`absolute inset-0 z-[1] ${
            isArabic
              ? 'bg-gradient-to-l from-[#071A2B]/95 via-[#071A2B]/80 to-[#071A2B]/35'
              : 'bg-gradient-to-r from-[#071A2B]/95 via-[#071A2B]/80 to-[#071A2B]/35'
          }`}
        />

        <div className='absolute inset-0 z-[1] bg-[radial-gradient(circle_at_75%_45%,rgba(56,117,173,.20),transparent_45%)]' />

        <div className='pointer-events-none absolute -right-32 top-20 z-[2] h-96 w-96 rounded-full border border-white/10' />
        <div className='pointer-events-none absolute -right-16 top-36 z-[2] h-64 w-64 rounded-full border border-champagne/20' />

        <div className='pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-navy to-transparent' />

        <div className='relative z-10 flex min-h-screen w-full max-w-7xl items-start justify-start px-6 pb-24 pt-32'>
          <div className='max-w-5xl'>
            <Reveal>
              <div className='mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] backdrop-blur-md'>
                <span className='h-1.5 w-1.5 rounded-full bg-champagne shadow-[0_0_15px_#C9A96E]' />
                {t.hero.eyebrow}
              </div>

              <h1 className='max-w-5xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl'>
                {t.hero.title}
              </h1>

              <div className='mt-8 h-px w-24 bg-champagne' />

              <p className='mt-8 max-w-3xl text-xl font-medium leading-8 text-white/95 md:text-2xl'>
                {t.hero.subtitle}
              </p>

              <p className='mt-5 max-w-2xl text-base leading-8 text-slate-200 md:text-lg'>
                {t.hero.text}
              </p>

              <div className='mt-9 flex flex-wrap gap-4'>
                <Link
                  to='/register'
                  className='group inline-flex items-center gap-3 rounded-full bg-champagne px-7 py-4 text-xs font-extrabold uppercase tracking-wider text-navy shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-white'
                >
                  {t.hero.primary}
                  <ArrowRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      isArabic
                        ? 'rotate-180 group-hover:-translate-x-1'
                        : 'group-hover:translate-x-1'
                    }`}
                  />
                </Link>

                <Link
                  to='/about'
                  className='inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-champagne hover:bg-white/10'
                >
                  {t.hero.secondary}
                </Link>
              </div>

              {/* Event information */}
              <div className='mt-12 grid max-w-2xl grid-cols-1 gap-5 border-t border-white/20 pt-6 sm:grid-cols-3 sm:gap-0'>
                <div className='sm:pe-5'>
                  <div className='text-xs font-bold tracking-[0.16em] text-champagne'>
                    {t.hero.days}
                  </div>
                  <div className='mt-2 text-sm text-white/75'>{t.hero.date}</div>
                </div>

                <div className='border-white/15 sm:border-x sm:px-5'>
                  <div className='text-xs font-bold tracking-[0.16em] text-champagne'>
                    {isArabic ? 'الموقع' : 'LOCATION'}
                  </div>
                  <div className='mt-2 text-sm text-white/75'>{t.hero.location}</div>
                </div>

                <div className='sm:ps-5'>
                  <div className='text-xs font-bold tracking-[0.16em] text-champagne'>
                    {isArabic ? 'الصيغة' : 'FORMAT'}
                  </div>
                  <div className='mt-2 text-sm text-white/75'>
                    {isArabic ? 'قمة + ورش عمل' : 'Summit + Workshops'}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className='pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.35em] text-white/60'>
          {t.hero.scroll}
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className='pointer-events-none absolute bottom-7 left-1/2 z-10 h-10 w-px bg-gradient-to-b from-champagne to-transparent'
        />
      </section>

      {/* ABOUT THE SUMMIT */}
      <section className='page-bg py-24 md:py-32'>
        <div className='mx-auto max-w-7xl px-6'>
          <Reveal>
            <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} text={t.about.text} />
          </Reveal>

          <div className='mt-12 grid gap-5 md:grid-cols-3'>
            {aboutCards.map(([Icon, title, text], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className='luxe-card group h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-500 hover:border-royal/30 hover:shadow-luxe'
                >
                  <div className='mb-10 grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-royal transition-colors duration-300 group-hover:bg-royal group-hover:text-white'>
                    <Icon size={23} />
                  </div>

                  <h3 className='font-display text-2xl font-semibold text-navy'>{title}</h3>

                  <p className='mt-3 leading-7 text-slate-600'>{text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / VALUE STRIP — PREMIUM DESIGN */}
      <section className='relative z-20 overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-white via-slate-50/70 to-white py-16 md:py-20'>
        <div className='pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl' />
        <div className='pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-amber-100/25 blur-3xl' />

        <div className='relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8'>
          <Reveal>
            <div className='mx-auto mb-12 max-w-2xl text-center md:mb-14'>
              <span className='inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-royal shadow-sm'>
                <span className='h-1.5 w-1.5 rounded-full bg-champagne' />
                {t.homeValue?.eyebrow ?? 'THE SUMMIT ADVANTAGE'}
              </span>

              <h2 className='mt-5 font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl lg:text-4xl'>
                {t.homeValue?.title ?? 'Ideas that lead to meaningful change'}
              </h2>

              <p className='mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base'>
                {t.homeValue?.description ??
                  'Discover the insights, practical tools and strategic perspectives to build future-ready schools.'}
              </p>

              <div className='mx-auto mt-6 flex items-center justify-center gap-2'>
                <div className='h-px w-10 bg-gradient-to-r from-transparent to-champagne' />
                <div className='h-1.5 w-1.5 rotate-45 bg-champagne' />
                <div className='h-px w-10 bg-gradient-to-l from-transparent to-champagne' />
              </div>
            </div>
          </Reveal>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5'>
            {VALUE_CARDS.map((item, i) => {
              const Icon = item.icon;
              const translated = homeValueItems?.[item.key];

              return (
                <Reveal key={item.key} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 22,
                    }}
                    className='group relative flex h-full min-h-[225px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.025)] transition-all duration-300 hover:border-amber-300/80 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-7'
                  >
                    <div className='absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-royal via-blue-500 to-champagne transition-all duration-500 group-hover:w-full' />

                    <div className='mb-6 flex items-center justify-between'>
                      <span className='font-display text-xs font-semibold tracking-[0.18em] text-slate-300 transition-colors duration-300 group-hover:text-champagne'>
                        {item.number}
                      </span>

                      <div className='grid h-12 w-12 place-items-center rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 text-royal transition-all duration-300 group-hover:border-royal group-hover:bg-royal group-hover:text-white'>
                        <Icon size={21} strokeWidth={1.7} />
                      </div>
                    </div>

                    <h3 className='font-display text-lg font-semibold tracking-tight text-navy transition-colors duration-300 group-hover:text-royal'>
                      {translated?.title ?? item.title}
                    </h3>

                    <p className='mt-3 flex-1 text-sm leading-7 text-slate-600'>
                      {translated?.text ?? item.text}
                    </p>

                    <div className='mt-6 flex items-center gap-2'>
                      <div className='h-px w-8 bg-champagne transition-all duration-300 group-hover:w-14' />
                      <span className='h-1 w-1 rounded-full bg-slate-300 transition-colors group-hover:bg-royal' />
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.25}>
            <div className='mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4'>
              <div className='flex -space-x-1'>
                <span className='h-2 w-2 rounded-full bg-royal' />
                <span className='h-2 w-2 rounded-full bg-blue-400' />
                <span className='h-2 w-2 rounded-full bg-champagne' />
              </div>

              <p className='text-xs font-medium tracking-wide text-slate-500 sm:text-sm'>
                {t.homeValue?.footer ??
                  'One summit. Six pillars. A clearer path to school excellence.'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SUMMIT THEMES */}
      <section className='relative overflow-hidden bg-navy py-24 text-white md:py-32'>
        <AIBackground dark />

        <div className='relative z-10 mx-auto max-w-7xl px-6'>
          <Reveal>
            <SectionHeader eyebrow={t.themes.eyebrow} title={t.themes.title} light />
          </Reveal>

          <div className='mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3'>
            {themes.map((item, i) => {
              const rawTheme = t.themes[item.key as ThemeTupleKey];
              const themePair = Array.isArray(rawTheme) ? rawTheme : ['', ''];

              return (
                <Reveal key={item.key} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className='luxe-card group h-full bg-navy p-8 transition-colors duration-300 hover:bg-deepblue'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='font-display text-3xl text-champagne/80'>{item.no}</span>

                      <div className='text-sky'>
                        <ThemeIcon name={item.icon} />
                      </div>
                    </div>

                    <h3 className='mt-12 font-display text-2xl font-semibold'>{themePair[0]}</h3>

                    <p className='mt-3 leading-7 text-slate-400'>{themePair[1]}</p>

                    <div className='mt-6 h-px w-10 bg-champagne/70 transition-all duration-300 group-hover:w-20' />
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPECTED OUTCOMES */}
      <section className='page-bg py-24 md:py-32'>
        <div className='mx-auto max-w-7xl px-6'>
          <Reveal>
            <SectionHeader eyebrow={t.outcomes.eyebrow} title={t.outcomes.title} />
          </Reveal>

          <div className='mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {outcomes.map((key, i) => {
              const outcomeLabel = t.outcomes.items[key as OutcomeItemKey] ?? String(key);

              return (
                <Reveal key={String(key)} delay={i * 0.04}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className='flex h-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-champagne/70 hover:shadow-md'
                  >
                    <span className='grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-champagne'>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className='font-semibold leading-6 text-navy'>{outcomeLabel}</span>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI WORKSHOP */}
      <section className='relative overflow-hidden bg-deepblue py-24 text-white md:py-32'>
        <AIBackground dark />

        <img
          src={images.ai}
          alt='Artificial intelligence and education'
          loading='lazy'
          className='absolute inset-0 h-full w-full object-cover opacity-20'
        />

        <div className='absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-deepblue/80' />

        <div className='relative z-10 mx-auto max-w-7xl px-6'>
          <Reveal>
            <SectionHeader eyebrow={t.ai.eyebrow} title={t.ai.title} text={t.ai.text} light />

            <Link
              to='/program'
              className='mt-8 inline-flex items-center gap-3 rounded-full bg-champagne px-7 py-4 text-xs font-extrabold uppercase tracking-wider text-navy transition duration-300 hover:-translate-y-1 hover:bg-white'
            >
              {t.hero.secondary}
              <ArrowRight size={16} className={isArabic ? 'rotate-180' : ''} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className='page-bg py-24 md:py-32'>
        <div className='mx-auto max-w-7xl px-6'>
          <Reveal>
            <SectionHeader eyebrow={t.ecosystem.eyebrow} title={t.ecosystem.title} />
          </Reveal>

          <div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5'>
            {ecosystem.map((item, i) => {
              const ecoData = t.ecosystem[item.key as EcosystemItemKey];

              return (
                <Reveal key={item.key} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className='h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-champagne/70 hover:shadow-luxe'
                  >
                    <div className='mb-5 grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-royal'>
                      <Sparkles size={19} />
                    </div>

                    <h3 className='font-display text-xl font-semibold text-navy'>
                      {ecoData?.title}
                    </h3>

                    <p className='mt-3 text-sm leading-7 text-slate-600'>{ecoData?.text}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* REGISTRATION CTA */}
      <section className='bg-mist py-20 md:py-24'>
        <div className='mx-auto max-w-7xl px-6'>
          <Reveal>
            <div className='relative overflow-hidden rounded-3xl bg-navy p-8 text-white md:p-16'>
              <div className='pointer-events-none absolute -right-12 -top-12 h-72 w-72 rounded-full border border-white/10' />
              <div className='pointer-events-none absolute right-10 top-10 h-48 w-48 rounded-full bg-royal/30 blur-3xl' />
              <div className='pointer-events-none absolute bottom-0 left-0 h-1 w-40 bg-champagne' />

              <div className='relative max-w-3xl'>
                <div className='mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-champagne'>
                  <Sparkles size={16} />
                  {t.register.eyebrow}
                </div>

                <h2 className='font-display text-4xl font-semibold leading-tight md:text-5xl'>
                  {t.register.title}
                </h2>

                <p className='mt-5 max-w-2xl leading-8 text-slate-300'>{t.register.text}</p>

                <Link
                  to='/register'
                  className='mt-8 inline-flex items-center gap-3 rounded-full bg-champagne px-7 py-4 text-xs font-extrabold uppercase tracking-wider text-navy transition duration-300 hover:-translate-y-1 hover:bg-white'
                >
                  {t.nav.register}
                  <ArrowRight size={16} className={isArabic ? 'rotate-180' : ''} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
