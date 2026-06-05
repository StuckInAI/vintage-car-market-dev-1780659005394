import clsx from 'clsx';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
};

export default function Button({
  children, variant = 'primary', size = 'md',
  onClick, type = 'button', disabled = false,
  className, fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center font-semibold tracking-wide transition-all rounded',
        {
          'bg-yellow-600 text-black hover:bg-yellow-500 disabled:opacity-50': variant === 'primary',
          'bg-gray-800 text-gray-200 hover:bg-gray-700 disabled:opacity-50': variant === 'secondary',
          'border border-yellow-600 text-yellow-400 hover:bg-yellow-900 disabled:opacity-50': variant === 'outline',
          'bg-red-700 text-white hover:bg-red-600 disabled:opacity-50': variant === 'danger',
          'text-gray-300 hover:text-yellow-400 disabled:opacity-50': variant === 'ghost',
          'px-3 py-1.5 text-xs': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
    >
      {children}
    </button>
  );
}
