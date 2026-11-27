import { createSponsorEnquiry } from '@/api/generated/client';
import { createSponsorEnquiryReqSchema } from '@excellense/contracts/schemas/sponsor-enquiry/create-sponsor-enquiry.req';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileText,
  GraduationCap,
  Handshake,
  Landmark,
  Laptop,
  Target,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageHero, { Reveal } from '../components/Animated';
import type { Translation } from '../translations';

const SPONSOR_FIELD_KEYS = [
  'organizationName',
  'sector',
  'contactNameAndRole',
  'workEmail',
  'phone',
  'country',
  'website',
] as const;

const SPONSORSHIP_LEVEL_OPTIONS = ['PLATINUM', 'GOLD', 'SILVER', 'BRONZE'] as const;

export default function Sponsorship({ t }: { t: Translation }) {
  const c = t.sponsorshipPage;
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createSponsorEnquiryReqSchema),
    defaultValues: {
      preferredSponsorshipLevel: 'PLATINUM' as (typeof SPONSORSHIP_LEVEL_OPTIONS)[number],
      boothRequirement: 'EXHIBITOR' as 'EXHIBITOR' | 'NO' | 'TO_BE_DISCUSSED',
      agreedToContact: false,
    },
  });

  const scrollToForm = (selectedTier?: (typeof SPONSORSHIP_LEVEL_OPTIONS)[number]) => {
    if (selectedTier) setValue('preferredSponsorshipLevel', selectedTier);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('sponsor-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const onSubmit = async (data: { agreedToContact?: boolean }) => {
    if (!data.agreedToContact) {
      setError('agreedToContact', { message: 'Please agree to be contacted.' });
      return;
    }

    setSubmitError(null);
    try {
      const { error, response } = await createSponsorEnquiry({
        body: data as never,
      });

      if (!response?.ok) {
        const message =
          error && typeof error === 'object' && 'message' in error
            ? String((error as { message: unknown }).message)
            : 'Failed to submit sponsorship enquiry. Please try again.';
        setSubmitError(message);
        return;
      }

      setSent(true);
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Failed to submit sponsorship enquiry. Please try again.',
      );
    }
  };

  // Styles spécifiques par palier pour reproduire les bordures supérieures de l'image
  const tierStyles = [
    {
      card: 'border-[#E5B84B] ring-1 ring-[#E5B84B]/50 shadow-md',
      topBar: 'bg-[#E5B84B]',
      dot: 'bg-[#E5B84B]',
      badge: true,
    },
    {
      card: 'border-slate-200/90 shadow-sm',
      topBar: 'bg-[#2C8C99]',
      dot: 'bg-[#2C8C99]',
      badge: false,
    },
    {
      card: 'border-slate-200/90 shadow-sm',
      topBar: 'bg-[#4A90A4]',
      dot: 'bg-[#4A90A4]',
      badge: false,
    },
    {
      card: 'border-slate-200/90 shadow-sm',
      topBar: 'bg-[#D9822B]',
      dot: 'bg-[#D9822B]',
      badge: false,
    },
  ];

  // Icônes et styles pour la section "What sponsors gain"
  const gainItems = [
    {
      icon: Target,
      text: t?.sponsorshipPage?.gainItems?.[0] ?? 'Brand visibility among schools and educators',
      topBar: 'bg-[#F4C44E]',
      iconColor: 'text-[#D99B26]',
    },
    {
      icon: Users,
      text: t?.sponsorshipPage?.gainItems?.[1] ?? 'Direct access to decision-makers',
      topBar: 'bg-[#238896]',
      iconColor: 'text-[#1E7E8B]',
    },
    {
      icon: Handshake,
      text: t?.sponsorshipPage?.gainItems?.[2] ?? 'Networking and lead generation',
      topBar: 'bg-[#238896]',
      iconColor: 'text-[#1E7E8B]',
    },
    {
      icon: Cpu,
      text:
        t?.sponsorshipPage?.gainItems?.[3] ?? 'Association with innovation and educational impact',
      topBar: 'bg-[#D97724]',
      iconColor: 'text-[#1E7E8B]',
    },
  ];

  // Audience ciblée ("Who you will reach")
  const audienceSegments = [
    {
      icon: Landmark,
      label: c.audienceSegments?.[0] ?? 'School leaders',
    },
    {
      icon: GraduationCap,
      label: c.audienceSegments?.[1] ?? 'Teachers',
    },
    {
      icon: Users,
      label: c.audienceSegments?.[2] ?? 'Education partners',
    },
    {
      icon: FileText,
      label: c.audienceSegments?.[3] ?? 'Policymakers',
    },
    {
      icon: Laptop,
      label: c.audienceSegments?.[4] ?? 'EdTech providers',
    },
  ];
  return (
    <main className='page-bg'>
      <PageHero eyebrow={c.eyebrow} title={c.title} text={c.text} />

      <section className='mx-auto max-w-7xl px-6 py-20 md:py-28'>
        <Reveal>
          <div className='mx-auto max-w-3xl text-center'>
            <p className='text-xs font-bold uppercase tracking-[.22em] text-[#A78337]'>
              {c.purposeEyebrow || 'PARTNERSHIP WITH PURPOSE'}
            </p>

            <h2 className='mt-4 font-display text-3xl font-semibold text-navy md:text-5xl'>
              {c.why}
            </h2>

            <p className='mt-5 leading-8 text-slate-600'>{c.intro}</p>
          </div>
        </Reveal>
      </section>

      {/* CONTENU PRINCIPAL */}
      <div className='mx-auto max-w-6xl space-y-16 px-6 py-16 md:py-20'>
        {/* SECTION 1 : SPONSORSHIP OPPORTUNITIES */}
        <section>
          <Reveal>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
              {c.sponsorshipEyebrow || 'SPONSORSHIP'}
            </p>
            <h2 className='mt-2 font-display text-2xl font-bold text-[#0B253A] md:text-4xl'>
              {c.packages || 'Sponsorship opportunities'}
            </h2>
            <p className='mt-2 text-sm text-slate-600 md:text-base'>
              {c.packageNote ||
                'Choose the level that best matches your visibility goals and engagement strategy.'}
            </p>
          </Reveal>

          <div className='mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {c.tiers.map((p: any, i: number) => {
              const style = (tierStyles[i] ?? tierStyles[1])!;
              return (
                <Reveal key={p.name} delay={i * 0.05}>
                  <article
                    onClick={() => scrollToForm(SPONSORSHIP_LEVEL_OPTIONS[i])}
                    className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg ${style.card}`}
                  >
                    {/* Barre supérieure colorée */}
                    <div className={`absolute inset-x-0 top-0 h-1.5 ${style.topBar}`} />

                    {/* Badge RECOMMENDED sur la 1ère carte */}
                    {style.badge ? (
                      <span className='mb-3 w-fit rounded-md bg-[#FDF3D7] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#B68216]'>
                        RECOMMENDED
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
                      {p.items.map((item: string) => (
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
                      <span className='inline-flex items-center gap-1.5 text-xs font-bold text-[#1E7E8B] transition group-hover:translate-x-1'>
                        Select {p.name.split(' ')[0]}
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SECTION 2 : WHY SPONSOR / WHAT SPONSORS GAIN */}
        <section>
          <Reveal>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
              {c.whySponsorEyebrow || 'WHY SPONSOR'}
            </p>
            <h2 className='mt-1.5 font-display text-2xl font-extrabold text-[#0B253A] md:text-4xl'>
              {c.why || 'What sponsors gain'}
            </h2>
          </Reveal>

          <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {gainItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className='relative flex h-full items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white px-4 py-5 shadow-sm'>
                    {/* Barre supérieure courte, centrée et aux coins inférieurs arrondis */}
                    <div
                      className={`absolute top-0 left-1/2 h-1.5 w-[78%] -translate-x-1/2 rounded-b-md ${item.topBar}`}
                    />

                    {/* Conteneur icône sans fond coloré (transparent) */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center ${item.iconColor}`}
                    >
                      <Icon size={32} strokeWidth={1.7} />
                    </div>

                    {/* Texte aligné à gauche et bien structuré */}
                    <p className='text-[13px] font-bold leading-snug text-[#0B253A] md:text-sm'>
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* SECTION 3 : SPONSOR BENEFITS / WHO YOU WILL REACH */}
        <section>
          <Reveal>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
              {c.sponsorBenefitsEyebrow || 'SPONSOR BENEFITS'}
            </p>
            <h2 className='mt-2 font-display text-2xl font-bold text-[#0B253A] md:text-4xl'>
              {c.audience || 'Who you will reach'}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className='mt-6 rounded-2xl border border-[#D8E7EB] bg-gradient-to-r from-[#EBF4F6] via-[#F2F8F9] to-[#EBF4F6] p-6 md:p-8'>
              <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5'>
                {audienceSegments.map((seg) => {
                  const Icon = seg.icon;
                  return (
                    <div key={seg.label} className='flex flex-col items-center text-center'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-[#1E7E8B] shadow-xs'>
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

        {/* SECTION 4 : CTA BANNER SOMBRE (Bas de l'image) */}
        <Reveal>
          <section className='flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#0B253A] px-7 py-8 text-white shadow-lg md:flex-row md:items-center md:px-10 md:py-9'>
            <div>
              <h2 className='font-display text-xl font-bold text-white md:text-2xl'>
                {c.bannerTitle || 'Ready to position your brand at FES Summit 2027?'}
              </h2>
              <p className='mt-1.5 text-sm text-slate-300'>
                {c.bannerText ||
                  'Request the sponsorship pack and confirm availability with the organizing team.'}
              </p>
            </div>
            <button
              onClick={() => scrollToForm()}
              className='shrink-0 rounded-xl bg-[#E5B84B] px-6 py-3.5 text-sm font-bold text-[#0B253A] transition hover:bg-[#ecc563]'
            >
              {c.bannerButton || 'Contact the team'}
            </button>
          </section>
        </Reveal>

        {/* FORMULAIRE INTERACTIF DE DEMANDE (Affiché directement ou au clic) */}
        <Reveal>
          <section
            id='sponsor-form'
            className={`grid gap-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all md:grid-cols-[0.75fr_1.25fr] md:p-10 ${
              showForm ? 'ring-2 ring-[#E5B84B]' : ''
            }`}
          >
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#1E7E8B]'>
                {c.formEyebrow || "LET'S WORK TOGETHER"}
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
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className='grid gap-4 sm:grid-cols-2'
              >
                {SPONSOR_FIELD_KEYS.map((fieldKey, i) => (
                  <label key={fieldKey} className='text-xs font-bold text-[#0B253A]'>
                    {c.fields[i] ?? fieldKey}
                    <input
                      {...register(fieldKey)}
                      type={fieldKey === 'workEmail' ? 'email' : 'text'}
                      className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none transition focus:border-[#1E7E8B] focus:bg-white'
                    />
                    {errors[fieldKey] && (
                      <p className='mt-1 text-xs font-medium text-red-600'>
                        {errors[fieldKey]?.message}
                      </p>
                    )}
                  </label>
                ))}

                <label className='text-xs font-bold text-[#0B253A]'>
                  {c.tierLabel}
                  <select
                    {...register('preferredSponsorshipLevel')}
                    className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-[#1E7E8B] focus:bg-white'
                  >
                    {c.tiers.map((p: any, i: number) => (
                      <option key={p.name} value={SPONSORSHIP_LEVEL_OPTIONS[i] ?? 'PLATINUM'}>
                        {p.name} ({p.price})
                      </option>
                    ))}
                  </select>
                  {errors.preferredSponsorshipLevel && (
                    <p className='mt-1 text-xs font-medium text-red-600'>
                      {errors.preferredSponsorshipLevel.message}
                    </p>
                  )}
                </label>

                <label className='text-xs font-bold text-[#0B253A]'>
                  {c.boothLabel}
                  <select
                    {...register('boothRequirement')}
                    className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-[#1E7E8B] focus:bg-white'
                  >
                    <option value='EXHIBITOR'>{t.nav.exhibition}</option>
                    <option value='NO'>No</option>
                    <option value='TO_BE_DISCUSSED'>To be discussed</option>
                  </select>
                  {errors.boothRequirement && (
                    <p className='mt-1 text-xs font-medium text-red-600'>
                      {errors.boothRequirement.message}
                    </p>
                  )}
                </label>

                <label className='text-xs font-bold text-[#0B253A] sm:col-span-2'>
                  {c.objectives}
                  <textarea
                    {...register('partnershipObjectives')}
                    rows={3}
                    className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-[#1E7E8B] focus:bg-white'
                  />
                  {errors.partnershipObjectives && (
                    <p className='mt-1 text-xs font-medium text-red-600'>
                      {errors.partnershipObjectives.message}
                    </p>
                  )}
                </label>

                <label className='text-xs font-bold text-[#0B253A] sm:col-span-2'>
                  {c.message}
                  <textarea
                    {...register('additionalMessage')}
                    rows={2}
                    className='mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F4F7F9] px-4 py-3 text-sm font-normal text-slate-800 outline-none focus:border-[#1E7E8B] focus:bg-white'
                  />
                  {errors.additionalMessage && (
                    <p className='mt-1 text-xs font-medium text-red-600'>
                      {errors.additionalMessage.message}
                    </p>
                  )}
                </label>

                <div className='sm:col-span-2'>
                  <label className='flex items-start gap-3 text-xs font-normal text-slate-600'>
                    <input
                      {...register('agreedToContact')}
                      type='checkbox'
                      className='mt-0.5 accent-[#1E7E8B]'
                    />
                    <span>{c.consent}</span>
                  </label>
                  {errors.agreedToContact && (
                    <p className='mt-1 text-xs font-medium text-red-600'>
                      {errors.agreedToContact.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 sm:col-span-2'>
                    {submitError}
                  </p>
                )}

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='inline-flex w-fit items-center gap-2.5 rounded-xl bg-[#0B253A] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#143a58] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2'
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
