"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { profile } from "@/data/profile";

const roles = profile.roles;

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 60;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((frame / duration) * to));
      if (frame >= duration) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [to]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

function DownloadDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-[#818cf8] transition-colors duration-200"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-y-0.5"
        >
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        다운로드
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-full mb-2 left-0 w-44 bg-[#1c1c27] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
        >
          <a
            href="/portfolio.pdf"
            download="김진원_포트폴리오.pdf"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#fafafa] hover:bg-white/5 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>PDF 다운로드</span>
            <span className="ml-auto text-[10px] text-[#52525b]">권장</span>
          </a>
          <div className="h-px bg-white/5 mx-3" />
          <a
            href="/portfolio.pptx"
            download="김진원_포트폴리오.pptx"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#a1a1aa] hover:bg-white/5 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#818cf8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            PPT 다운로드
          </a>
        </motion.div>
      )}
    </div>
  );
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const blob1X = useTransform(mouseX, [0, 1], ["-5%", "5%"]);
  const blob1Y = useTransform(mouseY, [0, 1], ["-5%", "5%"]);
  const blob2X = useTransform(mouseX, [0, 1], ["5%", "-5%"]);
  const blob2Y = useTransform(mouseY, [0, 1], ["5%", "-5%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40,
      );
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#818cf8]/5 blur-[120px]"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#a5b4fc]/3 blur-[100px]"
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-32 w-full">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-px bg-[#818cf8]" />
          <span className="text-xs font-medium tracking-[0.2em] text-[#818cf8] uppercase font-mono">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name — 한 줄 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold leading-[1] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          김진원
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="text-xl sm:text-2xl font-medium text-[#818cf8] font-mono">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-base sm:text-lg text-[#a1a1aa] max-w-xl leading-relaxed mb-10"
        >
          {profile.bio}
          <br />
          퍼블리셔에서 시작하여 프론트엔드 개발자로 성장하며,{" "}
          <span className="text-[#fafafa]">
            단순 구현을 넘어 구조 설계와 유지보수성
          </span>
          을 함께 고민하는 3년차 개발자입니다.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center gap-5 mb-14"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group flex items-center gap-2 text-sm font-medium text-[#fafafa] hover:text-[#818cf8] transition-colors duration-200"
          >
            프로젝트 보기
            <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </button>

          <span className="w-px h-4 bg-white/15" />

          <a
            href={`mailto:${profile.email}`}
            className="text-sm font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200"
          >
            {profile.email}
          </a>

          <span className="w-px h-4 bg-white/15" />

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>

          <span className="w-px h-4 bg-white/15" />

          <DownloadDropdown />
        </motion.div>

        {/* Stats — 인라인 가로 배열 */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center gap-8"
          >
            {[
              { to: 5, suffix: "+", label: "Years Exp." },
              { to: 13, suffix: "+", label: "Projects" },
              { to: 3, suffix: "", label: "Companies" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                {i > 0 && <span className="w-px h-8 bg-white/8" />}
                <div>
                  <div
                    className="text-2xl font-bold text-[#fafafa]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-[#52525b] font-mono tracking-widest uppercase mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator — 하단 중앙 */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-[#52525b]"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
              scroll
            </span>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <rect
                x="5.5"
                y="0.5"
                width="5"
                height="9"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                cx="8"
                cy="4"
                r="1.5"
                fill="currentColor"
                className="opacity-60"
              />
              <path
                d="M8 14l-3 3m3-3l3 3"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
