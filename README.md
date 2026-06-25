# 김진원 포트폴리오

**Frontend Developer** · React / Next.js / React Native · 5년차

사용자 경험 개선과 유지보수성을 고민하는 개발자 김진원의 포트폴리오 사이트 및 발표자료입니다.

---

## 프로젝트 구조

```
jinwon-portfolio/
├── apps/web/                  # Next.js 15 메인 앱
│   ├── src/
│   │   ├── app/               # App Router
│   │   ├── components/        # 섹션 컴포넌트
│   │   └── data/              # 포트폴리오 데이터 (profile, projects, experience, skills)
│   └── public/
│       ├── portfolio.pptx     # AI로 자동 생성된 발표자료
│       └── portfolio.pdf      # AI로 자동 생성된 PDF
├── packages/ui/               # 공용 컴포넌트 라이브러리 (tsup 번들링)
└── CLAUDE.md                  # AI 에이전트 작업 지시서
```

**기술 스택:** Next.js 15 (App Router) · Tailwind CSS 4 · TypeScript · Framer Motion · Yarn Berry 4

---

## AI 활용 방식

이 포트폴리오는 사이트 개발부터 발표자료 생성까지 전 과정에서 AI(Claude Code)를 적극 활용했습니다.

### 1. 사이트 개발

**코드 생성 및 리팩토링**
- Hero 섹션 타이핑 애니메이션, 마우스 트래킹 배경 블롭, 다운로드 드롭다운 컴포넌트 등 UI 로직 전반을 Claude Code와 협업하여 구현
- TypeScript 타입 추론, Framer Motion 애니메이션 설정, Tailwind CSS 스타일링 작업 가속화

**구조 설계**
- `apps/web/src/data/` 하위 데이터 레이어 분리 구조 제안 — 포트폴리오 내용 변경 시 데이터 파일만 수정하면 전체 사이트에 반영되는 구조

### 2. 발표자료 자동 생성 (핵심 활용)

발표자료(PPTX/PDF)는 **포트폴리오 데이터를 읽어 코드로 생성**하는 방식을 채택했습니다.

```
apps/web/src/data/*.ts  →  generate-ppt.mjs  →  portfolio.pptx
                        └→  generate-pdf.mjs  →  portfolio.pdf
```

**생성 도구:**
- `pptxgenjs` — Node.js에서 PPTX 파일을 프로그래매틱하게 생성
- `playwright` (chromium) — HTML 슬라이드를 PDF로 변환

**슬라이드 구성 (12장):**

| 슬라이드 | 내용 |
|---------|------|
| 1. 커버 | 이름, 직함, 연락처 |
| 2. 경력 타임라인 | 글로비코리아 → 에스엔소프트 → 스탠다드네트웍스 |
| 3. 핵심 성과 | 주요 수치 4개 (FE 2인 주도, Knip 정적 분석 등) |
| 4. 기술 스택 | 카테고리별 기술 시각화 |
| 5–10. 프로젝트 (6개) | 015삐삐앱, 015웹, 차세대커스터머, 차세대인트라넷, 통합관리자, 스마트오더 |
| 11. 개발 철학 | 사용자 경험 · 유지보수성 · 협업 · 문제 해결 |
| 12. 클로징 | 연락처 및 GitHub |

**기술 선정 사례 (015 삐삐 앱 슬라이드):**

PPT에는 단순 기술 나열이 아닌 **의사결정 과정**이 담겨 있습니다. 예를 들어 React Native 선택 배경:

> Flutter · Expo · 순수 RN 세 가지를 검토.
> Expo는 FCM·인앱결제에서 ejection이 불가피했고, Flutter는 Dart 언어 학습 비용.
> 기존 React 경험을 살리면서 Native 완전 제어권을 확보할 수 있는 순수 RN 선택.

이런 서술은 AI와의 대화를 통해 실제 경험을 구조화한 결과입니다.

### 3. 콘텐츠 품질 관리

AI가 생성한 내용 중 **사실과 다른 부분을 직접 검토하고 수정**하는 과정을 거쳤습니다.

- `"PG 연동 표준화"`, `"결제 승인/취소 예외처리 강화"` → 직접 수행하지 않은 업무로 삭제
- `"공수 40% 절감"` → 측정 근거 없는 수치로 삭제, 실제 데이터(Knip exports 182→0)로 대체

AI는 초안을 빠르게 작성하지만, 사실 검증과 최종 판단은 사람이 합니다.

---

## 로컬 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn workspace @portfolio/web dev
```

---

## 발표자료 재생성

포트폴리오 데이터(`apps/web/src/data/*.ts`)를 수정한 후 발표자료를 재생성하려면 Claude Code에서:

```
pptx 재생성해줘
```

라고 입력하면 `ppt-creator` 스킬이 자동으로 데이터를 읽어 새 파일을 생성합니다.

---

## 연락처

- **Email:** jinwon9514@gmail.com
- **GitHub:** [github.com/jinwonnnnnnn](https://github.com/jinwonnnnnnn)
