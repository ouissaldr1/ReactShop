import type { FormInputProps } from "../types/formInput";

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block">
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border p-3"
      />

      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
