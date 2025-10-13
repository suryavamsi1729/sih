import React from "react";

export type InputProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  step?: number;
  error?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  required = false,
  step,
  error,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        step={step}
        className={`w-full rounded-[6px] border border-border bg-secondary  px-3 py-2 text-sm text-text placeholder:text-[#888] transition focus:outline-none disabled:cursor-not-allowed ${
          error ? "border-red-500 focus:ring-red-500" : "hover:border-slate-300"
        }`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;