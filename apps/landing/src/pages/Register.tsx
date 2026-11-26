import { useState } from 'react';
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Coffee,
  Cpu,
  Info,
  Laptop,
  MapPin,
  Store,
  Target,
  Users,
  ArrowRight,
} from 'lucide-react';
import PageHero, { Reveal } from '../components/Animated';
import type { Translation } from '../translations';

export default function Register({ t }: { t: Translation }) {
  const c = t.registrationPage;
  const [sent, setSent] = useState(false);
  const [pass, setPass] = useState(c.passes?.[1]?.name || c.passes?.[0]?.name || 'Standard Pass');
  const [workshop, setWorkshop] = useState('');
  const [highlightForm, setHighlightForm] = useState(false);

  const scrollToForm = (selectedPass?: string) => {
    if (selectedPass) setPass(selectedPass);
    setHighlightForm(true);
    setTimeout(() => {
      document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // 5 éléments "Your pass includes"
  const includedItems = [
    {
      icon: Users,
      label: c.included?.[0] || 'Conference sessions and expert panels',
    },
    {
      icon: Laptop,
      label: c.included?.[1] || 'One hands-on workshop (pre-registration, subject to capacity)',
    },
    {
      icon: Award,
      label: c.included?.[2] || 'Digital resources and participation certificate',
    },
    {
      icon: Store,
      label: c.included?.[3] || 'Access to exhibition and networking area',
    },
    {
      icon: Coffee,
      label: c.included?.[4] || 'Coffee breaks on both days',
    },
  ];

  // 3 cartes "Why attend"
  const whyAttendCards = [
    {
      icon: Target,
      topBar: 'bg-[#E5B84B]',
      iconBg: 'bg-[#FDF6E7] text-[#D49B27]',
      text: c.benefits?.[0] || 'Practical school improvement ideas',
    },
    {
      icon: Cpu,
      topBar: 'bg-[#2C8C99]',
      iconBg: 'bg-[#E8F4F6] text-[#1E7E8B]',
      text: c.benefits?.[1] || 'AI & innovation for education',
    },
    {
      icon: Users,
      topBar: 'bg-[#D9822B]',
      iconBg: 'bg-[#FDF3E7] text-[#D9822B]',
      text: c.benefits?.[2] || 'Networking with leaders and partners',
    },
  ];

  type RegistrationPageContent = typeof c & {
    importantNotes?: string[];
    goodToKnow?: string;
  };

  const content = c as RegistrationPageContent;

  const notesList: string[] = Array.isArray(content.importantNotes)
    ? content.importantNotes
    : typeof content.goodToKnow === 'string' && content.goodToKnow.trim()
      ? content.goodToKnow
          .split(/[•·\n]+/)
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [
          'Accommodation and travel are not included.',
          'Workshop places are limited.',
          'Group invoicing is available for schools.',
        ];

  return (
    <main className='page-bg'>
      <PageHero eyebrow={c.eyebrow} title={c.title} text={c.text} />

      <section className='mx-auto max-w-7xl px-6 py-20 md:py-28'>
        <Reveal>
          <div className='mx-auto max-w-3xl text-center'>
            <p className='text-xs font-bold uppercase tracking-[.24em] text-[#A78337]'>
              {c.summitBadge || 'FES SUMMIT 2027'}
            </p>

            <h2 className='mt-4 font-display text-3xl font-semibold text-navy md:text-5xl'>
              {c.why}
            </h2>

            <p className='mt-5 leading-8 text-slate-600'>{c.intro}</p>
          </div>
        </Reveal>
      </section>

      {/* CONTENU PRINCIPAL */}
      <div className='mx-auto max-w-6xl space-y-14 px-6 py-16 md:py-20'>
        {/* SECTION 1 : REGISTRATION & TICKETS */}
        <section id='registration-tickets'>
          <Reveal>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
              {c.registrationEyebrow || 'REGISTRATION'}
            </p>
            <h2 className='mt-2 font-display text-2xl font-bold text-[#0B253A] md:text-4xl'>
              {c.tickets || 'Registration & tickets'}
            </h2>
            <p className='mt-2 text-sm text-slate-600 md:text-base'>
              {c.ticketNote || 'Choose the pass that fits your role and participation needs.'}
            </p>
          </Reveal>

          <div className='mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {c.passes?.map((p: any, i: number) => {
              const isRecommended =
                Boolean(p.recommended) ||
                (!c.passes?.some((item: any) => item.recommended) && i === 1);

              return (
                <Reveal key={p.name} delay={i * 0.04}>
                  <article
                    onClick={() => scrollToForm(p.name)}
                    className={`flex h-full cursor-pointer flex-col justify-between rounded-2xl border bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md md:p-6 ${
                      isRecommended
                        ? 'border-[#E5B84B] ring-1 ring-[#E5B84B]/50 shadow-sm'
                        : 'border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className='flex min-h-[22px] items-center justify-between gap-2'>
                        <h3 className='text-sm font-bold text-[#0B253A] md:text-base'>{p.name}</h3>
                        {isRecommended && (
                          <span className='rounded-md bg-[#FDF3D7] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#B68216]'>
                            RECOMMENDED
                          </span>
                        )}
                      </div>

                      <p className='mt-2 font-display text-2xl font-extrabold text-[#0B253A] md:text-[26px]'>
                        {p.fee}
                      </p>
                    </div>

                    <p className='mt-3 text-xs leading-relaxed text-slate-500 md:text-[13px]'>
                      {p.detail}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SECTION 2 : YOUR PASS INCLUDES */}
        <section>
          <Reveal>
            <div className='rounded-2xl border border-[#D8E7EB] bg-gradient-to-r from-[#EBF4F6] via-[#F2F8F9] to-[#EBF4F6] p-6 md:p-8'>
              <h2 className='font-display text-lg font-bold text-[#0B253A] md:text-xl'>
                {c.includes || 'Your pass includes'}
              </h2>

              <div className='mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5'>
                {includedItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className='flex flex-col items-center text-center'>
                      <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-white/85 text-[#1E7E8B] shadow-2xs'>
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <span className='mt-3 text-xs font-bold leading-snug text-[#0B253A] md:text-[13px]'>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 3 : WHY ATTEND */}
        <section>
          <Reveal>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
              {c.whyAttendEyebrow || 'WHY ATTEND'}
            </p>
            <h2 className='mt-2 font-display text-2xl font-bold text-[#0B253A] md:text-4xl'>
              {c.why || 'Why attend'}
            </h2>
          </Reveal>

          <div className='mt-6 grid gap-4 md:grid-cols-3'>
            {whyAttendCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className='relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm'>
                    <div className={`absolute inset-x-0 top-0 h-1 ${item.topBar}`} />
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <p className='text-xs font-bold leading-snug text-[#0B253A] md:text-sm'>
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SECTION 4 : IMPORTANT NOTES */}
        <section>
          <Reveal>
            <div className='flex flex-col gap-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm md:flex-row md:items-center md:gap-8 md:px-8'>
              <div className='flex shrink-0 items-center gap-3'>
                <div className='flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0B253A] text-[#0B253A]'>
                  <Info size={18} strokeWidth={2.2} />
                </div>
                <span className='font-display text-base font-bold text-[#0B253A]'>
                  {c.notesTitle || 'Important notes'}
                </span>
              </div>

              <div className='hidden h-12 w-px bg-slate-200 md:block' />

              <ul className='space-y-1.5 text-xs text-slate-600 md:text-sm'>
                {notesList.map((note) => (
                  <li key={note} className='flex items-center gap-2.5'>
                    <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-[#2C8C99]' />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* SECTION 5 : CTA BANNER SOMBRE */}
        <Reveal>
          <section className='flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#0B253A] px-7 py-8 text-white shadow-lg md:flex-row md:items-center md:px-10 md:py-9'>
            <div>
              <h2 className='font-display text-xl font-bold text-white md:text-2xl'>
                {c.bannerTitle || 'Ready to join FES Summit 2027?'}
              </h2>
              <p className='mt-1.5 text-sm text-slate-300'>
                {c.bannerText ||
                  'Secure your place and bring your school team to Sousse in May 2027.'}
              </p>
            </div>
            <button
              onClick={() => scrollToForm()}
              className='shrink-0 rounded-xl bg-[#E5B84B] px-6 py-3.5 text-sm font-bold text-[#0B253A] transition hover:bg-[#ecc563]'
            >
              {c.bannerButton || 'Start registration'}
            </button>
          </section>
        </Reveal>

        {/* FORMULAIRE INTERACTIF D'INSCRIPTION */}
        <Reveal>
          <section
            id='registration-form'
            className={`grid gap-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all md:grid-cols-[0.75fr_1.25fr] md:p-10 ${
              highlightForm ? 'ring-2 ring-[#E5B84B]' : ''
            }`}
          >
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
                {c.formEyebrow || 'TAKE PART'}
              </p>
              <h2 className='mt-3 font-display text-2xl font-bold text-[#0B253A] md:text-3xl'>
                {c.formTitle}
              </h2>
              <p className='mt-4 text-sm leading-7 text-slate-600'>{c.formText}</p>
              <div className='mt-8 space-y-3 text-sm text-slate-600'>
                <p className='flex items-center gap-3'>
                  <CalendarDays size={17} className='text-[#1E7E8B]' />
                  May 2027
                </p>
                <p className='flex items-center gap-3'>
                  <MapPin size={17} className='text-[#1E7E8B]' />
                  Sousse, Tunisia
                </p>
              </div>
            </div>

            {sent ? (
              <div className='flex min-h-72 flex-col items-center justify-center rounded-xl bg-emerald-50/70 p-6 text-center'>
                <CheckCircle2 size={46} className='text-emerald-600' />
                <p className='mt-4 max-w-md text-sm leading-7 text-slate-700'>{c.success}</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className='grid gap-4 sm:grid-cols-2'
              >
                {c.fields?.map((f: string, i: number) => (
                  <label key={f} className='text-xs font-bold text-[#0B253A]'>
                    {f}
                    <input
                      required={i === 0 || i === 4}
                      type={i === 4 ? 'email' : 'text'}
                      className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none transition focus:border-[#1E7E8B] focus:bg-white'
                    />
                  </label>
                ))}

                <label className='text-xs font-bold text-[#0B253A]'>
                  {c.ticketLabel}
                  <select
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-[#1E7E8B] focus:bg-white'
                  >
                    {c.passes?.map((p: any) => (
                      <option key={p.name} value={p.name}>
                        {p.name} ({p.fee})
                      </option>
                    ))}
                  </select>
                </label>

                <label className='text-xs font-bold text-[#0B253A]'>
                  {c.workshopLabel}
                  <select
                    value={workshop}
                    onChange={(e) => setWorkshop(e.target.value)}
                    className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-[#1E7E8B] focus:bg-white'
                  >
                    <option value=''>{c.select}</option>
                    {c.workshopItems?.map((x: string) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </label>

                <label className='flex items-start gap-3 text-xs font-normal text-slate-600 sm:col-span-2'>
                  <input required type='checkbox' className='mt-0.5 accent-[#1E7E8B]' />
                  <span>{c.consent}</span>
                </label>

                <button
                  type='submit'
                  className='inline-flex w-fit items-center gap-2.5 rounded-xl bg-[#0B253A] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#143a58] sm:col-span-2'
                >
                  {c.submit}
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </section>
        </Reveal>
      </div>
    </main>
  );
}
