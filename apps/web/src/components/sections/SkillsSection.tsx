"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@portfolio/ui";
import { skills } from "@/data/skills";

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center gap-3 mb-20"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-[#818cf8] uppercase">
            04. Skills
          </span>
          <span className="flex-1 h-px bg-white/8 max-w-32" />
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          기술 스택
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[#a1a1aa] mb-16"
        >
          서비스 운영과 개발 생산성을 위한 기술 포트폴리오
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {skills.map((group, gi) => (
            <motion.div key={group.category} variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono text-[#52525b] uppercase tracking-widest whitespace-nowrap">
                  {group.category}
                </span>
                <span className="flex-1 h-px bg-white/5" />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + gi * 0.05 + ii * 0.03, duration: 0.3 }}
                    whileHover={{
                      backgroundColor: "rgba(129,140,248,0.15)",
                      borderColor: "rgba(129,140,248,0.4)",
                      color: "#a5b4fc",
                      y: -2,
                    }}
                    className="px-3 py-1.5 rounded-full text-sm text-[#a1a1aa] border border-white/8 bg-white/2 font-mono cursor-default transition-colors duration-200"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
