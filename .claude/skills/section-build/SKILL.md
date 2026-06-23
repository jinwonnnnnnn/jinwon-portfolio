---
name: section-build
description: "포트폴리오 섹션 구현 스킬. 'Hero 섹션 만들어', 'About 섹션', '경력 타임라인', '프로젝트 갤러리', '기술스택 섹션', 'Contact 섹션', '섹션 레이아웃 구현' 요청 시 section-developer 에이전트가 사용한다."
---

# 포트폴리오 섹션 구현

## 전제 조건

- `_workspace/01_content.md`: 포트폴리오 콘텐츠 데이터
- `_workspace/03_components_list.md`: 사용 가능한 컴포넌트 목록
- `@portfolio/ui` 빌드 완료 (`packages/ui/dist/` 존재)

## 파일 구조

```
apps/web/
├── app/
│   ├── layout.tsx          # 글로벌 레이아웃, Navigation 포함
│   ├── page.tsx            # 섹션 조합 메인 페이지
│   └── globals.css         # Tailwind directives + 글로벌 스타일
└── src/
    ├── components/
    │   └── sections/
    │       ├── HeroSection.tsx
    │       ├── AboutSection.tsx
    │       ├── ExperienceSection.tsx
    │       ├── ProjectsSection.tsx
    │       ├── SkillsSection.tsx
    │       └── ContactSection.tsx
    └── data/
        ├── profile.ts
        ├── experience.ts
        ├── projects.ts
        └── skills.ts
```

## 콘텐츠 데이터 타입

```typescript
// src/data/profile.ts
export interface Profile {
  name: { ko: string; en: string }
  title: string
  bio: string
  email: string
  github: string
  linkedin?: string
}

// src/data/experience.ts
export interface Experience {
  company: string
  role: string
  period: { start: string; end: string | 'present' }
  description: string[]  // 주요 업무/성과 불릿
  tech?: string[]
}

// src/data/projects.ts
export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  imageUrl?: string
  featured?: boolean
}

// src/data/skills.ts
export interface SkillCategory {
  category: string
  items: { name: string; level?: 'expert' | 'proficient' | 'familiar' }[]
}
```

## 섹션별 구현 가이드

### HeroSection

목표: 강렬한 첫인상, 이름과 직함이 명확히 전달

```tsx
// 구조
<Section id="hero" className="min-h-screen flex items-center">
  <AnimatedText text={profile.title} variant="typing" />  // 직함 타이핑 효과
  <h1>{profile.name.en}</h1>
  <p>{profile.bio}</p>
  <Button href="#projects">프로젝트 보기</Button>
  <Button href="#contact" variant="ghost">연락하기</Button>
  {/* 스크롤 유도 아이콘 */}
</Section>
```

### AboutSection

목표: 프로필 사진 + 자기소개의 인간적 연결

```tsx
// 2열 레이아웃: 텍스트(좌) + 사진(우) 또는 역순
<Section id="about">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div>{/* 소개 텍스트 */}</div>
    <div>
      <Image src="/profile.jpg" alt={profile.name.ko} ... />
    </div>
  </div>
</Section>
```

프로필 사진: `apps/web/public/profile.jpg` 경로 사용

### ExperienceSection

목표: 경력의 흐름을 타임라인으로 시각화

```tsx
// 세로 타임라인
<Section id="experience">
  {experience.map((exp, i) => (
    <motion.div key={i} variants={fadeInUp} custom={i}>
      <div className="timeline-dot" />
      <div className="timeline-content">
        <h3>{exp.role}</h3>
        <p>{exp.company} · {exp.period.start} ~ {exp.period.end}</p>
        <ul>{exp.description.map(d => <li>{d}</li>)}</ul>
      </div>
    </motion.div>
  ))}
</Section>
```

### ProjectsSection

목표: 프로젝트를 임팩트 있게 쇼케이스

```tsx
// 필터 + 그리드
<Section id="projects">
  <div className="filter-tags">{/* 기술스택 필터 */}</div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredProjects.map(project => (
      <Card key={project.title} {...project} />
    ))}
  </div>
</Section>
```

### SkillsSection

목표: 기술 역량을 한눈에 파악 가능하게

```tsx
// 카테고리별 그룹
<Section id="skills">
  {skills.map(category => (
    <div key={category.category}>
      <h3>{category.category}</h3>
      <div className="flex flex-wrap gap-3">
        {category.items.map(skill => (
          <Badge key={skill.name} label={skill.name} />
        ))}
      </div>
    </div>
  ))}
</Section>
```

### ContactSection

목표: 연락을 쉽게, CTA 명확히

```tsx
<Section id="contact">
  <h2>함께 일하고 싶으신가요?</h2>
  <a href={`mailto:${profile.email}`}>{profile.email}</a>
  <div className="social-links">
    <a href={profile.github}>GitHub</a>
    {profile.linkedin && <a href={profile.linkedin}>LinkedIn</a>}
  </div>
</Section>
```

### app/page.tsx 조합

```tsx
import { Navigation } from '@portfolio/ui'
import HeroSection from '@/components/sections/HeroSection'
// ... 나머지 섹션들

export default function Home() {
  return (
    <main>
      <Navigation items={navItems} />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  )
}
```

## 주의사항

- 콘텐츠 미확정 항목은 `// TODO: [항목명]` 주석 후 placeholder 텍스트 사용
- `next/image`로 모든 이미지 최적화 적용 (width, height 또는 fill 속성)
- 섹션 id는 Navigation의 href와 일치해야 스크롤 이동이 동작함
- 모든 외부 링크는 `target="_blank" rel="noopener noreferrer"` 적용

## 산출물

1. `apps/web/src/components/sections/` — 6개 섹션 컴포넌트
2. `apps/web/src/data/` — 콘텐츠 데이터 파일 4개
3. `apps/web/app/page.tsx` — 조합 완료된 메인 페이지
4. `apps/web/app/layout.tsx` — 글로벌 레이아웃
5. `_workspace/04_sections_complete.md` — 구현 목록, TODO 항목 목록
