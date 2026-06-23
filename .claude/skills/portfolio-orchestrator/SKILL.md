---
name: portfolio-orchestrator
description: "포트폴리오 사이트 전체 빌드 워크플로우를 조율하는 메인 오케스트레이터. '포트폴리오 만들어', '사이트 개발 시작', '빌드해줘', '섹션 추가해줘', '다시 실행', '재빌드', '업데이트', '포트폴리오 수정', '디자인 바꿔', '컴포넌트 추가' 등 포트폴리오 개발 관련 작업이 요청되면 반드시 이 스킬을 사용한다. project-architect, design-researcher, ui-builder, section-developer, qa-reviewer 에이전트를 단계별로 조율하여 셋업→디자인→컴포넌트→섹션→QA 전체 파이프라인을 실행한다."
---

# 포트폴리오 빌드 오케스트레이터

**실행 모드: 하이브리드**
- Phase 2 (셋업): 서브 에이전트 (project-architect)
- Phase 3 (디자인 + 컴포넌트): 에이전트 팀 (design-researcher + ui-builder)
- Phase 4 (섹션 개발): 서브 에이전트 (section-developer)
- Phase 5 (QA): 서브 에이전트 (qa-reviewer)

## Phase 0: 컨텍스트 확인

워크플로우 시작 전 기존 상태를 확인하여 실행 모드를 결정한다.

1. `_workspace/` 디렉토리 존재 여부 확인
2. `apps/web/` 존재 여부 확인
3. 사용자 요청의 범위 파악 (전체 빌드 / 특정 Phase 재실행 / 부분 수정)

**실행 모드 결정:**
- `apps/web/` 없음 → **초기 빌드**: Phase 1부터 전체 실행
- `apps/web/` 있고 특정 수정 요청 → **부분 재실행**: 해당 Phase 에이전트만 호출
- `apps/web/` 있고 "다시 빌드" 요청 → **새 실행**: `_workspace/`를 `_workspace_prev/`로 이동 후 전체 실행

## Phase 1: 콘텐츠 수집

**초기 빌드 시에만 실행.** 사용자에게 포트폴리오 콘텐츠를 확인한다.

포트폴리오에 넣을 정보를 수집한다. 제공된 정보가 있으면 그대로 활용하고, 없는 항목만 질문한다.

### 필수 수집 항목
- **이름** (한국어/영어)
- **직함/포지션** (예: Frontend Developer, Full-Stack Engineer)
- **한 줄 자기소개** (Hero 섹션용)
- **이메일**
- **GitHub URL**
- **LinkedIn URL** (선택)

### 경력 정보 (experience)
각 경력별:
- 회사명, 직책, 재직 기간 (YYYY.MM ~ YYYY.MM 또는 현재)
- 주요 업무/성과 (불릿 2~4개)

### 프로젝트 정보 (projects)
각 프로젝트별:
- 프로젝트명, 설명 (1~2줄)
- 사용 기술 스택 (태그 목록)
- GitHub URL 또는 라이브 링크 (선택)
- 대표 이미지 경로 (선택)

### 기술 스택 (skills)
카테고리별:
- Frontend: React, Next.js, TypeScript, Tailwind CSS 등
- Backend: Node.js, Python 등 (있다면)
- Infra/DevOps: Vercel, Docker 등 (있다면)
- Tools: Git, Figma 등

수집된 정보를 `_workspace/01_content.md`에 구조화하여 저장한다.

## Phase 2: 프로젝트 셋업

**실행 모드: 서브 에이전트**

project-architect 에이전트를 호출하여 모노레포 프로젝트 구조를 설정한다.

```
Agent(
  agent: "project-architect",
  prompt: "포트폴리오 모노레포 프로젝트를 설정해줘. 
           위치: /Users/jinwon/jinwon-portfolio
           구조: apps/web(Next.js 15 App Router), packages/ui(tsup)
           스택: Next.js 15, Tailwind CSS 4, TypeScript, tsup, Yarn Berry 4
           완료 후 _workspace/01_setup_complete.md에 결과 기록",
  model: "opus"
)
```

project-architect로부터 완료 보고 수신 후 Phase 3으로 진행.

## Phase 3: 디자인 시스템 + 컴포넌트

**실행 모드: 에이전트 팀**

design-researcher와 ui-builder를 팀으로 구성한다. design-researcher가 디자인 시스템을 완성하면 ui-builder가 컴포넌트를 구현한다.

