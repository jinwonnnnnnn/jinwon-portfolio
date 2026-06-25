# 김진원 포트폴리오

**Frontend Developer** · React / Next.js / React Native · 5년차

사용자 경험 개선과 유지보수성을 고민하는 개발자 김진원의 포트폴리오입니다.

> 이 프로젝트는 사이트 개발, 콘텐츠 구성, 발표자료 생성까지 전 과정을 **Claude Code 멀티 에이전트 시스템**으로 구축했습니다.

---

## 프로젝트 구조

```
jinwon-portfolio/
├── apps/web/                  # Next.js 15 (App Router)
│   ├── src/
│   │   ├── app/               # 페이지 라우팅
│   │   ├── components/        # Hero, About, Experience, Projects, Skills, Contact 섹션
│   │   └── data/              # 포트폴리오 데이터 (profile, projects, experience, skills)
│   └── public/
│       ├── portfolio.pptx     # 에이전트가 자동 생성한 발표자료
│       └── portfolio.pdf      # 에이전트가 자동 생성한 PDF
├── packages/ui/               # 공용 컴포넌트 라이브러리 (tsup 번들링)
├── .claude/
│   ├── agents/                # 전문 역할 에이전트 정의
│   └── skills/                # 트리거 기반 워크플로우 스킬
└── CLAUDE.md                  # AI 에이전트 작업 지시서
```

**기술 스택:** Next.js 15 · Tailwind CSS 4 · TypeScript · Framer Motion · Yarn Berry 4 · Vercel

---

## AI 에이전트 아키텍처

이 프로젝트는 Claude Code의 **멀티 에이전트 시스템**을 활용해 개발되었습니다.  
각 에이전트는 독립된 역할을 갖고, 오케스트레이터가 전체 흐름을 조율합니다.

### 전체 흐름도

```
사용자 요청
    │
    ▼
portfolio-orchestrator  (스킬: 전체 빌드 조율)
    │
    ├── Phase 2 ──▶  project-architect     (에이전트: 모노레포 셋업)
    │
    ├── Phase 3 ──▶  design-researcher     (에이전트: 디자인 시스템 리서치)
    │          └──▶  ui-builder            (에이전트: 컴포넌트 라이브러리 구현)
    │                  ↑ 디자인 토큰 전달
    │
    ├── Phase 4 ──▶  section-developer     (에이전트: 6개 섹션 구현)
    │
    └── Phase 5 ──▶  qa-reviewer           (에이전트: 빌드·타입·반응형 검증)

사용자 요청 (PPT)
    │
    ▼
ppt-creator  (스킬: 발표자료 자동 생성)
    │
    ├── data/*.ts 읽기
    ├── pptxgenjs → portfolio.pptx 생성
    └── playwright → portfolio.pdf 생성
```

---

### 에이전트 상세

#### `portfolio-orchestrator` — 메인 오케스트레이터 (스킬)

포트폴리오 개발 관련 요청이 들어오면 자동으로 트리거됩니다.  
단순 수정인지, 전체 재빌드인지 컨텍스트를 파악해 필요한 에이전트만 선택적으로 실행합니다.

- **전체 빌드:** `apps/web/` 없을 때 Phase 2 → 5 전부 순차 실행
- **부분 수정:** 특정 섹션/컴포넌트 변경 요청 시 해당 Phase 에이전트만 호출

#### `project-architect` — 프로젝트 설계 에이전트

Next.js 15 + Yarn Berry 4 모노레포 초기 구조를 설정합니다.  
`apps/web/`, `packages/ui/`, tsup 빌드 파이프라인, Tailwind CSS 4 설정까지 담당합니다.

#### `design-researcher` — 디자인 리서처 에이전트

awwwards 수상작·개발자 포트폴리오 벤치마킹 후 디자인 토큰을 정의합니다.  
결과물은 `_workspace/02_design_system.md`로 저장되어 `ui-builder`에 전달됩니다.

#### `ui-builder` — UI 컴포넌트 빌더 에이전트

