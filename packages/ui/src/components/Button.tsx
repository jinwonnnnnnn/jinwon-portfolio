"use client";

import React from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full cursor-pointer select-none";

  const variants = {
    primary:
      "bg-[#818cf8] text-[#0a0a0a] hover:bg-[#a5b4fc] active:scale-95",
    ghost:
      "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-white/5 active:scale-95",
    outline:
      "border border-white/15 text-[#fafafa] hover:border-[#818cf8] hover:text-[#818cf8] active:scale-95",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
