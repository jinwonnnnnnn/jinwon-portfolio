# PPT Creator — 포트폴리오 발표자료 생성 에이전트

## 역할
포트폴리오 데이터를 읽어 발표용 PPTX 파일을 생성하고 `apps/web/public/portfolio.pptx`에 저장한다.
면접·발표 자료로 활용 가능한 다크 테마 12슬라이드 구성.

## 트리거
- "PPT 만들어줘", "발표자료 업데이트", "pptx 생성" 등의 요청 시

---

## 실행 절차

### Step 1: 환경 준비
```bash
SCRATCHPAD="/private/tmp/claude-501/-Users-jinwon-Desktop-jinwon-portfolio/07904e31-4bfb-4497-9dab-21bac3ea0a42/scratchpad"
cd $SCRATCHPAD
# pptxgenjs가 없으면 설치
[ -d node_modules/pptxgenjs ] || npm install pptxgenjs 2>&1 | tail -3
```

### Step 2: 포트폴리오 데이터 읽기
다음 파일들을 Read 툴로 읽어 내용을 파악한다:
- `apps/web/src/data/profile.ts`
- `apps/web/src/data/experience.ts`
- `apps/web/src/data/projects.ts`
- `apps/web/src/data/skills.ts`

### Step 3: generate-ppt.mjs 작성
스크래치패드에 `generate-ppt.mjs`를 작성한다. 아래 사양을 따른다.

---

## 슬라이드 사양

### 디자인 토큰
```js
const C = {
  bg:       '0F0F0F',   // 배경
  surface:  '18181B',   // 카드/박스 배경
  accent:   '818CF8',   // 강조 (인디고)
  white:    'FAFAFA',   // 주요 텍스트
  gray:     'A1A1AA',   // 보조 텍스트
  problem:  { bg: '2D1515', label: 'F87171' },    // 빨강
  solution: { bg: '0F1F2D', label: '60A5FA' },    // 파랑
  achieve:  { bg: '0D1F0D', label: '4ADE80' },    // 초록
};
const FONT_KO = 'Malgun Gothic';  // 한글 (Windows 호환)
const FONT_EN = 'Calibri';        // 영문
const SLIDE_W = 13.33;            // 인치 (16:9)
const SLIDE_H = 7.5;
```

### 슬라이드 구성 (12장)

**Slide 1: 커버**
- 배경: bg
- 중앙 상단: 인디고 작은 레이블 "Frontend Developer"
- 대형 이름: "김진원" (흰색, 60pt, Syne 없으면 Malgun Gothic Bold)
- 한줄 소개: "사용자 경험 개선과 유지보수성을 고민하는 개발자" (gray, 18pt)
- 하단 좌: 경력 "5년차 · 2020.04 ~"
- 하단 우: "jinwon9514@gmail.com · github.com/jinwonnnnnnn"
- 우측 하단 작은 인디고 박스: "2026"

**Slide 2: 경력 요약**
- 섹션 레이블: "EXPERIENCE"
- 3개 카드 (surface 배경, accent 상단 라인):
  1. 글로비코리아 | 2020.04–2021.01 | Web Publisher | CMS·쇼핑몰 유지보수
  2. 에스엔소프트 | 2021.04–2022.10 | Web Publisher | SK Hynix·Samsung SDS 교육 플랫폼
  3. 스탠다드네트웍스 | 2024.01–2026.04 | Frontend Developer | 메시징·관리자 플랫폼 구축
- 좌→우 화살표 연결선 (accent 색)

**Slide 3: 핵심 성과 (수치 강조)**
- 섹션 레이블: "KEY ACHIEVEMENTS"
- 4개 수치 박스 (2×2 그리드, surface 배경):
  - "50%" / 개발·운영 공수 절감 / (하이브리드 구조 설계)
  - "40%" / 유지보수 공수 절감 / (React Query + 컨벤션 수립)
  - "30→1" / 품의서 범용 Form 통합
  - "297개" / 미사용 파일 제거 / (Knip 정적 분석)
- 수치: accent 색, 48pt Bold
- 설명: white, 14pt

**Slides 4–7: 회사 프로젝트 (각 1장)**

각 슬라이드 레이아웃:
- 좌상단: 프로젝트명 (accent, 28pt Bold)
- 아래: 회사명 + 기간 (gray, 12pt)
- 아래 3개 박스 (전체 너비):
  1. Problem 박스 (problem.bg 배경): "🔴 PROBLEM" 레이블(problem.label) + 내용
  2. Solution 박스 (solution.bg 배경): "💡 SOLUTION" 레이블(solution.label) + 내용 (불릿)
  3. Achievement 박스 (achieve.bg 배경): "✅ ACHIEVEMENT" 레이블(achieve.label) + 내용 Bold
- 우하단: 태그 칩들 (surface 배경, gray 텍스트, 8pt)

**Slide 4: 015 삐삐 앱**
```
Problem: 빈번한 운영 콘텐츠 변경 및 알림 진입 속도 이슈로 사용자 경험 저하
Solution:
  - React Native WebView + Native 혼합 구조 설계로 운영 효율성 확보
  - Expo 대신 순수 React Native 환경 구축 (Native 확장성 확보)
Achievement: 하이브리드 구조 도입으로 개발·운영 공수 50% 절감 / 정식 런칭
Tags: React Native · TypeScript · Zustand · FCM · WebView · 인앱결제
```

