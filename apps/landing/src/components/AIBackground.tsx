import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Bot,
  CircuitBoard,
  Cpu,
  Database,
  Network,
  ScanLine,
  Sparkles,
  WandSparkles,
} from 'lucide-react';

const icons = [
  { Icon: BrainCircuit, x: '8%', y: '18%', size: 42, delay: 0, duration: 8 },
  { Icon: Bot, x: '87%', y: '16%', size: 36, delay: 1.2, duration: 9 },
  {
    Icon: CircuitBoard,
    x: '15%',
    y: '70%',
    size: 32,
    delay: 2.1,
    duration: 10,
  },
  { Icon: Cpu, x: '92%', y: '68%', size: 40, delay: 0.8, duration: 8.5 },
  { Icon: Database, x: '72%', y: '38%', size: 28, delay: 2.8, duration: 11 },
  { Icon: Network, x: '29%', y: '35%', size: 34, delay: 1.7, duration: 9.5 },
  { Icon: ScanLine, x: '55%', y: '78%', size: 30, delay: 3.2, duration: 10 },
  {
    Icon: WandSparkles,
    x: '47%',
    y: '12%',
    size: 27,
    delay: 1.1,
    duration: 7.5,
  },
  { Icon: Sparkles, x: '78%', y: '82%', size: 24, delay: 2.5, duration: 7 },
];

export default function AIBackground({ dark = false }: { dark?: boolean }) {
  return (
    <div className='pointer-events-none absolute inset-0 z-[2] overflow-hidden' aria-hidden='true'>
      <div className='ai-orbit ai-orbit-one' />
      <div className='ai-orbit ai-orbit-two' />

      {icons.map(({ Icon, x, y, size, delay, duration }, index) => (
        <motion.div
          key={`${x}-${y}-${index}`}
          className={`absolute ${dark ? 'text-white/20' : 'text-royal/10'}`}
          style={{ left: x, top: y }}
          animate={{
            y: [0, -14, 0, 10, 0],
            x: [0, 7, 0, -5, 0],
            rotate: [0, 4, -4, 2, 0],
            opacity: dark ? [0.12, 0.28, 0.16, 0.24, 0.12] : [0.05, 0.14, 0.07, 0.12, 0.05],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className='relative rounded-2xl border border-current/20 bg-white/[0.025] p-3 backdrop-blur-[2px]'>
            <Icon size={size} strokeWidth={1.15} />
            <span className='absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-champagne shadow-[0_0_12px_#C9A96E]' />
          </div>
        </motion.div>
      ))}

      <svg
        className='absolute inset-0 h-full w-full opacity-[0.12]'
        viewBox='0 0 1200 700'
        preserveAspectRatio='none'
      >
        <path className='ai-connection' d='M110 135 C300 40, 390 260, 610 150 S900 90, 1080 190' />
        <path
          className='ai-connection'
          d='M180 520 C360 360, 450 610, 680 430 S920 380, 1080 530'
        />
        <path className='ai-connection' d='M360 90 C470 210, 680 210, 820 90' />
      </svg>
    </div>
  );
}
