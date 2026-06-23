"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "../lib/animations";
import { cn } from "../lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  stagger?: boolean;
}

export function Section({
  id,
  children,
  className,
  animate = true,
  stagger = false,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 및 마운트 전에는 그냥 보여주고, 마운트 후 애니메이션 적용
  if (!animate || !mounted) {
    return (
      <section id={id} ref={ref} className={cn("relative", className)}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} ref={ref} className={cn("relative", className)}>
      <motion.div
        variants={stagger ? staggerContainer : fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
}
