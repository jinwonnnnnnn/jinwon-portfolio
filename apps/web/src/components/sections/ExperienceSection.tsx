"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer } from "@portfolio/ui";
import { experience } from "@/data/experience";

function BoldDescription({ text, boldTerms }: { text: string; boldTerms: string[] }) {
  if (!boldTerms.length) return <>{text}</>;

  const escaped = boldTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        boldTerms.includes(part) ? (
          <strong key={i} className="text-[#fafafa] font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center gap-3 mb-20"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-[#818cf8] uppercase">
            02. Experience
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
          경력
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[#a1a1aa] mb-16"
        >
          실무 중심의 경력 요약
        </motion.p>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Animated vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-white/5 hidden md:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-2 w-px bg-gradient-to-b from-[#818cf8] via-[#818cf8]/50 to-transparent hidden md:block origin-top"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="md:pl-12 relative group"
              >
                {/* Dot */}
                <motion.div
                  whileHover={{ scale: 1.6 }}
                  className="absolute left-0 top-6 w-2 h-2 rounded-full bg-[#818cf8] hidden md:block -translate-x-[3.5px] shadow-[0_0_12px_rgba(129,140,248,0.6)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(129,140,248,0.9)]"
                />

                <motion.div
                  whileHover={{
                    borderColor: "rgba(129,140,248,0.3)",
                    backgroundColor: "rgba(129,140,248,0.04)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/8 bg-white/2 p-6 md:p-8 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(129,140,248,0.08)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3
                        className="text-xl font-bold text-[#fafafa] group-hover:text-[#a5b4fc] transition-colors duration-200"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {exp.company}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-[#818cf8] font-medium">
                          {exp.role}
                        </span>
                        <span className="text-[#52525b] text-xs">·</span>
                        <span className="text-xs text-[#52525b] font-mono">
                          {exp.companyEn}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#52525b] bg-white/4 border border-white/6 rounded-full px-3 py-1.5 shrink-0 self-start group-hover:border-[#818cf8]/20 group-hover:text-[#818cf8]/70 transition-colors duration-200">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    <BoldDescription text={exp.description} boldTerms={exp.boldTerms} />
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
