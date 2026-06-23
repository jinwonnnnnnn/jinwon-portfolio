---
name: component-build
description: "포트폴리오 UI 컴포넌트 라이브러리 구현 스킬. 'packages/ui 컴포넌트 만들어', '버튼 컴포넌트', '카드 컴포넌트', '네비게이션 구현', 'tsup 빌드', '@portfolio/ui 패키지' 관련 작업 시 ui-builder 에이전트가 사용한다."
---

# UI 컴포넌트 라이브러리 구현

## 전제 조건

이 스킬 실행 전 다음이 완료되어 있어야 한다:
- `_workspace/02_design_system.md` 존재 (design-researcher 산출물)
- `apps/web/tailwind.config.ts`에 디자인 토큰 적용 완료
- `packages/ui/` 디렉토리 및 `tsup.config.ts` 설정 완료

## 컴포넌트 구현 순서

### 1. 기반 유틸리티

```typescript
// packages/ui/src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```typescript
// packages/ui/src/lib/animations.ts
// design-researcher가 정의한 Framer Motion variants 파일
// fadeInUp, staggerChildren, fadeIn 등
```

### 2. 컴포넌트 구현 스펙

#### Button
```typescript
interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  href?: string      // 링크 버튼
  className?: string
}
```
- primary: 포인트 컬러 배경, hover 시 밝아짐
- ghost: 투명 배경, hover 시 bg-secondary
- outline: 테두리만, hover 시 채워짐

#### Section
```typescript
interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  animate?: boolean  // useInView 기반 진입 애니메이션 여부
}
```
- Framer Motion `useInView` + `variants` 적용
- `once: true`로 첫 진입 시만 실행

#### Card
```typescript
interface CardProps {
  title: string
  description: string
  tags?: string[]
  imageUrl?: string
  href?: string
  className?: string
}
```
- hover 시 테두리 색상 변경 + 미세 scale 업
- 기술스택 태그는 Badge 컴포넌트 사용

#### Badge / Tag
```typescript
interface BadgeProps {
  label: string
  variant?: 'default' | 'accent' | 'muted'
}
```

#### AnimatedText
```typescript
interface AnimatedTextProps {
  text: string | string[]  // 배열이면 타이핑 효과 (단어 순환)
  as?: 'h1' | 'h2' | 'p' | 'span'
  variant?: 'typing' | 'reveal' | 'fadeIn'
  className?: string
}
```

#### Navigation
```typescript
interface NavigationProps {
  items: { label: string; href: string }[]
}
```
- 스크롤 시 배경 blur 처리
- 현재 섹션 활성화 표시
- 모바일: 햄버거 메뉴

### 3. index.ts 내보내기

```typescript
// packages/ui/src/index.ts
export { Button } from './components/Button'
export { Section } from './components/Section'
export { Card } from './components/Card'
export { Badge } from './components/Badge'
export { Tag } from './components/Tag'
export { AnimatedText } from './components/AnimatedText'
export { Navigation } from './components/Navigation'
export * from './lib/animations'
export { cn } from './lib/utils'
```

### 4. 빌드 및 검증

```bash
yarn workspace @portfolio/ui build
```

빌드 성공 확인: `packages/ui/dist/` 디렉토리 생성 여부

## 의존성 목록

```json
{
  "dependencies": {
    "clsx": "^2.x.x",
    "tailwind-merge": "^2.x.x",
    "framer-motion": "^11.x.x"
  }
}
```

## 산출물

1. `packages/ui/src/components/` — 컴포넌트 파일들
2. `packages/ui/src/lib/` — 유틸리티 및 애니메이션 variants
3. `packages/ui/src/index.ts` — 통합 export
4. `packages/ui/dist/` — tsup 빌드 결과물
5. `_workspace/03_components_list.md` — 구현 목록, import 예시, props 스펙

완료 후 section-developer에게 SendMessage:
"컴포넌트 빌드 완료: Button, Section, Card, Badge, Tag, AnimatedText, Navigation. `@portfolio/ui`로 import 가능. 상세 스펙: _workspace/03_components_list.md"
