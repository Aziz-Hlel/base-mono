import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Translation } from '../translations';

export default function Footer({ t }: { t: Translation }) {
  return (
    <footer className='bg-navy text-white'>
      {/* Top accent */}
      <div className='gold-line opacity-70' />

      {/* Main Footer */}
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <div className='grid items-center gap-12 md:grid-cols-[1fr_auto_1fr]'>
          {/* LEFT — Navigation */}
          <div className='grid grid-cols-2 gap-10 md:pr-12'>
            <div>
              <h4 className='mb-5 text-xs font-bold uppercase tracking-[0.2em] text-champagne'>
                Navigate
              </h4>

              <div className='grid gap-3 text-sm text-slate-300'>
                <Link to='/about' className='transition-colors duration-300 hover:text-white'>
                  About
                </Link>

                <Link to='/program' className='transition-colors duration-300 hover:text-white'>
                  Program
                </Link>

                <Link to='/speakers' className='transition-colors duration-300 hover:text-white'>
                  Speakers
                </Link>

                <Link to='/workshops' className='transition-colors duration-300 hover:text-white'>
                  Workshops
                </Link>
              </div>
            </div>

            <div>
              <h4 className='mb-5 text-xs font-bold uppercase tracking-[0.2em] text-champagne'>
                Explore
              </h4>

              <div className='grid gap-3 text-sm text-slate-300'>
                <Link to='/audience' className='transition-colors duration-300 hover:text-white'>
                  Audience
                </Link>

                <Link to='/partners' className='transition-colors duration-300 hover:text-white'>
                  Partners
                </Link>

                <Link to='/contact' className='transition-colors duration-300 hover:text-white'>
                  Contact
                </Link>

                <Link to='/register' className='transition-colors duration-300 hover:text-white'>
                  Register
                </Link>
              </div>
            </div>
          </div>

          {/* CENTER — LOGO */}
          <div className='relative flex justify-center md:px-12'>
            {/* Vertical separator */}
            <div className='absolute -left-px top-1/2 hidden h-32 -translate-y-1/2 bg-white/10 md:block' />

            <div className='flex flex-col items-center text-center'>
              <Link to='/' className='group flex flex-col items-center'>
                <img
                  src='/image/logo2.png'
                  alt='Future Schools Excellence Summit'
                  className='
                    h-36 w-auto object-contain
                    transition-all duration-500
                    group-hover:scale-105
                    group-hover:drop-shadow-[0_0_20px_rgba(198,167,94,0.25)]
                  '
                />

                <div className='mt-4 h-px w-16 bg-champagne/60 transition-all duration-500 group-hover:w-24' />
              </Link>
            </div>

            {/* Vertical separator */}
            <div className='absolute -right-px top-1/2 hidden h-32 -translate-y-1/2 bg-white/10 md:block' />
          </div>

          {/* RIGHT — Newsletter */}
          <div className='md:pl-12'>
            <h4 className='mb-5 text-xs font-bold uppercase tracking-[0.2em] text-champagne'>
              Newsletter
            </h4>

            <p className='mb-5 max-w-sm text-sm leading-6 text-slate-400'>{t.footer.newsletter}</p>

            <div
              className='
                flex overflow-hidden rounded-full
                border border-white/15
                bg-white/5
                transition-all duration-300
                focus-within:border-champagne/60
                focus-within:bg-white/10
              '
            >
              <input
                type='email'
                placeholder='Email address'
                className='
                  min-w-0 flex-1
                  bg-transparent
                  px-5 py-3.5
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-500
                '
              />

              <button
                type='button'
                aria-label='Subscribe'
                className='
                  grid h-12 w-12 shrink-0 place-items-center
                  bg-champagne text-navy
                  transition-all duration-300
                  hover:bg-white
                '
              >
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className='border-t border-white/10'>
        <div
          className='
            mx-auto flex max-w-7xl
            flex-col gap-4
            px-6 py-6
            text-xs text-slate-500
            md:flex-row md:items-center
            md:justify-between
          '
        >
          <span>{t.footer.rights}</span>

          <div className='flex gap-6'>
            <span className='cursor-pointer transition-colors hover:text-slate-300'>
              {t.footer.privacy}
            </span>

            <span className='cursor-pointer transition-colors hover:text-slate-300'>
              {t.footer.terms}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
