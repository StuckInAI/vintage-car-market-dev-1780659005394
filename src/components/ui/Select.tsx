import clsx from 'clsx';

type SelectProps = {
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  error?: string;
};

export default function Select({
  label, id, name, value, onChange,
  children, required, className, disabled, error
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-400 font-medium">
          {label}{required && <span className="text-yellow-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={clsx(
          'bg-gray-900 border border-gray-700 text-gray-100 rounded px-3 py-2 text-sm',
          'focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600',
          'disabled:opacity-50',
          error && 'border-red-500',
          className
        )}
      >
        {children}
      </select>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
