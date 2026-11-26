import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Handshake,
  Headphones,
  Info,
  Store,
  Target,
  Users,
  Wifi,
} from 'lucide-react';
import PageHero, { Reveal } from '../components/Animated';

export default function Exhibition({ t }: { t: any }) {
  const c = t.exhibitionPage;
  const isRtl = Boolean(t?.isRtl);
  const [sent, setSent] = useState(false);
  const [pack, setPack] = useState(c.stands?.[1]?.name || c.stands?.[0]?.name || 'Standard Booth');
  const [highlightForm, setHighlightForm] = useState(false);

  const scrollToForm = (selectedPack?: string) => {
    if (selectedPack) setPack(selectedPack);
    setHighlightForm(true);
    setTimeout(() => {
      document.getElementById('exhibitor-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Styles des 3 cartes d'exposition (Startup, Standard, Premium)
  const standStyles = [
    {
      card: 'border-slate-200/90 shadow-sm',
      topBar: 'bg-[#2C8C99]',
      dot: 'bg-[#2C8C99]',
      badge: null,
    },
    {
      card: 'border-slate-200/90 shadow-sm',
      topBar: 'bg-[#4A90A4]',
      dot: 'bg-[#2C8C99]',
      badge: null,
    },
    {
      card: 'border-[#E5B84B] ring-1 ring-[#E5B84B]/50 shadow-md',
      topBar: 'bg-[#E5B84B]',
      dot: 'bg-[#D9822B]',
      badge: c.premiumBadge || 'PREMIUM',
    },
  ];

  // 4 cartes "Benefits for exhibitors" liées à t.exhibitionPage (avec fallback sur t.exhibitorsPage)
  const benefitsList = c.benefitCards || t?.exhibitorsPage?.benefitCards;
  const benefitCards = [
    {
      text: benefitsList?.[0] ?? 'Present products and services directly',
      icon: Target,
      topBar: 'bg-[#E5A93C]',
      iconBg: 'bg-[#FDF6E7] text-[#E5A93C]',
    },
    {
      text: benefitsList?.[1] ?? 'Meet school leaders and buyers',
      icon: Users,
      topBar: 'bg-[#1E7E8B]',
      iconBg: 'bg-[#EBF6F7] text-[#1E7E8B]',
    },
    {
      text: benefitsList?.[2] ?? 'Generate qualified leads',
      icon: BarChart3,
      topBar: 'bg-[#1E7E8B]',
      iconBg: 'bg-[#EBF6F7] text-[#1E7E8B]',
    },
    {
      text: benefitsList?.[3] ?? 'Strengthen presence in education market',
      icon: Handshake,
      topBar: 'bg-[#E5A93C]',
      iconBg: 'bg-[#FDF6E7] text-[#E5A93C]',
    },
  ];

  // 5 éléments "Exhibitor support"
  const supportItems = [
    { icon: Store, label: c.included?.[0] || 'Display space' },
    { icon: Headphones, label: c.included?.[1] || 'On-site support' },
    { icon: Users, label: c.included?.[2] || 'Access to networking area' },
    { icon: FileText, label: c.included?.[3] || 'Listing on event materials' },
    { icon: Wifi, label: c.included?.[4] || 'Wi-Fi / basic utilities' },
  ];

  const notesList: string[] = Array.isArray(c.importantNotes)
    ? c.importantNotes
    : Array.isArray(c.tipItems)
      ? c.tipItems
      : c.logistics
        ? [c.logistics]
        : [
            'Booth allocation is subject to availability.',
            'Final dimensions and facilities will be confirmed by the organizer.',
            'Custom packages may be available on request.',
          ];

  return (
    <main className='page-bg' dir={isRtl ? 'rtl' : 'ltr'}>
      <PageHero eyebrow={c.eyebrow} title={c.title} text={c.text} />

      <section className='mx-auto max-w-7xl px-6 pt-14 pb-8 md:pt-20 md:pb-10'>
        <Reveal>
          <div className='mx-auto flex max-w-4xl flex-col items-center text-center'>
            <h2 className='font-display text-3xl font-semibold text-navy md:text-5xl'>
              {c.introTitle}
            </h2>

            <p className='mt-5 max-w-2xl text-base leading-8 text-slate-600'>{c.intro}</p>
          </div>
        </Reveal>
      </section>

      {/* CONTENU PRINCIPAL */}
      <div className='mx-auto max-w-6xl space-y-16 px-6 pt-6 pb-16 md:pt-8 md:pb-20'>
        {/* SECTION 1 : EXHIBITOR PACKAGES */}
        <section>
          <Reveal>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
              {c.exhibitionEyebrow || 'EXHIBITION'}
            </p>
            <h2 className='mt-2 font-display text-2xl font-bold text-[#0B253A] md:text-4xl'>
              {c.packages || 'Exhibitor packages'}
            </h2>
            <p className='mt-2 text-sm text-slate-600 md:text-base'>
              {c.packageNote ||
                'Choose the exhibition package that best matches your display needs and audience engagement goals.'}
            </p>
          </Reveal>

          <div className='mt-8 grid gap-6 md:grid-cols-3'>
            {c.stands?.map((p: any, i: number) => {
              const style = (standStyles[i] ?? standStyles[1])!;
              const bulletList: string[] = Array.isArray(p.items)
                ? p.items
                : typeof p.detail === 'string'
                  ? p.detail
                      .split(/[•·\n]+/)
                      .map((s: string) => s.trim())
                      .filter(Boolean)
                  : [];

              return (
                <Reveal key={p.name} delay={i * 0.05}>
                  <article
                    onClick={() => scrollToForm(p.name)}
                    className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg ${style.card}`}
                  >
                    {/* Barre supérieure colorée */}
                    <div className={`absolute inset-x-0 top-0 h-1.5 ${style.topBar}`} />

                    {/* Badge PREMIUM ou espace réservé pour alignement */}
                    {style.badge ? (
                      <span className='mb-3 w-fit rounded-md bg-[#FDF3D7] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#B68216]'>
                        {style.badge}
                      </span>
                    ) : (
                      <div className='mb-3 h-[22px]' />
                    )}

                    <h3 className='text-base font-bold text-[#0B253A]'>{p.name}</h3>
                    <p className='mt-1.5 font-display text-2xl font-extrabold text-[#0B253A] md:text-3xl'>
                      {p.price}
                    </p>

                    <div className='my-5 h-px bg-slate-100' />

                    <ul className='flex-1 space-y-2.5'>
                      {bulletList.map((item: string) => (
                        <li
                          key={item}
                          className='flex items-start gap-2.5 text-xs leading-relaxed text-slate-600 md:text-[13px]'
                        >
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className='mt-6 pt-2'>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold text-[#1E7E8B] transition ${
                          isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                        }`}
                      >
                        {c.cta || 'Select package'}
                        <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SECTION 2 : BENEFITS FOR EXHIBITORS */}
        <section className='py-8'>
          <Reveal>
            <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
              {c.whyExhibitEyebrow || 'WHY EXHIBIT'}
            </p>
            <h2 className='mt-1.5 font-display text-2xl font-bold tracking-tight text-[#0B253A] md:text-[32px]'>
              {c.whyExhibitTitle || 'Benefits for exhibitors'}
            </h2>
          </Reveal>

          <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {benefitCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className='relative flex h-full items-center gap-3.5 overflow-hidden rounded-xl border border-slate-200/90 bg-white px-4 py-4 shadow-[0_2px_10px_rgba(11,37,58,0.04)] transition-shadow hover:shadow-md'>
                    {/* Fine barre supérieure colorée */}
                    <div className={`absolute inset-x-0 top-0 h-[3px] ${item.topBar}`} />

                    {/* Icône encadrée */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
                    >
                      <Icon size={20} strokeWidth={1.9} />
                    </div>

                    {/* Texte de l'avantage */}
                    <p className='text-[13px] font-bold leading-[1.35] text-[#0B253A]'>
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SECTION 3 : EXHIBITOR SUPPORT */}
        <section>
          <Reveal>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
              {c.supportEyebrow || 'WHAT IS INCLUDED'}
            </p>
            <h2 className='mt-2 font-display text-2xl font-bold text-[#0B253A] md:text-4xl'>
              {c.supportTitle || 'Exhibitor support'}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className='mt-6 rounded-2xl border border-[#D8E7EB] bg-gradient-to-r from-[#EBF4F6] via-[#F2F8F9] to-[#EBF4F6] p-6 md:p-8'>
              <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5'>
                {supportItems.map((seg) => {
                  const Icon = seg.icon;
                  return (
                    <div key={seg.label} className='flex flex-col items-center text-center'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-white/85 text-[#1E7E8B] shadow-xs'>
                        <Icon size={24} strokeWidth={1.75} />
                      </div>
                      <span className='mt-3 text-xs font-bold text-[#0B253A] md:text-sm'>
                        {seg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>

        {/* SECTION 4 : IMPORTANT NOTES */}
        <section>
          <Reveal>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
              {c.notesEyebrow || 'IMPORTANT NOTES'}
            </p>
            <div className='mt-3 flex flex-col gap-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm md:flex-row md:items-center md:gap-8 md:px-8'>
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
                {c.bannerTitle || 'Interested in exhibiting at FES Summit 2027?'}
              </h2>
              <p className='mt-1.5 text-sm text-slate-300'>
                {c.bannerText ||
                  'Request availability and reserve your space with the organizing team.'}
              </p>
            </div>
            <button
              onClick={() => scrollToForm()}
              className='shrink-0 rounded-xl bg-[#E5B84B] px-6 py-3.5 text-sm font-bold text-[#0B253A] transition hover:bg-[#ecc563]'
            >
              {c.bannerButton || 'Book a booth'}
            </button>
          </section>
        </Reveal>

        {/* FORMULAIRE INTERACTIF DE RÉSERVATION */}
        <Reveal>
          <section
            id='exhibitor-form'
            className={`grid gap-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all md:grid-cols-[0.75fr_1.25fr] md:p-10 ${
              highlightForm ? 'ring-2 ring-[#E5B84B]' : ''
            }`}
          >
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
                {c.formEyebrow || 'SHOWCASE YOUR SOLUTION'}
              </p>
              <h2 className='mt-3 font-display text-2xl font-bold text-[#0B253A] md:text-3xl'>
                {c.formTitle}
              </h2>
              <p className='mt-4 text-sm leading-7 text-slate-600'>{c.note}</p>
            </div>

            {sent ? (
              <div className='flex items-center justify-center gap-4 rounded-xl bg-emerald-50/70 p-6 text-sm leading-7 text-slate-700'>
                <CheckCircle2 className='shrink-0 text-emerald-600' size={32} />
                <span>{c.success}</span>
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
                      required={i === 0 || i === 3}
                      type={i === 3 ? 'email' : 'text'}
                      className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none transition focus:border-[#1E7E8B] focus:bg-white'
                    />
                  </label>
                ))}

                <label className='text-xs font-bold text-[#0B253A]'>
                  {c.packageLabel}
                  <select
                    value={pack}
                    onChange={(e) => setPack(e.target.value)}
                    className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-[#1E7E8B] focus:bg-white'
                  >
                    {c.stands?.map((p: any) => (
                      <option key={p.name} value={p.name}>
                        {p.name} ({p.price})
                      </option>
                    ))}
                  </select>
                </label>

                <label className='text-xs font-bold text-[#0B253A] sm:col-span-2'>
                  {c.requirements}
                  <textarea
                    rows={2}
                    className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-[#1E7E8B] focus:bg-white'
                  />
                </label>

                <label className='text-xs font-bold text-[#0B253A] sm:col-span-2'>
                  {c.description}
                  <textarea
                    rows={3}
                    className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-[#1E7E8B] focus:bg-white'
                  />
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
                  <ArrowRight size={16} className={isRtl ? 'rotate-180' : ''} />
                </button>
              </form>
            )}
          </section>
        </Reveal>
      </div>
    </main>
  );
}
