import { Reveal } from './Animated';

export default function SectionHeader({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <Reveal>
      <div className='mb-12 max-w-3xl'>
        <div
          className={`mb-4 text-xs font-bold uppercase tracking-[0.24em] ${light ? 'text-champagne' : 'text-royal'}`}
        >
          {eyebrow}
        </div>
        <h2
          className={`font-display text-4xl font-semibold leading-tight md:text-5xl ${light ? 'text-white' : 'text-navy'}`}
        >
          {title}
        </h2>
        {text && (
          <p className={`mt-5 max-w-2xl leading-8 ${light ? 'text-slate-300' : 'text-slate-600'}`}>
            {text}
          </p>
        )}
      </div>
    </Reveal>
  );
}
