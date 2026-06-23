"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer, Badge } from "@portfolio/ui";
import { projects } from "@/data/projects";

function TiltCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(rawX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(rawY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-2xl transition-shadow duration-300 group cursor-pointer overflow-hidden ${className}`}
    >
      <motion.div
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(129,140,248,0.08) 0%, transparent 60%)`,
        }}
        className="absolute inset-0 pointer-events-none z-0"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center gap-3 mb-20"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-[#818cf8] uppercase">
            03. Projects
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
          프로젝트
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-[#a1a1aa] mb-16"
        >
          실무에서 주도적으로 설계·개발한 서비스들입니다. 카드를 클릭하면 상세 정보를 확인할 수 있습니다.
        </motion.p>

        {/* Masonry grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="columns-1 md:columns-2 lg:columns-3 gap-4"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="break-inside-avoid mb-4"
            >
              <TiltCard
                onClick={() => setSelected(project)}
                className={`w-full border p-6 ${
                  project.featured
                    ? "border-[#818cf8]/20 bg-[#818cf8]/5 hover:border-[#818cf8]/40 hover:shadow-[0_0_32px_rgba(129,140,248,0.1)]"
                    : "border-white/8 bg-white/2 hover:border-white/16 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
                }`}
              >
                {/* Image */}
                {project.image && (
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 bg-[#111]">
                    <Image
                      src={project.image}
                      alt={`${project.title} 스크린샷`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3
                    className="text-base font-bold text-[#fafafa] group-hover:text-[#a5b4fc] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono text-[#818cf8]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] animate-pulse" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="text-xs text-[#818cf8] mb-3">{project.subtitle}</div>

                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Achievement pill */}
                <div className="text-xs text-[#818cf8]/80 font-mono bg-[#818cf8]/8 border border-[#818cf8]/15 rounded-lg px-3 py-2 mb-4 leading-relaxed">
                  {project.achievement}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 5).map((tag) => (
                    <Badge key={tag} label={tag} variant="default" />
                  ))}
                  {project.tags.length > 5 && (
                    <Badge label={`+${project.tags.length - 5}`} variant="muted" />
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#111111] border border-white/10 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
              >
                {selected.image && (
                  <div className="relative w-full h-52 rounded-t-2xl overflow-hidden bg-[#0a0a0a]">
                    <Image
                      src={selected.image}
                      alt={`${selected.title} 스크린샷`}
                      fill
                      className="object-cover"
                      sizes="512px"
                    />
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-xs text-[#52525b] font-mono mb-1">{selected.company}</div>
                      <h3 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "var(--font-syne)" }}>
                        {selected.title}
                      </h3>
                      <div className="text-sm text-[#818cf8] mt-1">{selected.subtitle}</div>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-[#52525b] hover:text-[#fafafa] transition-colors p-1"
                      aria-label="닫기"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">{selected.description}</p>

                  <div className="mb-6">
                    <h4 className="text-xs font-mono text-[#818cf8] uppercase tracking-widest mb-3">주요 업무</h4>
                    <ul className="space-y-2">
                      {selected.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                          <span className="text-[#818cf8] mt-0.5 shrink-0">▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {(selected.problem || selected.solution) && (
                    <div className="mb-6 p-4 rounded-xl bg-white/2 border border-white/6">
                      {selected.problem && (
                        <div className="mb-3">
                          <div className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-1.5">문제</div>
                          <p className="text-sm text-[#a1a1aa]">{selected.problem}</p>
                        </div>
                      )}
                      {selected.solution && selected.solution.length > 0 && (
                        <div>
                          <div className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-1.5">해결</div>
                          <ul className="space-y-1">
                            {selected.solution.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                                <span className="text-[#52525b] mt-0.5 shrink-0">→</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-4 p-4 rounded-xl bg-[#818cf8]/8 border border-[#818cf8]/20">
                    <div className="text-xs font-mono text-[#818cf8] uppercase tracking-widest mb-2">핵심 성과</div>
                    <p className="text-sm text-[#fafafa]">{selected.achievement}</p>
                  </div>

                  {selected.outcomes && selected.outcomes.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-3">성과 & 경험</h4>
                      <ul className="space-y-1.5">
                        {selected.outcomes.map((o, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                            <span className="text-[#818cf8]/50 mt-0.5 shrink-0">◦</span>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {selected.tags.map((tag) => (
                      <Badge key={tag} label={tag} variant="accent" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
