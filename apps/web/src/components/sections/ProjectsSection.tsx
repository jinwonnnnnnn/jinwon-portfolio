"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer, Badge } from "@portfolio/ui";
import { projects, type Project } from "@/data/projects";

/* ── Image Slider (card) ─────────────────────────────────────── */
function ImageSlider({ images, stopPropagation }: { images: string[]; stopPropagation?: boolean }) {
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation();
    setCurrent((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation();
    setCurrent((i) => (i + 1) % images.length);
  };

  return (
    <div
      className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0d0d0d] select-none"
      style={{ isolation: "isolate" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`slide ${current + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors"
            aria-label="이전"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors"
            aria-label="다음"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5.5 2.5L10 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  if (stopPropagation) e.stopPropagation();
                  setCurrent(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === current ? "bg-white w-3" : "bg-white/40 w-1.5"
                }`}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Image Slider (modal) ────────────────────────────────────── */
function ModalImageSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative w-full rounded-t-2xl overflow-hidden bg-[#0a0a0a]">
      <motion.div
        key={current}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        <Image
          src={images[current]}
          alt={`slide ${current + 1}`}
          width={800}
          height={1200}
          className="w-full object-contain"
          style={{ height: "auto", maxHeight: "55vh" }}
          sizes="512px"
        />
      </motion.div>

      {images.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none z-10">
            <button
              onClick={() => setCurrent((i) => (i - 1 + images.length) % images.length)}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-colors"
              aria-label="이전"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M9.5 3L5 8l4.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setCurrent((i) => (i + 1) % images.length)}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-colors"
              aria-label="다음"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.5 3L11 8l-4.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === current ? "bg-white w-5" : "bg-white/40 w-1.5"
                }`}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-3 right-3 z-10 text-xs font-mono text-white/50 bg-black/40 rounded-full px-2 py-0.5">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

/* ── TiltCard ────────────────────────────────────────────────── */
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
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });
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
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-2xl transition-shadow duration-300 group cursor-pointer ${className}`}
    >
      <motion.div
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(129,140,248,0.08) 0%, transparent 60%)`,
        }}
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ── Modal ───────────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111111] border border-white/10 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
      >
        {project.images && project.images.length > 0 && (
          <ModalImageSlider images={project.images} />
        )}

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs text-[#52525b] font-mono mb-1">{project.company}</div>
              <h3 className="text-2xl font-bold text-[#fafafa]" style={{ fontFamily: "var(--font-syne)" }}>
                {project.title}
              </h3>
              <div className="text-sm text-[#818cf8] mt-1">{project.subtitle}</div>
              {project.type === "personal" && (project.duration || project.teamSize) && (
                <div className="flex gap-3 mt-2 text-xs text-[#52525b] font-mono">
                  {project.duration && <span>⏱ {project.duration}</span>}
                  {project.teamSize && <span>👤 {project.teamSize}</span>}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#52525b] hover:text-[#fafafa] transition-colors p-1"
                  aria-label="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}
              <button
                onClick={onClose}
                className="text-[#52525b] hover:text-[#fafafa] transition-colors p-1"
                aria-label="닫기"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">{project.description}</p>

          <div className="mb-6">
            <h4 className="text-xs font-mono text-[#818cf8] uppercase tracking-widest mb-3">주요 업무</h4>
            <ul className="space-y-2">
              {project.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                  <span className="text-[#818cf8] mt-0.5 shrink-0">▸</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {(project.problem || project.solution) && (
            <div className="mb-6 p-4 rounded-xl bg-white/2 border border-white/6">
              {project.problem && (
                <div className="mb-3">
                  <div className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-1.5">문제</div>
                  <p className="text-sm text-[#a1a1aa]">{project.problem}</p>
                </div>
              )}
              {project.solution && project.solution.length > 0 && (
                <div>
                  <div className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-1.5">해결</div>
                  <ul className="space-y-1">
                    {project.solution.map((s, i) => (
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
            <p className="text-sm text-[#fafafa]">{project.achievement}</p>
          </div>

          {project.outcomes && project.outcomes.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-mono text-[#52525b] uppercase tracking-widest mb-3">성과 & 경험</h4>
              <ul className="space-y-1.5">
                {project.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                    <span className="text-[#818cf8]/50 mt-0.5 shrink-0">◦</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} label={tag} variant="accent" />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── ProjectCard ─────────────────────────────────────────────── */
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <TiltCard
      onClick={onClick}
      className={`w-full border p-6 ${
        project.featured
          ? "border-[#818cf8]/20 bg-[#818cf8]/5 hover:border-[#818cf8]/40 hover:shadow-[0_0_32px_rgba(129,140,248,0.1)]"
          : "border-white/8 bg-white/2 hover:border-white/16 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
      }`}
    >
      {project.images && project.images.length > 0 && (
        <div className="mb-5">
          <ImageSlider images={project.images} stopPropagation />
        </div>
      )}

      {/* Top row: company badge (company) or meta (personal) + title + actions */}
      {project.type === "company" && (
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#52525b] bg-white/4 border border-white/8 rounded-md px-2 py-0.5 mb-3">
          {project.company}
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mb-1">
        <h3
          className="text-base font-bold text-[#fafafa] group-hover:text-[#a5b4fc] transition-colors duration-200"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {project.title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#818cf8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] animate-pulse" />
              Featured
            </span>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#52525b] hover:text-[#fafafa] transition-colors"
              aria-label="GitHub"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className="text-xs text-[#818cf8] mb-1">{project.subtitle}</div>

      {project.type === "personal" && (project.duration || project.teamSize) && (
        <div className="flex gap-2 mb-3 text-xs text-[#52525b] font-mono">
          {project.duration && <span>{project.duration}</span>}
          {project.teamSize && <span>· {project.teamSize}</span>}
        </div>
      )}

      <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">{project.description}</p>

      <div className="text-xs text-[#818cf8]/80 font-mono bg-[#818cf8]/8 border border-[#818cf8]/15 rounded-lg px-3 py-2 mb-4 leading-relaxed">
        {project.achievement}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 5).map((tag) => (
          <Badge key={tag} label={tag} variant="default" />
        ))}
        {project.tags.length > 5 && (
          <Badge label={`+${project.tags.length - 5}`} variant="muted" />
        )}
      </div>
    </TiltCard>
  );
}

/* ── Main Section ────────────────────────────────────────────── */
export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"company" | "personal">("company");

  const companyProjects = projects.filter((p) => p.type === "company");
  const personalProjects = projects.filter((p) => p.type === "personal");

  // Group company projects by company name
  const companyGroups = companyProjects.reduce<Record<string, Project[]>>(
    (acc, p) => {
      if (!acc[p.company]) acc[p.company] = [];
      acc[p.company].push(p);
      return acc;
    },
    {}
  );

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
          className="text-[#a1a1aa] mb-10"
        >
          실무에서 주도적으로 설계·개발한 서비스들입니다. 카드를 클릭하면 상세 정보를 확인할 수 있습니다.
        </motion.p>

        {/* Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex gap-1 p-1 bg-white/4 border border-white/6 rounded-xl w-fit mb-12"
        >
          {(["company", "personal"] as const).map((tab) => {
            const count = tab === "company" ? companyProjects.length : personalProjects.length;
            const label = tab === "company" ? "회사 프로젝트" : "개인 프로젝트";
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[#818cf8]/20 text-white border border-[#818cf8]/30"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {label}
                <span className={`ml-1.5 text-xs font-mono ${activeTab === tab ? "text-[#818cf8]" : "text-white/30"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "company" && (
            <motion.div
              key="company"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="columns-1 md:columns-2 lg:columns-3 gap-4"
            >
              {companyProjects.map((project, i) => (
                <div key={i} className="break-inside-avoid mb-4">
                  <ProjectCard project={project} onClick={() => setSelected(project)} />
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "personal" && (
            <motion.div
              key="personal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="columns-1 md:columns-2 lg:columns-3 gap-4"
            >
              {personalProjects.map((project, i) => (
                <div key={i} className="break-inside-avoid mb-4">
                  <ProjectCard project={project} onClick={() => setSelected(project)} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
