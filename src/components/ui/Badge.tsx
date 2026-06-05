import clsx from 'clsx';

type BadgeVariant = 'gold' | 'green' | 'red' | 'gray' | 'blue';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export default function Badge({ children, variant = 'gold', className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide uppercase',
      {
        'bg-yellow-900 text-yellow-400 border border-yellow-700': variant === 'gold',
        'bg-green-900 text-green-400 border border-green-700': variant === 'green',
        'bg-red-900 text-red-400 border border-red-700': variant === 'red',
        'bg-gray-800 text-gray-400 border border-gray-600': variant === 'gray',
        'bg-blue-900 text-blue-400 border border-blue-700': variant === 'blue',
      },
      className
    )}>
      {children}
    </span>
  );
}
