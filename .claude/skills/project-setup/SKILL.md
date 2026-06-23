---
name: project-setup
description: "Next.js 15 + Tailwind CSS 4 + tsup + Yarn Berry 4 모노레포 초기 설정 스킬. 'Yarn Berry 설정', '프로젝트 초기화', '모노레포 구성', '패키지 설정', 'tsup 설정', '빌드 환경 구성' 등 프로젝트 초기 셋업 요청 시 project-architect 에이전트가 사용한다."
---

# Next.js 모노레포 프로젝트 셋업

## 실행 순서

### 1. 루트 초기화

```bash
# 루트 package.json 생성
{
  "name": "jinwon-portfolio",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "packageManager": "yarn@4.x.x"
}

# Yarn Berry 4 활성화
yarn set version berry
```

### 2. .yarnrc.yml 설정

```yaml
nodeLinker: node-modules
yarnPath: .yarn/releases/yarn-4.x.x.cjs
```

`nodeLinker: node-modules`를 사용하는 이유: Next.js의 일부 패키지가 PnP에서 호환성 이슈가 있기 때문.

### 3. TypeScript 공통 설정

```json
// tsconfig.base.json (루트)
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "jsx": "preserve"
  }
}
```

### 4. packages/ui 설정

```json
// packages/ui/package.json
{
  "name": "@portfolio/ui",
  "version": "0.0.1",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "framer-motion": ">=11"
  },
  "devDependencies": {
    "tsup": "^8.x.x",
    "typescript": "^5.x.x",
    "@types/react": "^18.x.x"
  }
}
```

```typescript
// packages/ui/tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'next', 'framer-motion'],
  sourcemap: true,
})
```

### 5. apps/web (Next.js 15) 설정

```bash
cd apps/web
# Next.js App Router 초기화
```

```json
// apps/web/package.json
{
  "name": "@portfolio/web",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@portfolio/ui": "workspace:*",
    "next": "^15.x.x",
    "react": "^18.x.x",
    "framer-motion": "^11.x.x"
  }
}
```

```typescript
// apps/web/next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@portfolio/ui'],
}

export default nextConfig
```

### 6. Tailwind CSS 설정

```typescript
// apps/web/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',  // packages/ui 포함
  ],
  theme: {
    extend: {
      // design-researcher가 채울 디자인 토큰
    },
  },
}

export default config
```

### 7. 디렉토리 구조 생성

```
apps/web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── src/
│   ├── components/
│   │   └── sections/
│   └── data/
└── public/

packages/ui/
├── src/
│   └── index.ts
└── tsup.config.ts
```

### 8. 빌드 검증

```bash
# packages/ui 빌드
yarn workspace @portfolio/ui build

# apps/web 빌드
yarn workspace @portfolio/web build
```

## 자주 발생하는 이슈

| 이슈 | 원인 | 해결 |
|-----|------|------|
| PnP 호환성 오류 | 일부 패키지가 PnP 미지원 | `.yarnrc.yml`에 `nodeLinker: node-modules` |
| `@portfolio/ui` not found | workspace 참조 오류 | `apps/web/package.json`에 `"@portfolio/ui": "workspace:*"` 확인 |
| Tailwind 클래스 미적용 | content 경로 누락 | `tailwind.config.ts`의 content에 `packages/ui` 경로 추가 |
| tsup dts 오류 | TypeScript path 설정 | `tsconfig.base.json` extends 확인 |
