"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@portfolio/ui";
import { profile } from "@/data/profile";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center gap-3 mb-20"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-[#818cf8] uppercase">
            05. Contact
          </span>
          <span className="flex-1 h-px bg-white/8 max-w-32" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-mono text-[#818cf8] tracking-widest uppercase mb-4"
          >
            준비된 프론트엔드 개발자
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            함께 성장하는
            <br />
            <span className="text-[#818cf8]">개발자 김진원</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-[#a1a1aa] text-lg leading-relaxed mb-4"
          >
            단순히 코드를 짜는 것을 넘어, 비즈니스 문제를 기술적으로 해결하고
            팀과 함께 성장하는 개발자가 되겠습니다.
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-[#a1a1aa] text-base leading-relaxed mb-12"
          >
            퍼블리셔 시절부터 쌓아온 세밀한 사용자 관점과 프론트엔드 개발자로서의
            설계 역량을 바탕으로{" "}
            <span className="text-[#fafafa]">귀사의 서비스 발전에 즉시 기여</span>하겠습니다.
          </motion.p>

          {/* Email block */}
          <motion.div variants={fadeInUp} className="mb-8">
            <button
              onClick={copyEmail}
              className="group w-full flex items-center justify-between p-5 rounded-2xl border border-white/8 bg-white/2 hover:border-[#818cf8]/30 hover:bg-[#818cf8]/5 transition-all duration-300"
            >
              <div className="text-left">
                <div className="text-xs font-mono text-[#52525b] mb-1">Email</div>
                <div className="text-lg font-medium text-[#fafafa] group-hover:text-[#818cf8] transition-colors duration-200">
                  {profile.email}
                </div>
              </div>
              <div className="shrink-0 ml-4 px-3 py-1.5 rounded-full border border-white/8 text-xs font-mono text-[#52525b] group-hover:border-[#818cf8]/30 group-hover:text-[#818cf8] transition-all duration-200">
                {copied ? "복사됨 ✓" : "복사"}
              </div>
            </button>
          </motion.div>

          {/* Links */}
          <motion.div variants={staggerContainer} className="flex gap-3">
            <motion.a
              variants={fadeInUp}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 p-4 rounded-xl border border-white/8 bg-white/2 text-sm text-[#a1a1aa] hover:text-[#fafafa] hover:border-white/16 hover:bg-white/4 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </motion.a>

            <motion.a
              variants={fadeInUp}
              href={`mailto:${profile.email}`}
              className="flex-1 flex items-center justify-center gap-2.5 p-4 rounded-xl bg-[#818cf8] text-[#0a0a0a] text-sm font-semibold hover:bg-[#a5b4fc] transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2.25 4.5h13.5v10.5H2.25V4.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M2.25 4.5L9 10.5l6.75-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              이메일 보내기
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-24 pt-8 border-t border-white/6"
        >
          <p className="text-center text-sm text-[#52525b] font-mono mb-6">
            경청해 주셔서 감사합니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#52525b] font-mono">
              © 2026 김진원. Built with Next.js + Tailwind CSS
            </span>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs text-[#52525b] hover:text-[#818cf8] font-mono transition-colors duration-200 flex items-center gap-1.5"
            >
              <span>↑</span>
              Back to top
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