`design-researcher`의 디자인 시스템을 받아 `packages/ui`에 재사용 컴포넌트를 구현합니다.  
tsup 빌드 성공 후 `section-developer`가 이를 import해 사용합니다.

#### `section-developer` — 섹션 개발 에이전트

`apps/web/src/data/*.ts`의 포트폴리오 데이터와 `@portfolio/ui` 컴포넌트를 조합해  
Hero, About, Experience, Projects, Skills, Contact 6개 섹션을 구현합니다.

#### `qa-reviewer` — QA 검증 에이전트

빌드 성공 여부, TypeScript 에러, 반응형 레이아웃, 접근성, 성능을 검증합니다.  
Critical 이슈는 직접 수정하고, 나머지는 심각도별로 분류해 보고서를 남깁니다.

#### `ppt-creator` — 발표자료 생성 스킬

"PPT 만들어줘" 요청 시 트리거됩니다.  
`apps/web/src/data/*.ts`를 읽어 `pptxgenjs`로 PPTX를, Playwright로 PDF를 자동 생성합니다.

---

### 에이전트 간 데이터 흐름

| 데이터 | 생성 에이전트 | 소비 에이전트 | 경로 |
|--------|-------------|-------------|------|
| 포트폴리오 콘텐츠 | 사용자 입력 | section-developer, ppt-creator | `apps/web/src/data/*.ts` |
| 셋업 결과 | project-architect | orchestrator | `_workspace/01_setup_complete.md` |
| 디자인 시스템 | design-researcher | ui-builder | `_workspace/02_design_system.md` |
| 컴포넌트 목록 | ui-builder | section-developer | `_workspace/03_components_list.md` |
| QA 보고서 | qa-reviewer | orchestrator | `_workspace/05_qa_report.md` |

---

### PPT 자동 생성 파이프라인

발표자료는 **데이터 → 코드 → 파일** 방식으로 생성됩니다.  
디자인을 직접 수정하지 않고 데이터만 바꾸면 발표자료가 자동으로 갱신됩니다.

```
apps/web/src/data/projects.ts   ┐
apps/web/src/data/experience.ts ├──▶  generate-ppt.mjs  ──▶  portfolio.pptx (12슬라이드)
apps/web/src/data/profile.ts    ┘         │
                                          └──▶  generate-pdf.mjs  ──▶  portfolio.pdf
```

**슬라이드 구성 (12장):**

| # | 슬라이드 | 내용 |
|---|---------|------|
| 1 | 커버 | 이름, 직함, 연락처 |
| 2 | 경력 타임라인 | 글로비코리아 → 에스엔소프트 → 스탠다드네트웍스 |
| 3 | 핵심 성과 | FE 2인 주도, exports 182→0, 30→1 Form 통합 등 실측 수치 |
| 4 | 기술 스택 | 카테고리별 시각화 |
| 5–10 | 프로젝트 × 6 | 배경·기술 선정 이유·담당 업무·성과 |
| 11 | 개발 철학 | 사용자 경험·유지보수성·협업·문제 해결 |
| 12 | 클로징 | 연락처 및 GitHub |

---

### AI 활용 시 콘텐츠 검증

AI가 초안을 빠르게 생성하지만, 사실 검증은 사람이 직접 수행했습니다.

- `"PG 연동 표준화"`, `"결제 승인/취소 예외처리 강화"` → 직접 수행하지 않은 업무로 삭제
- `"공수 40% 절감"` → 측정 근거 없는 수치 삭제, Knip 정적 분석 실측 결과(`exports 182→0`)로 대체

---

## 로컬 실행

```bash
yarn install
yarn workspace @portfolio/web dev
```

## 발표자료 재생성

`apps/web/src/data/*.ts` 수정 후 Claude Code에서:

```
pptx 재생성해줘
```

`ppt-creator` 스킬이 데이터를 읽어 새 파일을 자동 생성합니다.

---

## 연락처

- **Email:** jinwon9514@gmail.com
- **GitHub:** [github.com/jinwonnnnnnn](https://github.com/jinwonnnnnnn)
