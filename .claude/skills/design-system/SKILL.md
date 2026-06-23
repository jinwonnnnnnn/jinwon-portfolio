---
name: design-system
description: "포트폴리오 디자인 리서치 및 Tailwind 디자인 시스템 구축 스킬. 'awwwards 벤치마킹', '디자인 방향 정하기', '색상 팔레트', 'Tailwind 테마 설정', '디자인 토큰', '폰트 선택', '애니메이션 가이드' 요청 시 design-researcher 에이전트가 사용한다."
---

# 포트폴리오 디자인 시스템 구축

## 리서치 방법론

### Step 1: 레퍼런스 수집

WebSearch로 다음 쿼리를 실행한다:
- `"awwwards" frontend developer portfolio 2025 best`
- `"awwwards.com" portfolio dark theme animation winner`
- `Korean frontend developer portfolio 포트폴리오 디자인`

WebFetch로 상위 3~5개 사이트 분석:
- awwwards.com/websites/portfolio
- 수상작 개별 사이트

### Step 2: 디자인 패턴 추출

각 레퍼런스에서 추출:
```
배경색: #______
텍스트 색: #______
포인트 컬러: #______
헤딩 폰트: ______
바디 폰트: ______
레이아웃 특이사항: ______
애니메이션 스타일: ______
인터랙션 특이사항: ______
```

### Step 3: 디자인 방향 결정

**개발자 포트폴리오 트렌드 (2024-2025):**
- 어두운 배경 (#0a0a0a ~ #111827) + 강렬한 포인트 컬러
- 텍스트 타이포그래피 중심 레이아웃
- 스크롤 트리거 애니메이션 (Framer Motion, GSAP)
- 미니멀 + 기술적 감각 (코드 스니펫, 터미널 느낌)
- 커서 커스터마이징

## 디자인 토큰 정의

### 색상 시스템

```typescript
// tailwind.config.ts theme.extend.colors
colors: {
  // 배경 레이어
  'bg-primary': '#0a0a0a',     // 메인 배경
  'bg-secondary': '#111111',   // 카드/섹션 배경
  'bg-tertiary': '#1a1a1a',    // hover 상태
  
  // 텍스트 레이어
  'text-primary': '#f5f5f5',   // 주요 텍스트
  'text-secondary': '#a1a1aa', // 보조 텍스트
  'text-muted': '#71717a',     // 비활성/placeholder
  
  // 포인트 컬러 (레퍼런스 분석 후 결정)
  'accent': '#______',         // 메인 포인트
  'accent-muted': '#______',   // 포인트 연한 버전
  
  // 경계선
  'border': '#27272a',
  'border-hover': '#3f3f46',
}
```

### 타이포그래피

**폰트 조합 후보 (Google Fonts 무료):**

| 조합 | 헤딩 | 바디 | 특성 |
|-----|------|------|------|
| A | Syne | Inter | 모던, 기하학적 |
| B | Space Grotesk | DM Sans | 기술적, 읽기 편함 |
| C | Clash Display | Satoshi | 임팩트, 현대적 |
| D | Plus Jakarta Sans | Plus Jakarta Sans | 통일감, 클린 |

레퍼런스 분석 후 가장 적합한 조합을 선택한다.

```typescript
fontFamily: {
  heading: ['[선택된 헤딩폰트]', 'sans-serif'],
  sans: ['[선택된 바디폰트]', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],  // 코드 강조용
}
```

### 간격 / 반응형 스케일

```typescript
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

### 애니메이션 컨벤션

```typescript
// Framer Motion 공통 variants (packages/ui/src/lib/animations.ts)
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}
```

## 섹션별 디자인 가이드

| 섹션 | 레이아웃 | 특이사항 |
|-----|---------|---------|
| Hero | 풀스크린, 중앙 정렬 또는 좌측 정렬 | 타이핑 효과, 배경 그래디언트 또는 노이즈 텍스처 |
| About | 2열 (텍스트 + 사진) | 프로필 사진 둥근 처리 또는 기울기 프레임 |
| Experience | 타임라인 세로 레이아웃 | 좌측 선 + 우측 카드, 진입 시 순차 등장 |
| Projects | 3열 또는 마소나리 그리드 | hover 시 오버레이, 기술스택 필터 |
| Skills | 카테고리별 아이콘 그리드 | 각 아이템 stagger 진입 |
| Contact | 심플, 텍스트 중심 | 이메일 복사 버튼, 소셜 링크 아이콘 |

## 산출물

1. `apps/web/tailwind.config.ts` — 디자인 토큰 완성본
2. `packages/ui/src/lib/animations.ts` — Framer Motion 공통 variants
3. `_workspace/02_design_research.md` — 분석한 레퍼런스 목록 + 각 디자인 특성
4. `_workspace/02_design_system.md` — 최종 디자인 시스템 스펙 (색상, 폰트, 간격, 애니메이션)

`_workspace/02_design_system.md` 완성 후 ui-builder에게 SendMessage로 전달:
"디자인 시스템 완료: 배경 [색상], 포인트 [색상], 헤딩폰트 [폰트], 바디폰트 [폰트], 애니메이션 파일: packages/ui/src/lib/animations.ts"
