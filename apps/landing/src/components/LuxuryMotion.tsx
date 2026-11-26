import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      className='fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-royal via-sky to-champagne'
      style={{ scaleX }}
    />
  );
}

export function AmbientCursor() {
  const [point, setPoint] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (event: MouseEvent) => setPoint({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      aria-hidden='true'
      className='pointer-events-none fixed z-[1] hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/10 blur-3xl md:block'
      animate={{ left: point.x, top: point.y }}
      transition={{ type: 'spring', stiffness: 80, damping: 28, mass: 0.5 }}
    />
  );
}
