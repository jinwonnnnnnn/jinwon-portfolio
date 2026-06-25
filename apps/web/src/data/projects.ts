export interface Project {
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  problem?: string;
  solution?: string[];
  achievement: string;
  outcomes?: string[];
  tags: string[];
  company: string;
  type: "company" | "personal";
  duration?: string;
  teamSize?: string;
  images?: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  /* ── 회사 프로젝트 ─────────────────────────────────────────── */
  {
    title: "015 삐삐 앱",
    subtitle: "메시징 서비스",
    description:
      "React Native 기반의 하이브리드 메시징 서비스. 앱 전반의 아키텍처 설계부터 인앱 결제, 푸시 알림까지 전 과정을 주도했습니다.",
    details: [
      "애플리케이션 전반의 아키텍처 및 구조 설계",
      "인앱 결제 연동 및 푸시 알림 기능 개발",
      "공통 UI 컴포넌트 라이브러리 구축",
      "모바일 특화 UI/UX 개선 및 반응형 인터페이스 구현",
    ],
    problem:
      "빈번한 운영 콘텐츠 변경 및 알림 진입 속도 이슈로 사용자 경험 저하",
    solution: [
      "React Native 기반의 WebView + Native 혼합 구조 설계로 운영 효율성 확보",
      "Native 확장성을 위해 Expo 대신 순수 React Native 환경 구축",
    ],
    achievement: "하이브리드 구조 도입으로 개발·운영 공수 50% 절감",
    outcomes: [
      "콜드 스타트 및 백그라운드 알림 응답 속도 획기적 개선",
      "015 삐삐 앱 정식 런칭 및 안정적 실서비스 운영",
      "Native 기능과 웹 콘텐츠 간의 효율적인 통신 구조 수립",
    ],
    tags: [
      "React Native 0.81",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "WebView",
      "FCM",
      "Notifee",
      "STOMP/WebSocket",
      "인앱결제",
      "react-navigation",
      "Reanimated",
      "Keychain",
    ],
    company: "스탠다드네트웍스",
    type: "company",
    images: [
      "/images/projects/bbi-1.png",
      "/images/projects/bbi-2.png",
      "/images/projects/bbi-3.png",
      "/images/projects/bbi-4.png",
      "/images/projects/bbi-5.png",
    ],
    featured: true,
  },
  {
    title: "015 웹",
    subtitle: "메시징 플랫폼",
    description:
      "알림톡 및 일반 메시지 발송 서비스 운영 효율화 및 개발 문화 정립을 위한 구조적 개선 프로젝트.",
    details: [
      "알림톡 및 일반 메시지 발송 프로세스 전반 개발",
      "발송 대상 및 템플릿 관리 시스템 구축",
      "UI/UX 리뉴얼 및 사내 디자인 시스템 개선 참여",
      "Claude.md 기반 프로젝트 컨벤션 및 기술 문서 관리",
    ],
    problem: "코딩 컨벤션 부재로 개발자마다 파일 구조·컴포넌트 작성 방식이 달라 유지보수 비용 증가",
    solution: [
      "프로젝트 컨벤션 수립 및 React Query 도입을 통한 구조 표준화 및 최적화",
      "API 캐싱, Code Splitting 적용으로 번들 사이즈 및 로딩 속도 개선",
      "Knip 도입으로 정적 분석 환경 개선 및 레거시 제거 — 미사용 파일 297개 제거, Unused exports 182→0, types 63→0 정리",
      "주소록 대량 업로드 엑셀 양식의 휴대폰 번호 열을 텍스트 서식으로 미리 설정하여 제공 — '셀 서식을 텍스트로 바꿔주세요' 안내 문구를 고객에게 전가하는 대신, 양식 자체를 개선해 고객 문의 감소 및 UX 개선",
    ],
    achievement: "코드 표준화 및 중복 제거로 유지보수 공수 40% 절감",
    outcomes: [
      "사용자 중심의 발송 플로우 개선으로 업무 편의성 향상",
      "Copilot 및 Claude Code를 활용한 개발 생산성 극대화",
      "일관된 구조 정립으로 팀원 온보딩 및 협업 효율성 강화",
    ],
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Recoil",
      "TanStack Query",
      "Styled-Components",
      "Ant Design",
      "MUI",
      "STOMP/WebSocket",
      "JsSIP",
      "React Hook Form",
      "yup",
    ],
    company: "스탠다드네트웍스",
    type: "company",
    images: [
      "/images/projects/web015-3.png",
      "/images/projects/web015-2.png",
      "/images/projects/web015-4.png",
      "/images/projects/web015-5.png",
    ],
    featured: true,
  },
  {
    title: "차세대 커스터머",
    subtitle: "고객 충전 자동화 및 전송량 대시보드",
    description:
      "수동으로 이루어지던 고객 충전 프로세스를 자동화하고, 전송량 조회·통계 대시보드를 신규 구축하여 고객 편의성과 운영 효율을 동시에 향상시킨 플랫폼.",
    details: [
      "고객 충전 프로세스 자동화 개발 — 수동 처리 제거 및 정확도 향상",
      "전송량 조회·현황 대시보드 구현 — DnD Kit 위젯으로 고객 맞춤 레이아웃",
      "Chart.js 기반 월별/일별 전송량 통계 시각화 + ExcelJS 정산 내보내기",
      "FE 아키텍처 설계 및 공통 컴포넌트 라이브러리 구축",
    ],
    problem:
      "기존 고객 충전 프로세스가 전부 수동 운영 — 담당자가 직접 처리해야 해 누락·오류 발생. 전송량 통계도 별도 요청 없이는 고객이 직접 조회 불가",
    solution: [
      "고객 충전 프로세스 자동화 개발로 수동 업무 제거 및 처리 정확도 향상",
      "전송량 조회·현황 대시보드 구현 — DnD Kit 위젯으로 고객이 직접 레이아웃 커스터마이징",
      "Chart.js 기반 월별/일별 통계 시각화 + ExcelJS 정산 데이터 내보내기",
    ],
    achievement:
      "수동 충전 프로세스 자동화 및 전송량 실시간 대시보드 제공으로 운영 효율·고객 편의 동시 향상",
    outcomes: [
      "수동 처리 제거로 누락·오류 방지 및 운영 공수 절감",
      "전송량 실시간 대시보드로 고객 데이터 접근성 향상",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "SSE",
      "FCM",
      "Service Worker",
      "TanStack Table",
      "React Hook Form",
      "Zod",
      "ExcelJS",
      "Chart.js",
      "DnD Kit",
    ],
    company: "스탠다드네트웍스",
    type: "company",
    images: ["/images/projects/customer-1.png"],
    featured: true,
  },
  {
    title: "차세대 인트라넷",
    subtitle: "레거시 전환 프로젝트",
    description:
      "레거시 인트라넷을 Next.js 14 기반 차세대 시스템으로 전환. NextAuth 기반 RBAC 인증 및 30종 품의서 범용 Form으로 통합.",
    details: [
      "프로젝트 초기 아키텍처 설계 및 Next.js 14 환경 구축",
      "NextAuth를 활용한 통합 인증 및 권한 기반 접근제어(RBAC) 시스템 구축",
      "계약, 고객(업체), 일정(캘린더), 통계, 품의/결제 핵심 모듈 개발",
      "범용 Form 컴포넌트 및 재사용 가능한 UI 라이브러리 제작",
    ],
    problem:
      "30여 종의 품의서가 개별 구조로 운영되어 수정 및 유지보수 비용 과다 발생",
    solution: ["품의서 구조 분석을 통한 범용 Form 설계 및 API 표준화 제안"],
    achievement: "30여 종의 품의서를 1개의 범용 Form 구조로 완벽 통합",
    outcomes: [
      "Next.js 14 및 NextAuth 기반의 현대적 아키텍처로 전면 전환",
      "대규모 레거시 전환 프로젝트를 통한 엔터프라이즈급 서비스 설계 경험",
      "인증 및 보안이 중요한 사내 시스템의 프론트엔드 핵심 로직 구현",
    ],
    tags: [
      "Next.js 14",
      "TypeScript",
      "Shadcn UI",
      "Radix UI",
      "Jotai",
      "TanStack Query",
      "NextAuth.js",
      "React Hook Form",
      "Zod",
      "Recharts",
      "dnd-kit",
      "ExcelJS",
      "Storybook",
      "MSW",
    ],
    company: "스탠다드네트웍스",
    type: "company",
  },
  {
    title: "자사 서비스 통합 관리자",
    subtitle: "통합 운영 플랫폼",
    description:
      "015, 싸다오, 아레오 등 분산된 서비스의 통합 운영 플랫폼 구축. 신규 서비스 추가 시 최소한의 개발로 대응 가능한 확장성 있는 구조 설계.",
    details: [
      "서비스 신청 내역, 고객 정보, 운영 데이터 통합 관리 기능 설계",
      "표준화된 운영 워크플로우 구축 및 관리자 UI 개발",
      "다양한 서비스 데이터 모델을 수용하는 통합 인터페이스 구현",
      "운영자 편의를 위한 통합 대시보드 및 리포트 기능 개발",
    ],
    problem:
      "서비스별로 신청 내역과 운영 데이터가 개별 관리되어 운영 효율성 저하",
    solution: [
      "하나의 시스템에서 모든 서비스 데이터를 통합 관리할 수 있는 운영 플랫폼 구축",
      "중복된 운영 프로세스를 제거하여 관리 리소스 낭비 문제 해결",
    ],
    achievement: "확장성 확보 — 신규 서비스 추가 시 최소한의 개발로 즉시 대응",
    outcomes: [
      "유연한 아키텍처 수립을 통해 비즈니스 확장성에 기여",
      "통합 시스템 구축을 통한 사내 운영 리소스 최적화",
    ],
    tags: ["React", "Next.js", "TypeScript", "REST API"],
    company: "스탠다드네트웍스",
    type: "company",
  },
  {
    title: "스마트오더",
    subtitle: "주문 및 결제 기반 운영 서비스",
    description:
      "주문 및 결제 기반 서비스의 운영 환경에서 기존 코드 유지보수 및 UI 개선 수행.",
    details: [
      "기존 코드 기반 유지보수 및 UI 개선 작업 수행",
      "월별/주별 매출 보고 UI 개선",
      "업무 흐름 기반 인터페이스 개선으로 사용성 향상",
      "결제기 연동 기능 대응 및 운영 이슈 처리 지원",
    ],
    problem:
      "기존 운영 시스템의 매출 보고 UI 부재와 복잡한 인터페이스로 인한 업무 효율 저하",
    solution: [
      "월별/주별 매출 보고 UI 신규 개발로 운영 담당자 데이터 접근성 향상",
      "업무 흐름에 맞춘 인터페이스 개선 및 운영 이슈 대응 지원",
    ],
    achievement: "매출 보고 UI 개선 및 업무 흐름 기반 인터페이스 개선으로 사용성 향상",
    outcomes: [
      "월별/주별 매출 보고 UI 개선으로 운영 효율성 향상",
      "주문 및 결제 기반 서비스 운영 환경 실전 경험 축적",
    ],
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Ant Design",
      "NICE PG",
      "EasyPay",
      "카드 단말기 연동",
    ],
    company: "스탠다드네트웍스",
    type: "company",
    images: [
      "/images/projects/smart-order-1.png",
      "/images/projects/smart-order-2.png",
    ],
  },

  /* ── 개인 프로젝트 (레포 생성일 최신순) ──────────────────────── */
  {
    title: "jinwon-portfolio",
    subtitle: "개인 포트폴리오 사이트",
    description:
      "Next.js 15 App Router + Tailwind CSS 4 기반 프론트엔드 개발자 포트폴리오. Yarn Berry 4 모노레포 구조와 GitHub Actions CI/CD 파이프라인을 직접 구축했습니다.",
    details: [
      "Next.js 15 App Router 기반 SPA 및 Framer Motion 인터랙션 구현",
      "apps/web + packages/ui 분리 Yarn Berry 4 모노레포 설계",
      "tsup으로 공용 컴포넌트 라이브러리 빌드 파이프라인 구성",
      "GitHub Actions + Vercel 자동 배포 파이프라인 구축",
    ],
    achievement: "Vercel 환경에서 Yarn Berry 4 번들 바이너리 직접 실행으로 CI/CD 파이프라인 완성",
    outcomes: [
      "모노레포 구조 설계 및 패키지 간 의존성 관리 경험",
      "CI(타입 체크·빌드) → CD(Vercel 배포) 완전 자동화",
    ],
    tags: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "Yarn Berry 4",
      "tsup",
      "GitHub Actions",
      "Vercel",
    ],
    company: "개인",
    type: "personal",
    duration: "2026.06 ~ 진행 중",
    teamSize: "개인",
    github: "https://github.com/jinwonnnnnnn/jinwon-portfolio",
    featured: true,
  },
  {
    title: "GroupMemo",
    subtitle: "AI 자동 그룹화 메모 앱",
    description:
      "AI가 메모를 자동으로 분류·그룹화해주는 React Native(Expo) 앱. LLM API를 활용한 에이전트 아키텍처로 설계하여 Web · iOS · Android를 모두 지원합니다.",
    details: [
      "메모 CRUD 및 그룹 필터링, 색상 태그 기능 구현",
      "MemoAgent → GroupingAgent → AIAgent 3계층 에이전트 패턴 설계",
      "AsyncStorage + Zustand persist로 로컬 영구 저장 구현",
      "OpenAI-compatible API 추상화로 LLM 공급자 교체 가능 구조",
    ],
    achievement: "에이전트 아키텍처 도입으로 AI 기능 완전 모듈화 및 교체 가능 구조 실현",
    outcomes: [
      "React Native(Expo) 기반 크로스플랫폼 앱 처음부터 설계",
      "실제 AI API 연동 및 LLM 추상화 레이어 경험",
    ],
    tags: [
      "Expo SDK 54",
      "React Native",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "NativeWind",
      "OpenAI API",
      "Expo Router",
      "Vitest",
    ],
    company: "개인",
    type: "personal",
    duration: "2026.06",
    teamSize: "개인",
    github: "https://github.com/jinwonnnnnnn/GroupMemo",
  },
  {
    title: "korean-search-utils",
    subtitle: "한글 검색 npm 패키지",
    description:
      "React 프로젝트에서 한글 자모 분리·초성 검색·fuzzy 매칭을 지원하는 유틸리티 함수와 커스텀 훅 npm 패키지. ESM + CJS 듀얼 빌드를 지원합니다.",
    details: [
      "한글 자모 분리(disassembleHangul) 및 초성 fuzzy 검색(isMatch) 구현",
      "하이라이팅용 매칭 구간 반환(getMatchSegments) 유틸 제공",
      "React 없이도 사용 가능한 필터+정렬 유틸(filterAndSort) 제공",
      "tsup으로 ESM + CJS 듀얼 빌드 및 npm 배포",
    ],
    achievement: "npm 패키지 배포 — 설치 즉시 초성 검색·하이라이팅을 사용할 수 있는 라이브러리 완성",
    outcomes: [
      "한글 처리 알고리즘 직접 구현 및 패키지 설계 경험",
      "tsup 듀얼 빌드(ESM/CJS) 및 npm 배포 파이프라인 구축",
    ],
    tags: ["TypeScript", "tsup", "npm", "React", "ESM", "CJS"],
    company: "개인",
    type: "personal",
    duration: "2025.05",
    teamSize: "개인",
    github: "https://github.com/jinwonnnnnnn/korean-search-utils",
  },
  {
    title: "WeddingJS",
    subtitle: "모바일 웨딩 청첩장",
    description:
      "Framer Motion과 Lenis를 활용한 감성적인 모바일 웨딩 청첩장 프로젝트. 오프닝 애니메이션, 부드러운 스크롤, 갤러리, 배경음악, 카운트다운 기능을 포함합니다.",
    details: [
      "framer-motion 기반 감성적인 오프닝 페이드 인/아웃 애니메이션 구현",
      "lenis 라이브러리로 자연스러운 모바일 스크롤 인터랙션 구현",
      "갤러리, 배경음악 재생, D-day 카운트다운 기능 개발",
      "모바일 특화 반응형 UI 설계 및 공유하기 기능 구현",
    ],
    achievement: "4일 개발로 Framer Motion + Lenis 조합의 완성도 높은 모바일 청첩장 구현",
    outcomes: [
      "복합 애니메이션 연출과 타이밍 제어 심화 경험",
      "모바일 스크롤 라이브러리(Lenis) 통합 및 성능 최적화",
    ],
    tags: ["React 18", "TypeScript", "Vite", "Framer Motion", "Lenis"],
    company: "개인",
    type: "personal",
    duration: "2025.03 · 4일",
    teamSize: "개인",
    github: "https://github.com/jinwonnnnnnn/WeddingJS",
    live: "https://jinwonnnnnnn.github.io/WeddingJS/",
    images: [
      "/images/projects/wedding-1.png",
      "/images/projects/wedding-2.png",
      "/images/projects/wedding-3.png",
    ],
  },
  {
    title: "풀때기",
    subtitle: "웰빙 맛집 검색 서비스",
    description:
      "카카오맵 API와 Geolocation을 활용해 현재 위치 기반으로 웰빙 음식점을 찾아주는 서비스. 4인 팀프로젝트로, 지도 관련 기능 전담 개발.",
    details: [
      "카카오맵 API + Geolocation으로 현재 위치 감지 및 지도 표시",
      "지도 마커 표시 및 카테고리·지역 기반 마커 필터링 구현",
      "지역명·음식 키워드 검색 및 결과 목록 연동",
      "Firebase Authentication 기반 로그인·회원가입",
      "리뷰·평점 작성/수정/삭제 및 즐겨찾기 기능",
    ],
    problem: "웰빙 음식점 정보가 분산되어 있어 사용자가 현재 위치 기반으로 쉽게 찾기 어려움",
    solution: [
      "카카오맵 API + Geolocation으로 현재 위치를 즉시 지도에 반영",
      "지도 마커와 필터를 연동해 카테고리별 음식점을 시각적으로 탐색 가능하도록 구현",
      "Firebase Serverless 구조로 프론트엔드 팀만으로 풀스택 서비스 완성",
    ],
    achievement: "카카오맵 API 지도 기능 전담 — 현재위치 표시·마커 필터링 직접 설계·구현",
    outcomes: [
      "외부 지도 API 통합 및 Geolocation 실전 경험",
      "Redux Toolkit 기반 전역 상태 관리 구조 이해",
      "4인 팀 협업과 Git Flow 브랜치 전략 실습",
    ],
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Redux Toolkit",
      "Firebase",
      "Tailwind CSS",
      "카카오맵 API",
      "React Router",
    ],
    company: "개인",
    type: "personal",
    duration: "2023.02",
    teamSize: "4인 팀",
    github: "https://github.com/jinwonnnnnnn/pulttaegi_fork",
    live: "https://pulttaegi.vercel.app/",
    images: [
      "/images/projects/pulttaegi-1.png",
      "/images/projects/pulttaegi-2.png",
      "/images/projects/pulttaegi-3.png",
      "/images/projects/pulttaegi-4.png",
    ],
  },
];
