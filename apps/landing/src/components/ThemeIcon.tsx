import {
  BookOpen,
  BadgeCheck,
  ClipboardCheck,
  Cpu,
  GraduationCap,
  Landmark,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
export default function ThemeIcon({ name, size = 22 }: { name: string; size?: number }) {
  const map: any = {
    Sparkles,
    BookOpen,
    ClipboardCheck,
    Landmark,
    ShieldCheck,
    Rocket,
    Cpu,
    GraduationCap,
    BadgeCheck,
  };
  const Icon = map[name] || Sparkles;
  return <Icon size={size} />;
}
