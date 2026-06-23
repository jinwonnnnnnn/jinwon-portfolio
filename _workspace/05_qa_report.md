# QA 보고서 — 진원 포트폴리오

**검증일:** 2026-06-24
**대상:** `/Users/jinwon/Desktop/jinwon-portfolio`
**검증자:** qa-reviewer

---

## 요약

| 항목 | 결과 |
|------|------|
| TypeScript 타입 체크 (`@portfolio/web`) | ✅ 통과 (에러 0) |
| UI 패키지 빌드 (`@portfolio/ui` tsup) | ✅ 통과 (경고 1) |
| Next.js 빌드 (`@portfolio/web`) | ✅ 통과 (4/4 페이지 정적 생성) |
| 섹션 id 속성 | ✅ 6/6 모두 존재 |
| 반응형 클래스 | ✅ 적용됨 |
| 접근성 | ⚠️ 일부 개선 권장 |
| 스크롤 수정 | ✅ 올바르게 적용됨 |

**Critical 0건 · Major 2건 · Minor 4건**
Critical 이슈 없음 → 직접 수정 항목 없음.

---

## 1. 빌드 검증 (Critical 체크) — 전부 통과

### TypeScript
```
yarn workspace @portfolio/web tsc --noEmit → 에러 없음
```

### UI 패키지 (tsup)
```
CJS dist/index.js     13.69 KB  ✅
ESM dist/index.mjs    10.95 KB  ✅
DTS dist/index.d.ts    1.74 KB  ✅ Build success
```
경고 1건(아래 Minor-1) 외 빌드 성공.

### Next.js
```
▲ Next.js 16.2.9 (Turbopack)
✓ Compiled successfully in 1240ms
✓ Generating static pages (4/4)
Route (app):  ○ /   ○ /_not-found  (모두 Static prerendered)
```

> 참고: `CLAUDE.md`에는 "Next.js 15"로 명시되어 있으나 실제 설치 버전은 **16.2.9**. 빌드에는 문제 없으나 문서와 버전 불일치 — 하네스 문서 갱신 검토 권장(Minor).

---

## 2. 스크롤 수정 확인 — ✅ 통과

`apps/web/src/app/globals.css`:
```css
html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}
body {
  background-color: #0a0a0a;
  ...
}
```
`overflow-x: hidden`이 `body`에서 `html`로 정확히 이동되었고 `scroll-behavior: smooth`도 `html`에 함께 적용됨. 요청한 수정 사항이 올바르게 반영됨.

---

## 3. 코드 품질 — 섹션 id 검증 — ✅ 통과

| 섹션 | 파일 | id |
|------|------|----|
| Hero | HeroSection.tsx | `id="hero"` ✅ |
| About | AboutSection.tsx | `id="about"` ✅ |
| Experience | ExperienceSection.tsx | `id="experience"` ✅ |
| Projects | ProjectsSection.tsx | `id="projects"` ✅ |
| Skills | SkillsSection.tsx | `id="skills"` ✅ |
| Contact | ContactSection.tsx | `id="contact"` ✅ |

네비게이션 항목(`page.tsx`의 `#about`/`#experience`/`#projects`/`#skills`/`#contact`)과 모든 섹션 id가 정확히 매칭됨. 앵커 스크롤 정상 작동.

기타 코드 품질 스캔 결과 (모두 clean):
- `console.log/warn/error`: 0건
- `any` 타입(`: any`, `as any`, `<any>`): 0건
- `TODO`/`FIXME`: 0건
- 원시 `<img>` 태그(next/image 미사용): 0건 — About 섹션 프로필 사진은 `next/image`(`fill` + `sizes` + `priority`) 사용 ✅

---

## 4. 반응형 검증 — ✅ 통과 (Minor 개선 여지)

- **모바일 메뉴**: `Navigation.tsx`에 햄버거 버튼(`md:hidden`) + `AnimatePresence` 풀스크린 오버레이 메뉴 구현됨. 데스크탑 nav는 `hidden md:flex`로 전환. ✅
- **그리드 레이아웃**:
  - About: `grid-cols-1 lg:grid-cols-2`
  - Projects: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - Skills: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
  - Experience 타임라인: `md:pl-12` + 수직선 `hidden md:block` (모바일에서 라인 숨김 처리)
- **타이포 스케일**: Hero h1 `text-6xl sm:text-7xl md:text-8xl lg:text-[96px]` 등 브레이크포인트별 단계적 축소 적용. ✅
- **최대 너비/여백**: 콘텐츠 `max-w-6xl mx-auto px-6` 일관 적용. ✅

---

## 5. 접근성 검증 — ⚠️ 일부 개선 권장

양호 항목:
- 프로필 이미지 `alt="김진원 프로필 사진"` 존재 ✅
- 모달 닫기 버튼 `aria-label="닫기"` ✅
- `<html lang="ko">` 설정 ✅
- 외부 링크 `target="_blank"` + `rel="noopener noreferrer"` ✅
- 인터랙티브 요소가 실제 `<button>`/`<a>`로 구현되어 키보드 포커스 가능 ✅

