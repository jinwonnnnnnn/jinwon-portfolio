export interface Experience {
  company: string;
  companyEn: string;
  role: string;
  period: string;
  description: string;
  boldTerms: string[];
  highlights: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    company: "스탠다드네트웍스",
    companyEn: "Standard Networks",
    role: "Frontend Developer",
    period: "2024.01 - 2026.04",
    description:
      "메시징 서비스 및 통합 관리자 플랫폼 개발 주도. React, Next.js, React Native 기반의 대규모 서비스 구축 및 운영 효율화 중심 프로젝트 수행.",
    boldTerms: ["React, Next.js, React Native"],
    highlights: [
      "React Native WebView + Native 혼합 구조 설계로 개발·운영 공수 50% 절감",
      "React Query 도입 및 프로젝트 컨벤션 수립으로 유지보수 공수 40% 절감",
      "30여 종의 품의서를 범용 Form 1개로 완벽 통합 — 시스템 유지보수성 획기적 향상",
      "차세대 커스터머 정산 시스템 초기 설계부터 배포까지 FE 2인 주도",
    ],
    tags: ["React", "Next.js", "React Native", "TypeScript", "React Query", "Tailwind CSS"],
  },
  {
    company: "에스엔소프트 (하이코딩)",
    companyEn: "SN Soft (HiCoding)",
    role: "Web Publisher",
    period: "2021.04 - 2022.10",
    description:
      "SK Hynix, Samsung SDS, Hyundai Kefico 등 주요 기업의 교육 플랫폼 및 랜딩 페이지 제작. 반응형 웹 구축 및 웹 표준 준수 퍼블리싱 수행.",
    boldTerms: ["SK Hynix, Samsung SDS, Hyundai Kefico"],
    highlights: [
      "SK Hynix, Samsung SDS, Hyundai Kefico 등 대기업 교육 플랫폼 다수 구축",
      "반응형 웹 구축 및 크로스 브라우저 웹 표준 준수 퍼블리싱",
      "다수의 기업용 랜딩 페이지 제작 및 유지보수",
    ],
    tags: ["HTML", "CSS", "JavaScript", "반응형 웹", "웹 표준"],
  },
  {
    company: "글로비코리아",
    companyEn: "Globi Korea",
    role: "Web Publisher",
    period: "2020.04 - 2021.01",
    description:
      "자사 쇼핑몰 운영 및 CMS 유지보수. 사용자 인터페이스(UI) 개선 및 이벤트 프로모션 페이지 제작 주도.",
    boldTerms: ["CMS 유지보수"],
    highlights: [
      "자사 쇼핑몰 UI/UX 개선 및 CMS 유지보수",
      "이벤트 프로모션 페이지 기획·제작 주도",
    ],
    tags: ["HTML", "CSS", "jQuery", "CMS"],
  },
];
