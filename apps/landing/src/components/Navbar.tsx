import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Translation } from '../translations';

type Lang = 'en' | 'fr' | 'ar';

type Props = {
  t: Translation;
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LANGUAGES: { code: Lang; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ar', label: 'AR', name: 'العربية' },
];

function FlagIcon({ code }: { code: Lang }) {
  if (code === 'fr') {
    return (
      <svg
        viewBox='0 0 3 2'
        className='h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] shadow-xs'
        aria-hidden='true'
      >
        <rect width='1' height='2' x='0' fill='#002395' />
        <rect width='1' height='2' x='1' fill='#FFFFFF' />
        <rect width='1' height='2' x='2' fill='#ED2939' />
      </svg>
    );
  }

  if (code === 'en') {
    return (
      <svg
        viewBox='0 0 60 30'
        className='h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] shadow-xs'
        aria-hidden='true'
      >
        <rect width='60' height='30' fill='#012169' />
        <path d='M0,0 L60,30 M60,0 L0,30' stroke='#FFFFFF' strokeWidth='6' />
        <path d='M0,0 L60,30 M60,0 L0,30' stroke='#C8102E' strokeWidth='3.5' />
        <path d='M30,0 V30 M0,15 H60' stroke='#FFFFFF' strokeWidth='10' />
        <path d='M30,0 V30 M0,15 H60' stroke='#C8102E' strokeWidth='6' />
      </svg>
    );
  }

  // Drapeau officiel de la Tunisie : fond rouge, disque blanc, croissant et étoile rouges
  return (
    <svg
      viewBox='0 0 120 80'
      className='h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] shadow-xs'
      aria-hidden='true'
    >
      <rect width='120' height='80' fill='#E70013' />
      <circle cx='60' cy='40' r='20' fill='#FFFFFF' />
      <circle cx='62' cy='40' r='15' fill='#E70013' />
      <circle cx='65.5' cy='40' r='12' fill='#FFFFFF' />
      <polygon
        points='68,32.5 70.1,37.8 75.8,37.8 71.2,41.2 72.9,46.6 68,43.3 63.1,46.6 64.8,41.2 60.2,37.8 65.9,37.8'
        fill='#E70013'
      />
    </svg>
  );
}

type LanguageDropdownProps = {
  lang: Lang;
  setLang: (l: Lang) => void;
  isLightHeader?: boolean;
  align?: 'left' | 'right';
  compact?: boolean;
};

function LanguageDropdown({
  lang,
  setLang,
  isLightHeader = true,
  align = 'right',
  compact = false,
}: LanguageDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((item) => item.code === lang) ?? LANGUAGES[0]!;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-haspopup='listbox'
        aria-expanded={dropdownOpen}
        aria-label='Select language'
        className={`flex items-center rounded-full border font-bold transition outline-none ${
          compact ? 'gap-1.5 px-2.5 py-1.5 text-[11px]' : 'gap-2 px-3 py-2 text-xs'
        } ${
          isLightHeader
            ? 'border-slate-200 bg-white text-navy hover:border-slate-300'
            : 'border-white/30 bg-white/10 text-white backdrop-blur-xs hover:bg-white/15'
        }`}
      >
        <FlagIcon code={currentLang.code} />
        <span>{currentLang.label}</span>
        <ChevronDown
          size={compact ? 12 : 14}
          className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.ul
            role='listbox'
            aria-label='Languages'
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {LANGUAGES.map((item) => {
              const selected = item.code === lang;
              return (
                <li key={item.code} role='option' aria-selected={selected}>
                  <button
                    type='button'
                    onClick={() => {
                      setLang(item.code);
                      setDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                      selected
                        ? 'bg-royal/10 text-royal font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-navy'
                    }`}
                  >
                    <span className='flex items-center gap-2.5'>
                      <FlagIcon code={item.code} />
                      <span>{item.name}</span>
                    </span>
                    {selected && <Check size={14} className='text-royal' />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ t, lang, setLang }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isLightHeader = scrolled || location.pathname !== '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: [string, string][] = [
    ['/', t.nav.home],
    ['/about', t.nav.about],
    ['/program', t.nav.program],
    ['/speakers', t.nav.speakers],
    ['/workshops', t.nav.workshops],
    ['/audience', t.nav.audience],
    ['/partners', t.nav.partners],
    ['/sponsorship', t.nav.sponsorship],
    ['/exhibition', t.nav.exhibition],
    ['/contact', t.nav.contact],
  ];

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-500 ${
        isLightHeader ? 'bg-white/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6'>
        <Link to='/' onClick={() => setOpen(false)} className='group flex items-center gap-3'>
          <img
            src='/image/logo2.png'
            alt='Future Schools Excellence Summit'
            className={`h-12 w-auto object-contain transition-all duration-300 sm:h-14 ${
              isLightHeader ? 'opacity-100' : 'brightness-0 invert'
            }`}
          />
        </Link>

        <nav className='hidden items-center gap-4 lg:flex'>
          {links.map(([href, label]) => (
            <Link
              key={href}
              to={href}
              className={`text-[11px] font-bold uppercase tracking-[0.1em] transition ${
                location.pathname === href
                  ? 'text-royal'
                  : isLightHeader
                    ? 'text-slate-600 hover:text-royal'
                    : 'text-white/90 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className='hidden items-center gap-3 lg:flex'>
          <LanguageDropdown
            lang={lang}
            setLang={setLang}
            isLightHeader={isLightHeader}
            align='right'
          />

          <Link
            to='/register'
            className='group flex items-center gap-2 rounded-full bg-royal px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-royal/20 transition hover:bg-deepblue'
          >
            {t.nav.register}
            <ArrowUpRight
              size={14}
              className='transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            />
          </Link>
        </div>

        <div className='flex items-center gap-2 lg:hidden'>
          <LanguageDropdown
            lang={lang}
            setLang={setLang}
            isLightHeader={isLightHeader}
            align='right'
            compact
          />

          <button
            className={`p-1.5 ${isLightHeader ? 'text-navy' : 'text-white'}`}
            onClick={() => setOpen(!open)}
            aria-label='menu'
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className='overflow-hidden bg-white lg:hidden'
          >
            <nav className='flex flex-col gap-1 px-6 pb-6 pt-2'>
              {links.map(([href, label]) => (
                <Link
                  key={href}
                  onClick={() => setOpen(false)}
                  to={href}
                  className='border-b border-slate-100 py-3 text-sm font-semibold text-navy'
                >
                  {label}
                </Link>
              ))}
              <div className='flex items-center justify-end pt-4'>
                <Link
                  onClick={() => setOpen(false)}
                  to='/register'
                  className='w-full rounded-full bg-royal px-5 py-2.5 text-center text-xs font-bold uppercase text-white'
                >
                  {t.nav.register}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
