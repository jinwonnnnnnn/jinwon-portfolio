# 진원 포트폴리오

## 하네스: 포트폴리오 빌드

**목표:** Next.js 15 + Tailwind CSS + tsup + Yarn Berry 4 기반의 프론트엔드 개발자 포트폴리오 사이트 제작

**트리거:** 포트폴리오 개발, 섹션 추가/수정, 디자인 변경, 빌드 실행 등 사이트 관련 작업 요청 시 `portfolio-orchestrator` 스킬을 사용하라. 단순 질문은 직접 응답 가능.

**기술 스택:**
- Next.js 15 (App Router)
- Tailwind CSS 4
- tsup (packages/ui 번들링)
- Yarn Berry 4 (node-modules 링커)
- Framer Motion (애니메이션)
- TypeScript

**프로젝트 구조:**
- `apps/web/` — Next.js 메인 앱
- `packages/ui/` — 공용 컴포넌트 라이브러리 (tsup 빌드)
- `_workspace/` — 에이전트 작업 파일 (빌드 시 생성)

**프로필 사진:** `apps/web/public/profile.jpg`에 위치 (빌드 시 복사 필요)

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-24 | 초기 하네스 구성 | 전체 | 포트폴리오 사이트 제작 시작 |