개선 필요 항목은 아래 이슈 목록 참고.

---

## 이슈 목록

### 🔴 Critical — 0건
없음. (직접 수정 항목 없음)

---

### 🟠 Major — 2건

#### MAJOR-1. 모바일 햄버거 버튼 aria 상태 미반영
**파일:** `packages/ui/src/components/Navigation.tsx:109-113`
**문제:** 메뉴 토글 버튼의 `aria-label="메뉴 열기"`가 열림/닫힘 상태와 무관하게 고정이며 `aria-expanded`가 없음. 스크린리더 사용자가 메뉴 펼침 상태를 인지할 수 없음.
**수정 방법:**
```tsx
<button
  className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
  aria-expanded={menuOpen}
  aria-controls="mobile-menu"
>
```
모바일 메뉴 오버레이에 `id="mobile-menu"` 부여 권장.

#### MAJOR-2. 키보드 포커스 표시(focus-visible) 스타일 부재
**파일:** `apps/web/src/app/globals.css`, 각 인터랙티브 컴포넌트
**문제:** Tab 키 내비게이션 시 포커스 링이 정의되어 있지 않음(브라우저 기본 outline에 의존). 다크 배경(#0a0a0a)에서 기본 outline 가시성이 낮아 키보드 사용자가 현재 위치를 파악하기 어려움. WCAG 2.4.7(Focus Visible) 관련.
**수정 방법:** `globals.css`에 전역 포커스 스타일 추가:
```css
:focus-visible {
  outline: 2px solid #818cf8;
  outline-offset: 2px;
  border-radius: 4px;
}
```
또는 Button/Navigation의 인터랙티브 요소에 `focus-visible:ring-2 focus-visible:ring-[#818cf8]` 추가.

---

### 🟡 Minor — 4건

#### MINOR-1. profile.jpg 원본 용량 과다 (5.7MB)
**파일:** `apps/web/public/profile.jpg` (5,723,841 bytes)
**문제:** `next/image`가 런타임 최적화는 하지만 원본 소스가 5.7MB로 매우 큼. 빌드/배포 산출물 비대 및 초기 최적화 비용 증가.
**권장:** 원본을 사전 압축(권장 ~200-400KB, 적정 해상도 ~800px 폭) 후 교체. 표시 영역이 최대 320px 폭이므로 고해상도 불필요.

#### MINOR-2. UI 패키지 `package.json` exports 조건 순서 경고
**파일:** `packages/ui/package.json:9-11`
**문제:** tsup 빌드 시 경고 —
```
The condition "types" here will never be used as it comes after both "import" and "require"
```
`exports` 맵에서 `"types"`가 `"import"`/`"require"` 뒤에 위치. 동작에는 영향 없으나 일부 번들러/TS 해석기에서 타입 해석 누락 가능.
**수정 방법:** `exports` 내에서 `"types"`를 가장 먼저 선언:
```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.mjs",
    "require": "./dist/index.js"
  }
}
```

#### MINOR-3. 장식용 SVG 아이콘에 `aria-hidden` 미지정
**파일:** HeroSection.tsx, ContactSection.tsx, Card.tsx, ProjectsSection.tsx의 인라인 `<svg>`
**문제:** GitHub/메일 아이콘 등 순수 장식 SVG에 `aria-hidden="true"`가 없어 일부 스크린리더가 불필요하게 읽을 수 있음(인접 텍스트로 의미는 전달되므로 영향 경미).
**권장:** 텍스트 레이블과 함께 쓰이는 장식 SVG에 `aria-hidden="true"` 추가.

#### MINOR-4. 문서-구현 버전 불일치 (Next.js 15 vs 16.2.9)
**파일:** `CLAUDE.md` (기술 스택 섹션)
**문제:** 하네스 문서는 Next.js 15 명시, 실제 설치는 16.2.9(Turbopack). 빌드 정상이나 문서 정합성 저하.
**참고:** `apps/web/AGENTS.md`에 "이 Next.js는 breaking change가 있으니 코드 작성 전 `node_modules/next/dist/docs/` 확인" 지침 존재. 향후 섹션/컴포넌트 수정 시 해당 문서 선행 확인 필요.
**권장:** `CLAUDE.md` 기술 스택을 실제 버전으로 갱신.

---

## 결론

빌드 파이프라인(TypeScript / tsup / Next.js)은 **전부 정상 통과**하며, 요청된 스크롤 수정(`overflow-x: hidden` html 이동)도 올바르게 반영되었다. 모든 섹션 id와 네비게이션 앵커가 일치하고, `console.log`/`any`/`TODO`/원시 `<img>` 등 코드 품질 결함이 없다.

**Critical(빌드 실패/동작 불가) 이슈는 없으므로 직접 수정 항목 없음.** 접근성(키보드 포커스 표시, 모바일 메뉴 aria 상태) 관련 Major 2건과 성능/문서 정합성 관련 Minor 4건을 후속 개선 권장한다.
