import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "default",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-[6px] font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500",
    outline:
      "border border-slate-300 text-slate-700 bg-transparent hover:bg-slate-100 focus:ring-slate-300",
    ghost: "text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`)}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;