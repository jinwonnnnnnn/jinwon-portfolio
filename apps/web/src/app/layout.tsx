import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "김진원 | Frontend Developer",
  description:
    "사용자 경험 개선과 유지보수성을 고민하는 프론트엔드 개발자 김진원의 포트폴리오입니다.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "김진원"],
  authors: [{ name: "김진원" }],
  openGraph: {
    title: "김진원 | Frontend Developer",
    description: "사용자 경험 개선과 유지보수성을 고민하는 프론트엔드 개발자",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${syne.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
