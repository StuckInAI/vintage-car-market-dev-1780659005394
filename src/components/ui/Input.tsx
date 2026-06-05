import clsx from 'clsx';

type InputProps = {
  label?: string;
  id?: string;
  name?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  className?: string;
  disabled?: boolean;
  error?: string;
};

export default function Input({
  label, id, name, type = 'text', value, onChange,
  placeholder, required, min, max, step,
  className, disabled, error
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-400 font-medium">
          {label}{required && <span className="text-yellow-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={clsx(
          'bg-gray-900 border border-gray-700 text-gray-100 rounded px-3 py-2 text-sm',
          'focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600',
          'placeholder:text-gray-600 disabled:opacity-50',
          error && 'border-red-500',
          className
        )}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
