import React from "react";
import { cn } from "@/lib/utils";

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

export const PrimaryButton = ({
  loading,
  children,
  className,
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      className={cn(
        "w-full bg-black text-white py-2 px-4 font-medium tracking-wide uppercase",
        "disabled:opacity-50 transition-all duration-150 ease-in-out",
        "hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
        "cursor-pointer flex items-center justify-center gap-2",
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
