import { useCountdown } from '@/hooks/useCountdown';
import { pad } from '@/lib/utils';
import { Clock } from 'lucide-react';
import clsx from 'clsx';

type CountdownTimerProps = {
  endTime: string;
  size?: 'sm' | 'lg';
};

export default function CountdownTimer({ endTime, size = 'lg' }: CountdownTimerProps) {
  const { hours, minutes, seconds, isExpired } = useCountdown(endTime);

  if (isExpired) {
    return (
      <div className={clsx(
        'flex items-center gap-2 text-red-400',
        size === 'lg' ? 'text-2xl' : 'text-sm'
      )}>
        <Clock size={size === 'lg' ? 24 : 14} />
        <span className="font-mono font-bold">AUCTION ENDED</span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className="flex items-center gap-3">
        <Clock size={20} className="text-yellow-400" />
        <div className="flex items-end gap-1">
          {[
            { value: hours, label: 'HRS' },
            { value: minutes, label: 'MIN' },
            { value: seconds, label: 'SEC' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-yellow-600 text-2xl font-bold mb-2">:</span>}
              <div className="text-center">
                <div className="bg-gray-900 border border-yellow-800 rounded px-3 py-2 min-w-[56px]">
                  <span className="text-yellow-400 text-2xl font-mono font-bold">{pad(item.value)}</span>
                </div>
                <span className="text-xs text-gray-500 tracking-wider">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-yellow-400 text-sm font-mono">
      <Clock size={12} />
      <span>{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>
    </div>
  );
}
