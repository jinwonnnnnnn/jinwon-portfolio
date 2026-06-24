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
  images?: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
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
    problem: "파일 구조 및 컴포넌트 작성 방식 상이로 인한 유지보수 비용 증가",
    solution: [
      "프로젝트 컨벤션 수립 및 React Query 도입을 통한 구조 표준화 및 최적화",
      "API 캐싱, Code Splitting 적용으로 번들 사이즈 및 로딩 속도 개선",
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
    images: [
      "/images/projects/web015-1.png",
      "/images/projects/web015-2.png",
      "/images/projects/web015-3.png",
      "/images/projects/web015-4.png",
    ],
    featured: true,
  },
  {
    title: "차세대 커스터머",
    subtitle: "관리자 정산 시스템",
    description:
      "기존 관리자 시스템을 대체하는 차세대 운영 플랫폼. FE 2인이 주도적으로 설계·개발한 대시보드 및 정산 관리 시스템.",
    details: [
      "메인 대시보드 및 충전/정산 관리 시스템 개발",
      "월별 이용 현황 및 전반적인 통계 관리 기능 구축",
      "프론트엔드 프로젝트 컨벤션 수립 및 공통 컴포넌트 라이브러리 제작",
      "백엔드와 API 데이터 모델 협의 및 메뉴 구조 설계",
    ],
    problem:
      "기존 시스템의 노후화로 인한 운영 효율 저하 및 데이터 시각화 요구 증대",
    solution: [
      "최신 스택을 활용한 차세대 정산 플랫폼 구축 및 데이터 중심 UI 설계",
      "프론트엔드를 주도적으로 설계 및 개발하여 시스템 전반의 품질 확보",
    ],
    achievement: "DnD Kit 위젯 대시보드, Chart.js 실시간 통계 시각화 구현",
    outcomes: [
      "대규모 관리 시스템의 초기 설계부터 배포까지의 전 과정 주도",
      "운영자 피드백을 반영한 직관적인 관리 환경 구축",
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
  },
  {
    title: "스마트오더",
    subtitle: "주문 관리 시스템",
    description:
      "매장 주문 및 결제를 관리하는 운영 시스템 유지보수. NICE 카드 단말기 및 EasyPay 결제 모듈 연동 경험.",
    details: [
      "주문 관리 시스템 유지보수 및 실시간 운영 이슈 대응",
      "결제 프로세스 최적화 및 매출 조회 기능 개선",
      "NICE 카드 단말기 및 EasyPay 결제 모듈 연동/관리",
      "UI/UX 개선을 통한 매장 운영 효율성 제고",
    ],
    problem:
      "오프라인 결제 및 주문 프로세스의 복잡성으로 인한 예외 상황 빈번 발생",
    solution: [
      "결제 승인/취소 로직의 예외 처리 강화 및 실시간 로그 분석 시스템 활용",
      "PG 연동 프로세스 표준화를 통한 결제 오류 발생률 감소",
    ],
    achievement: "PG 연동 프로세스 표준화로 결제 오류 발생률 감소",
    outcomes: [
      "주문 → 결제 → 정산으로 이어지는 전체 비즈니스 워크플로우 완벽 이해",
      "PG 및 단말기 연동 등 하드웨어-소프트웨어 간 통신 구조 경험",
      "매출 데이터 정합성 확보를 위한 시스템 안정화 기여",
    ],
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Recoil",
      "React Query",
      "Ant Design",
      "styled-components",
      "Framer Motion",
      "SSE",
      "NICE PG",
      "EasyPay",
    ],
    company: "스탠다드네트웍스",
    images: [
      "/images/projects/smart-order-1.png",
      "/images/projects/smart-order-2.png",
    ],
  },
];
