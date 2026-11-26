import dayjsUTC from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjsUTC.extend(utc);

export default dayjsUTC;

export function parseISODate(dateStr: string): Date;
export function parseISODate(dateStr: null): null;
export function parseISODate(dateStr: string | null): Date | null;
export function parseISODate(dateStr: string | null): Date | null {
  return dateStr ? dayjsUTC.utc(dateStr, 'YYYY-MM-DD').toDate() : null;
}

export function parseISOTime(timeStr: string): Date;
export function parseISOTime(timeStr: null): null;
export function parseISOTime(timeStr: string | null): Date | null;
export function parseISOTime(timeStr: string | null): Date | null {
  if (!timeStr) return null;
  return dayjsUTC.utc(`1970-01-01 ${timeStr}`, 'YYYY-MM-DD HH:mm').toDate();
}

export function toISODate(date: Date): string;
export function toISODate(date: null): null;
export function toISODate(date: Date | null): string | null;
export function toISODate(date: Date | null): string | null {
  if (!date) return null;
  return dayjsUTC.utc(date).format('YYYY-MM-DD');
}

export function toISOTime(date: Date): string;
export function toISOTime(date: null): null;
export function toISOTime(date: Date | null): string | null;
export function toISOTime(date: Date | null): string | null {
  if (!date) return null;
  return dayjsUTC.utc(date).format('HH:mm');
}
