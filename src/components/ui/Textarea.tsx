import clsx from 'clsx';

type TextareaProps = {
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  error?: string;
};

export default function Textarea({
  label, id, name, value, onChange,
  placeholder, required, rows = 4, className, error
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm text-gray-400 font-medium">
          {label}{required && <span className="text-yellow-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={clsx(
          'bg-gray-900 border border-gray-700 text-gray-100 rounded px-3 py-2 text-sm',
          'focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600',
          'placeholder:text-gray-600 resize-vertical',
          error && 'border-red-500',
          className
        )}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
