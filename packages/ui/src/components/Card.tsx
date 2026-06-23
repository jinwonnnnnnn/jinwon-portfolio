"use client";

import React from "react";
import { cn } from "../lib/utils";
import { Badge } from "./Badge";

interface CardProps {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Card({
  title,
  description,
  tags,
  href,
  className,
  children,
}: CardProps) {
  const content = (
    <div
      className={cn(
        "group relative rounded-2xl border border-white/8 bg-white/3 p-6 transition-all duration-300",
        "hover:border-[#818cf8]/30 hover:bg-white/5 hover:-translate-y-1",
        className
      )}
    >
      <h3 className="mb-2 font-semibold text-[#fafafa] text-lg leading-snug group-hover:text-[#a5b4fc] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">
        {description}
      </p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} label={tag} variant="default" />
          ))}
        </div>
      )}
      {children}
      {href && (
        <div className="flex items-center gap-1 text-xs text-[#818cf8] mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>보기</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
          >
            <path
              d="M2.5 6h7M6.5 3l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
