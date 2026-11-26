import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react';

import { Reveal } from '../components/Animated';
import SectionHeader from '../components/SectionHeader';
import type { Translation } from '../translations';

export default function Contact({ t }: { t: Translation }) {
  return (
    <main className='page-bg' dir={t.isRtl ? 'rtl' : 'ltr'}>
      {/* HERO — FULL BACKGROUND IMAGE */}
      <section className='relative isolate flex min-h-[500px] items-center overflow-hidden bg-[#071A2B] md:min-h-[650px]'>
        {/* Background image */}
        <div
          className={`absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat ${t.isRtl ? '-scale-x-100' : ''}`}
          style={{
            backgroundImage: "url('/image/hero/Contact.jpg')",
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
        <div className='mx-auto w-full max-w-7xl px-6 py-24 md:py-32'>
          <Reveal>
            <div className='max-w-3xl'>
              <div className='mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-100 backdrop-blur-md'>
                <span className='h-2 w-2 rounded-full bg-amber-400' />
                {t.contact.eyebrow}
              </div>

              <h1 className='font-display text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl'>
                {t.contact.title}
              </h1>

              <p className='mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg'>
                {t.contact.text}
              </p>

              <a
                href='#contact-form'
                className='mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#071A2B] transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl'
              >
                {t.contact.form.button}
                <ArrowRight size={17} className={t.isRtl ? 'rotate-180' : ''} />
              </a>
            </div>
          </Reveal>
        </div>
        {/* Bottom decorative line */}
        <div className='absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent' />
      </section>

      {/* CONTACT INFORMATION AND FORM */}
      <section className='py-20 md:py-28'>
        <div className='mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-16'>
          {/* Contact information */}
          <Reveal>
            <div>
              <SectionHeader eyebrow={t.contact.eyebrow3} title={t.contact.title3} />

              <div className='mt-8 space-y-4'>
                {[
                  {
                    Icon: MapPin,
                    value: t.contact.location,
                  },
                  {
                    Icon: Mail,
                    value: t.contact.email,
                  },
                  {
                    Icon: Phone,
                    value: t.contact.phone,
                  },
                ].map(({ Icon, value }) => (
                  <div
                    key={value}
                    className='group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg'
                  >
                    <div className='grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-royal transition duration-300 group-hover:bg-royal group-hover:text-white'>
                      <Icon size={20} />
                    </div>

                    <span className='break-words font-semibold text-navy'>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.1}>
            <form
              id='contact-form'
              onSubmit={(e) => e.preventDefault()}
              className='scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-luxe md:p-9'
            >
              <div className='mb-7'>
                <p className='text-xs font-bold uppercase tracking-[0.2em] text-royal'>
                  Future Schools Excellence Summit
                </p>

                <h3 className='mt-3 font-display text-2xl font-semibold text-navy'>
                  {t.contact.title3}
                </h3>
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                {(['name', 'email', 'organization', 'subject'] as const).map((key) => (
                  <label key={key} className='text-xs font-bold text-slate-600'>
                    {t.contact.form[key]}

                    <input
                      name={key}
                      type={key === 'email' ? 'email' : 'text'}
                      required={key === 'name' || key === 'email'}
                      className='mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-royal focus:bg-white'
                    />
                  </label>
                ))}
              </div>

              <label className='mt-5 block text-xs font-bold text-slate-600'>
                {t.contact.form.message}

                <textarea
                  name='message'
                  rows={5}
                  required
                  className='mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-royal focus:bg-white'
                />
              </label>

              <button
                type='submit'
                className='mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-royal px-7 py-4 text-xs font-extrabold uppercase tracking-wider text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto'
              >
                {t.contact.form.button}
                <Send size={15} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className='bg-navy py-20 text-white md:py-24'>
        <div className='mx-auto max-w-6xl px-6'>
          <SectionHeader
            eyebrow={t?.contact?.locationSection?.eyebrow ?? 'SOUSSE'}
            title={
              t?.contact?.locationSection?.title ??
              'A strategic place to meet the future of education'
            }
            light
          />

          <div className='relative mt-10 flex min-h-72 items-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B3155] to-[#071A2B] p-8 md:p-12'>
            {/* Decorative glow */}
            <div
              className={`pointer-events-none absolute -top-10 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl ${
                t.isRtl ? '-left-10' : '-right-10'
              }`}
            />

            <div className='relative max-w-xl'>
              <MapPin size={32} className='text-amber-300' />

              <h3 className='mt-5 font-display text-2xl font-semibold'>
                {t?.contact?.locationSection?.city ?? 'Sousse, Tunisia'}
              </h3>

              <p className='mt-3 leading-7 text-slate-300'>
                {t?.contact?.locationSection?.description ??
                  'Bringing together education leaders, school innovators and technology experts to shape the future of learning.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
