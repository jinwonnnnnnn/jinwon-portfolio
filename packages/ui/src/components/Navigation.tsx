"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavItem[];
  name?: string;
}

export function Navigation({ items, name = "JW" }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = items.map((item) => item.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/6"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="text-sm font-bold tracking-widest text-[#fafafa] hover:text-[#818cf8] transition-colors duration-200 font-mono"
          >
            {name}
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-all duration-200",
                      isActive
                        ? "text-[#818cf8] bg-[#818cf8]/10"
                        : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Contact button desktop */}
          <a
            href="mailto:jinwon9514@gmail.com"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white/6 border border-white/8 text-[#fafafa] hover:bg-[#818cf8]/15 hover:border-[#818cf8]/30 hover:text-[#818cf8] transition-all duration-200"
          >
            <span>연락하기</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-[#fafafa]"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-[#fafafa]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-[#fafafa]"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl pt-20 px-6 flex flex-col gap-2 md:hidden"
          >
            {items.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left px-4 py-4 text-2xl font-semibold text-[#a1a1aa] hover:text-[#fafafa] border-b border-white/5 transition-colors duration-200"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {item.label}
              </button>
            ))}
            <a
              href="mailto:jinwon9514@gmail.com"
              className="mt-4 text-center px-5 py-3 rounded-full bg-[#818cf8] text-[#0a0a0a] font-semibold text-lg"
              onClick={() => setMenuOpen(false)}
            >
              연락하기
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
