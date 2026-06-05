export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

export function formatMileage(miles: number): string {
  return new Intl.NumberFormat('en-US').format(miles) + ' mi';
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return days + ' days ago';
}

export function getTimeRemaining(endTime: string): { hours: number; minutes: number; seconds: number; total: number } {
  const total = new Date(endTime).getTime() - Date.now();
  if (total <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0 };
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor(total / (1000 * 60 * 60));
  return { hours, minutes, seconds, total };
}

export function pad(n: number): string {
  return n.toString().padStart(2, '0');
}
