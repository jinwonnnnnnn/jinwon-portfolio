"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { fadeInUp, fadeInLeft, staggerContainer } from "@portfolio/ui";
import { profile } from "@/data/profile";

const philosophyIcons: Record<string, string> = {
  "사용자 경험": "◎",
  "유지보수성": "◈",
  "협업": "◇",
  "문제 해결": "◉",
};

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center gap-3 mb-20"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-[#818cf8] uppercase">
            01. About
          </span>
          <span className="flex-1 h-px bg-white/8 max-w-32" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold mb-8 leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              사용자와{" "}
              <span className="text-[#818cf8]">구조</span>를
              <br />
              함께 고민합니다
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[#a1a1aa] leading-relaxed mb-6 text-base"
            >
              {profile.description}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-[#a1a1aa] leading-relaxed mb-10 text-base"
            >
              기술보다 문제 해결과 협업을 우선시하며, 팀이 함께 성장할 수 있는
              환경을 만드는 데 관심이 많습니다. Claude Code와 GitHub Copilot 등
              AI 도구를 활용한 개발 생산성 극대화에도 적극적입니다.
            </motion.p>

            {/* Values */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 gap-3">
              {profile.values.map((v) => (
                <motion.div
                  key={v.title}
                  variants={fadeInUp}
                  whileHover={{ x: 6, borderColor: "rgba(129,140,248,0.35)" }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/6 bg-white/2 hover:bg-[#818cf8]/5 transition-colors duration-300 cursor-default"
                >
                  <span className="text-[#818cf8] font-mono text-xs mt-0.5 shrink-0">◈</span>
                  <div>
                    <div className="text-sm font-semibold text-[#fafafa] mb-0.5">
                      {v.title}
                    </div>
                    <div className="text-xs text-[#a1a1aa] leading-relaxed">
                      {v.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl border border-[#818cf8]/15" />
              <div className="absolute -inset-8 rounded-3xl border border-white/4" />

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden"
              >
                <Image
                  src="/profile.jpg"
                  alt="김진원 프로필 사진"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 288px, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent" />
              </motion.div>

              <div className="absolute -bottom-5 -right-5 bg-[#111111] border border-white/8 rounded-xl px-4 py-3">
                <div className="text-xs font-mono text-[#818cf8] mb-0.5">Frontend Dev</div>
                <div className="text-xs text-[#52525b]">Seoul, Korea</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 개발 철학 및 핵심 가치 */}
        <div ref={philosophyRef} className="mt-32">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={philosophyInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-[#818cf8] uppercase">
              Philosophy
            </span>
            <span className="flex-1 h-px bg-white/8 max-w-32" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={philosophyInView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              개발 철학 및{" "}
              <span className="text-[#818cf8]">핵심 가치</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[#a1a1aa] mb-12"
            >
              기술보다 문제 해결과 협업을 우선합니다
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {profile.philosophy.map((item, i) => (
                <motion.div
                  key={item.keyword}
                  variants={fadeInUp}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 16px 48px rgba(129,140,248,0.12)",
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative p-6 rounded-2xl border border-white/8 bg-white/2 hover:border-[#818cf8]/25 hover:bg-[#818cf8]/5 transition-colors duration-300 overflow-hidden cursor-default"
                >
                  {/* 번호 */}
                  <span className="absolute top-4 right-5 text-5xl font-bold text-white/4 font-mono select-none group-hover:text-[#818cf8]/8 transition-colors duration-300">
                    0{i + 1}
                  </span>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl text-[#818cf8]">
                      {philosophyIcons[item.keyword] ?? "◈"}
                    </span>
                    <h3
                      className="text-base font-bold text-[#fafafa]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {item.keyword}
                    </h3>
                  </div>

                  <p className="text-sm text-[#a1a1aa] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
