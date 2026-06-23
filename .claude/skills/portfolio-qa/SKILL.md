---
name: portfolio-qa
description: "포트폴리오 사이트 품질 검증 스킬. 'QA 해줘', '빌드 확인', '반응형 체크', '접근성 검증', '성능 점검', 'TypeScript 에러 확인', '배포 전 체크' 요청 시 qa-reviewer 에이전트가 사용한다."
---

# 포트폴리오 QA 체크리스트

## 실행 순서

### Step 1: 빌드 검증 (Critical)

```bash
# packages/ui 빌드
yarn workspace @portfolio/ui build

# Next.js 빌드
yarn workspace @portfolio/web build

# TypeScript 검사
yarn workspace @portfolio/web tsc --noEmit
```

빌드 실패 시 에러 메시지를 분석하고 직접 수정 후 재빌드.

### Step 2: 코드 정적 분석

```bash
# 미사용 import 확인
grep -r "import " apps/web/src --include="*.tsx" | ...

# console.log 잔존 확인
grep -r "console.log" apps/web/src --include="*.tsx"
grep -r "console.log" packages/ui/src --include="*.tsx"

# any 타입 사용 확인
grep -r ": any" apps/web/src packages/ui/src
```

### Step 3: 반응형 검증

각 브레이크포인트에서 확인할 항목:

| 구간 | 확인 항목 |
|-----|---------|
| 375px (모바일) | 텍스트 오버플로우, 이미지 비율, 버튼 터치 타겟(44px+), 네비 메뉴 |
| 768px (태블릿) | 그리드 2열 전환, 여백 균형 |
| 1280px (데스크탑) | 최대 너비 컨테이너, 3열 그리드, 여백 |

코드 리뷰로 Tailwind 반응형 클래스(`sm:`, `md:`, `lg:`) 누락 확인.

### Step 4: 접근성 검증

```bash
# 이미지 alt 텍스트 확인
grep -r "<Image\|<img" apps/web/src --include="*.tsx" | grep -v "alt="
```

수동 확인 항목:
- `<a>` 태그에 설명적인 텍스트 또는 `aria-label`
- `<button>`에 명확한 레이블
- 색상 대비: 텍스트 vs 배경 (WCAG AA: 4.5:1 이상)
- `<main>`, `<header>`, `<nav>`, `<footer>` 랜드마크 태그 사용

### Step 5: 이미지 최적화 확인

```bash
# next/image 미사용 <img> 태그 확인
grep -rn "<img " apps/web/src --include="*.tsx"

# public 디렉토리 이미지 확인
ls apps/web/public/
```

`profile.jpg` 존재 여부 확인. 없으면 placeholder 이미지 생성.

### Step 6: 환경 변수 및 링크 확인

- `_workspace/01_content.md`의 TODO 항목 중 빌드에 영향 있는 항목 파악
- 외부 링크 (GitHub, LinkedIn) href 값이 placeholder 여부 확인
- `next.config.ts`의 설정 완결성 확인

## 이슈 분류 및 처리

### Critical — 직접 수정
- 빌드 실패, TypeScript 컴파일 에러
- 런타임 에러 (undefined 접근, 잘못된 import 등)
- 페이지 미렌더링

### Major — 보고서 기록
- 특정 브레이크포인트에서 레이아웃 파괴
- 접근성 위반 (이미지 alt 누락, 색상 대비 미달)
- 핵심 링크 미동작

### Minor — 보고서 기록
- `console.log` 잔존
- TypeScript `any` 타입 사용
- TODO 항목 (콘텐츠 미확정)
- 성능 개선 여지

## 보고서 형식

`_workspace/05_qa_report.md`:

```markdown
# QA 보고서

## 빌드 상태
- packages/ui: ✅ / ❌
- apps/web: ✅ / ❌
- TypeScript: ✅ / ❌

## Critical 이슈 (수정 완료)
- [이슈]: [수정 내용]

## Major 이슈
- [이슈]: [위치], [수정 방법]

## Minor 이슈
- [이슈 목록]

## TODO 항목 (콘텐츠 미확정)
- [항목 목록] — _workspace/01_content.md 참조

## 다음 단계
1. yarn dev로 로컬 확인
2. Major 이슈 순차 해결
3. Vercel 배포
```