```
TeamCreate("design-team", ["design-researcher", "ui-builder"])

TaskCreate([
  {
    id: "design",
    assignee: "design-researcher",
    title: "awwwards 벤치마킹 후 Tailwind 디자인 시스템 구축",
    details: "awwwards 수상 개발자 포트폴리오 5개 분석 →
              디자인 토큰 정의 → tailwind.config.ts 작성 →
              _workspace/02_design_system.md 저장 →
              ui-builder에게 완료 메시지 전달"
  },
  {
    id: "components",
    assignee: "ui-builder",
    title: "packages/ui 컴포넌트 라이브러리 구현",
    dependencies: ["design"],
    details: "design-researcher로부터 디자인 시스템 수신 →
              Button, Section, Card, Badge, AnimatedText, Navigation, Tag 구현 →
              tsup build 성공 확인 →
              _workspace/03_components_list.md 저장"
  }
])
```

ui-builder로부터 컴포넌트 완료 보고 수신 후 팀 해체, Phase 4 진행.

## Phase 4: 섹션 개발

**실행 모드: 서브 에이전트**

section-developer 에이전트를 호출하여 포트폴리오 전체 섹션을 구현한다.

```
Agent(
  agent: "section-developer",
  prompt: "포트폴리오 6개 섹션을 구현해줘.
           콘텐츠 데이터: _workspace/01_content.md 참조
           컴포넌트: @portfolio/ui 사용 (목록: _workspace/03_components_list.md)
           프로필 사진: /Users/jinwon/jinwon-portfolio/apps/web/public/profile.jpg에 복사 필요
           섹션: Hero, About, Experience, Projects, Skills, Contact
           완료 후 _workspace/04_sections_complete.md에 기록",
  model: "opus"
)
```

section-developer로부터 완료 보고 수신 후 Phase 5 진행.

## Phase 5: QA 검증

**실행 모드: 서브 에이전트**

qa-reviewer 에이전트를 호출하여 전체 품질을 검증한다.

```
Agent(
  agent: "qa-reviewer",
  prompt: "포트폴리오 사이트 QA를 수행해줘.
           체크리스트: 빌드 성공, TypeScript 에러, 반응형, 접근성, 성능
           Critical 이슈는 직접 수정, Major/Minor는 보고서 기록
           완료 후 _workspace/05_qa_report.md에 결과 저장",
  model: "opus"
)
```

## Phase 6: 완료 보고

사용자에게 최종 결과를 보고한다:

```
## 포트폴리오 빌드 완료 ✓

**빌드 결과:**
- 셋업: apps/web + packages/ui 구조 완성
- 디자인: [테마/컬러 요약]
- 컴포넌트: [구현된 컴포넌트 목록]
- 섹션: Hero, About, Experience, Projects, Skills, Contact
- QA: Critical [N]건 수정, [N]건 잔여 이슈

**다음 단계:**
- cd apps/web && yarn dev → 로컬 개발 서버 확인
- _workspace/01_content.md의 TODO 항목 콘텐츠 입력
- _workspace/05_qa_report.md의 Major 이슈 검토

**배포:** Vercel 연동 후 `vercel --prod`
```

## 에러 핸들링

- 에이전트 실패 시 1회 재시도, 재실패 시 해당 단계 결과 없이 계속 진행 후 보고서에 명시
- 콘텐츠 정보 부족 시 placeholder 사용하고 TODO로 마킹

## 데이터 전달

| 데이터 | 생성자 | 소비자 | 경로 |
|-------|-------|-------|------|
| 포트폴리오 콘텐츠 | 오케스트레이터 | section-developer | `_workspace/01_content.md` |
| 셋업 결과 | project-architect | 오케스트레이터 | `_workspace/01_setup_complete.md` |
| 디자인 시스템 | design-researcher | ui-builder | `_workspace/02_design_system.md` + SendMessage |
| 컴포넌트 목록 | ui-builder | section-developer | `_workspace/03_components_list.md` |
| 섹션 완료 | section-developer | qa-reviewer | `_workspace/04_sections_complete.md` |
| QA 보고서 | qa-reviewer | 오케스트레이터 | `_workspace/05_qa_report.md` |

## 테스트 시나리오

**정상 흐름:** "포트폴리오 만들어줘" → Phase 0에서 초기 빌드 감지 → Phase 1 콘텐츠 수집 → Phase 2~5 순차 실행 → Phase 6 완료 보고

**에러 흐름:** Phase 3에서 tsup 빌드 실패 → ui-builder가 설정 재점검 후 재시도 → 재실패 시 "컴포넌트 빌드 실패" 기록 후 Phase 4에서 직접 import로 대체
