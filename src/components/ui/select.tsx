import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export type Option = {
  value: string;
  label: string;
  description?: string;
  model?: string,
};

type SelectProps = {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
};

export default function Select({
  label,
  placeholder = "Select...",
  options,
  value = null,
  onChange,
  disabled = false,
  id,
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value) || null;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (open) setHighlightedIndex(options.findIndex((o) => o.value === value));
    else setHighlightedIndex(-1);
  }, [open, options, value]);

  function selectValue(val: string) {
    onChange?.(val);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlightedIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open && highlightedIndex >= 0) selectValue(options[highlightedIndex].value);
      else setOpen((v) => !v);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className={`w-full ${className}`} ref={rootRef}>
      {label && (
        <label htmlFor={id} className="block text-xl font-semibold text-white mb-1.5">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <button id={id} type="button" onClick={() => setOpen((v) => !v)} onKeyDown={onKeyDown}
          className={`w-full flex items-center justify-between gap-2 rounded-[6px] border px-3 py-2 text-sm transition disabled:cursor-not-allowed bg-secondary border-border `}>
          <div className="flex items-center gap-2 truncate">
            <span className={`truncate text-text`}>
              {selected ? selected.label : placeholder}
            </span>
          </div>

          <ChevronDown size={16} className="shrink-0 text-text" />
        </button>

        {open && (
          <ul   tabIndex={-1} className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-secondary py-1 px-1 text-sm" onKeyDown={onKeyDown}>
            {options.length === 0 && (
              <li className="px-3 py-2 text-text">No options</li>
            )}

            {options.map((opt, idx) => {
              const isSelected = selected?.value === opt.value;
              const isHighlighted = idx === highlightedIndex;
              return (
                <li
                  key={opt.value}
                  id={`option-${idx}`}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onMouseLeave={() => setHighlightedIndex(-1)}
                  onClick={() => selectValue(opt.value)}
                  className={`flex cursor-pointer items-center justify-between gap-2 px-4 py-3 rounded-[4px] ${
                    isHighlighted ? "bg-primary" : "hover:bg-primary"
                  } ${isSelected ? "font-semibold" : "font-normal"} truncate`}
                >
                  <div className="flex flex-col">
                    <span className="truncate text-text">{opt.label}</span>
                  </div>
                  {isSelected && <Check size={14} className="opacity-80 text-text" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
