"use client";

import React from "react";
import { cn } from "../lib/utils";

interface BadgeProps {
  label: string;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export function Badge({ label, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-white/6 text-[#a1a1aa] border border-white/8",
    accent: "bg-[#818cf8]/12 text-[#818cf8] border border-[#818cf8]/25",
    muted: "bg-white/4 text-[#52525b] border border-white/5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