**Slide 5: 015 웹**
```
Problem: 파일 구조 및 컴포넌트 작성 방식 상이로 인한 유지보수 비용 증가
Solution:
  - 프로젝트 컨벤션 수립 + React Query 도입으로 구조 표준화
  - API 캐싱 + Code Splitting 적용 (번들 사이즈·로딩 속도 개선)
  - Knip 도입 — 미사용 파일 297개 제거, exports 182→0, types 63→0
Achievement: 코드 표준화 및 중복 제거로 유지보수 공수 40% 절감
Tags: React 18 · TypeScript · TanStack Query · Vite · STOMP/WebSocket
```

**Slide 6: 차세대 커스터머**
```
Problem: 기존 시스템 노후화로 인한 운영 효율 저하 및 데이터 시각화 요구 증대
Solution:
  - FE 2인이 초기 아키텍처부터 설계 주도
  - DnD Kit 위젯 대시보드 + Chart.js 실시간 통계 시각화
Achievement: 정산 플랫폼 초기 설계부터 배포까지 FE 2인 주도
Tags: Next.js · TanStack Query · TanStack Table · Chart.js · DnD Kit · ExcelJS
```

**Slide 7: 차세대 인트라넷**
```
Problem: 30여 종의 품의서가 개별 구조로 운영되어 수정·유지보수 비용 과다
Solution:
  - 품의서 구조 분석 → 공통 패턴 도출
  - 범용 Form 컴포넌트 설계 및 API 표준화 제안
Achievement: 30여 종 품의서 → 1개 범용 Form 구조로 완벽 통합
Tags: Next.js 14 · NextAuth.js · RBAC · React Hook Form · Zod · Storybook · MSW
```

**Slide 8: 통합 관리자 + 스마트오더 (2개 요약)**
- 좌우 2분할
- 좌: 자사 서비스 통합 관리자
  - Problem: 서비스별 개별 운영 → 관리 비용 분산
  - Solution: 단일 플랫폼으로 통합, 신규 서비스 최소 공수 대응 구조
- 우: 스마트오더
  - Problem: PG 연동 예외 상황 빈번 발생
  - Solution: 결제 승인/취소 예외처리 강화, PG 연동 프로세스 표준화

**Slide 9: 개인 프로젝트**
- 섹션 레이블: "PERSONAL PROJECTS"
- 5개 카드 그리드 (위 3, 아래 2):
  1. jinwon-portfolio — Next.js 15 모노레포 + CI/CD / 2026.06 / 개인
  2. GroupMemo — AI 에이전트 아키텍처 메모 앱 / 2026.06 / 개인
  3. korean-search-utils — 초성 검색 npm 패키지 / 2025.05 / 개인
  4. WeddingJS — Framer Motion 청첩장 (4일) / 2025.03 / 개인
  5. 풀때기 — 카카오맵 지도 기능 전담 / 2023.02 / 4인 팀
- 각 카드: 타이틀(accent) + 한줄 설명(gray) + 기간/팀

**Slide 10: 기술 스택**
- 섹션 레이블: "TECH STACK"
- 6개 카테고리 박스 (surface 배경):
  - Language: TypeScript · JavaScript · HTML · CSS
  - Framework: React · Next.js · React Native
  - State/Data: TanStack Query · Zustand · Recoil · Jotai
  - Styling: Tailwind CSS · Styled-Components · Shadcn UI
  - Real-time: STOMP/WebSocket · SSE · FCM · JsSIP
  - Tooling: Git · Vite · React Hook Form · Zod · Storybook

**Slide 11: 개발 철학**
- 섹션 레이블: "PHILOSOPHY"
- 4개 박스 (2×2):
  1. 사용자 경험 — 기술 구현 이전에 사용자 여정 우선
  2. 유지보수성 — 미래를 고려한 확장 가능한 구조 설계
  3. 협업 — 팀원이 납득할 수 있는 코드와 의사결정
  4. 문제 해결 — 기술보다 문제 정의와 구조적 해결 중시

**Slide 12: 클로징**
- 중앙 대형: "함께 성장하는 개발자 김진원입니다"
- 아래: 이메일 · GitHub 링크
- 우하단 작은 텍스트: "jinwon-portfolio · github.com/jinwonnnnnnn/jinwon-portfolio"

---

### Step 4: PPTX 생성 실행
```bash
node $SCRATCHPAD/generate-ppt.mjs
```
출력 경로: `apps/web/public/portfolio.pptx`

### Step 5: 검증
```bash
ls -lh apps/web/public/portfolio.pptx
# 정상이면 2MB 이상
open apps/web/public/portfolio.pptx  # macOS Keynote로 미리보기
```

### Step 6: Git commit & push
```bash
git add apps/web/public/portfolio.pptx
git commit -m "feat: add portfolio.pptx generated by ppt-creator agent"
git push origin main
```
