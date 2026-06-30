#!/usr/bin/env node
/**
 * 진원의 GitHub 핀 고정 레포지토리를 포트폴리오 projects.ts에 자동으로 동기화합니다.
 * GitHub Actions에서 매일 실행됩니다.
 *
 * 동작 순서:
 * 1. GitHub GraphQL API로 핀 고정 레포 (최대 6개) 조회
 * 2. projects.ts에 없는 신규 레포만 필터링
 * 3. 각 레포의 README 읽기 + 이미지 다운로드
 * 4. Claude API로 한국어 프로젝트 정보 생성
 * 5. projects.ts 끝에 삽입 후 저장
 *
 * 사용법: GitHub 프로필에서 레포를 Pin하면 다음 날 자동으로 포트폴리오에 추가됩니다.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const GITHUB_USER = "jinwonnnnnnn";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// 수동 관리 레포 — pin되어 있어도 자동 추가 제외
const SKIP_REPOS = new Set([
  "jinwon-portfolio",
  "jinwonnnnnnn", // 프로필 README
]);

// ── GitHub GraphQL API (핀 고정 레포) ──────────────────────────────────────

async function fetchPinnedRepos() {
  const query = `{
    user(login: "${GITHUB_USER}") {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            createdAt
            defaultBranchRef { name }
            primaryLanguage { name }
            repositoryTopics(first: 10) {
              nodes { topic { name } }
            }
          }
        }
      }
    }
  }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "jinwon-portfolio-sync",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error(`GraphQL API ${res.status}`);
  const data = await res.json();

  if (data.errors) throw new Error(JSON.stringify(data.errors));

  return data.data.user.pinnedItems.nodes.map((node) => ({
    name: node.name,
    description: node.description ?? "",
    html_url: node.url,
    homepage: node.homepageUrl ?? null,
    stargazers_count: node.stargazerCount,
    created_at: node.createdAt,
    default_branch: node.defaultBranchRef?.name ?? "main",
    language: node.primaryLanguage?.name ?? null,
    topics: node.repositoryTopics.nodes.map((t) => t.topic.name),
  }));
}

// ── GitHub REST API (README) ────────────────────────────────────────────────

async function fetchReadme(repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${repoName}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "jinwon-portfolio-sync",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }
  );
  if (!res.ok) return "";
  const data = await res.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}

// ── 이미지 처리 ────────────────────────────────────────────────────────────

function resolveImageUrl(src, repoName, branch = "main") {
  if (/^https?:\/\//.test(src)) return src;
  const rel = src.replace(/^\.\//, "").replace(/^\//, "");
  return `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/${branch}/${rel}`;
}

function extractImageUrls(readme, repoName, branch) {
  const urls = [];
  const re = /!\[[^\]]*\]\(([^)\s"]+)/g;
  let m;
  while ((m = re.exec(readme)) !== null) {
    if (/\.(png|jpe?g|gif|webp|svg)/i.test(m[1])) {
      urls.push(resolveImageUrl(m[1], repoName, branch));
    }
    if (urls.length >= 3) break;
  }
  return urls;
}

async function downloadImage(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  writeFileSync(dest, Buffer.from(buf));
}

// ── Claude API ─────────────────────────────────────────────────────────────

async function parseWithClaude(repo, readme) {
  if (!ANTHROPIC_API_KEY) {
    console.log("  ANTHROPIC_API_KEY 없음 — 기본값으로 대체");
    return null;
  }

  const prompt = `You are helping build a Korean frontend developer's portfolio. Extract structured data from a GitHub repository.

Repository:
- Name: ${repo.name}
- Description: ${repo.description ?? "N/A"}
- Language: ${repo.language ?? "N/A"}
- Topics: ${repo.topics?.join(", ") ?? "N/A"}
- Stars: ${repo.stargazers_count}
- Created: ${repo.created_at?.slice(0, 7)}

README (up to 3000 chars):
${readme.slice(0, 3000)}

Write description and Korean-context fields in Korean (informal, developer tone). Keep tech names in English.

Return ONLY valid JSON — no markdown, no explanation:
{
  "title": "concise display name (can use repo name)",
  "subtitle": "one-line Korean tagline, under 25 chars",
  "description": "2 Korean sentences describing the project purpose and value",
  "details": [
    "Korean: key implementation detail 1",
    "Korean: key implementation detail 2",
    "Korean: key implementation detail 3",
    "Korean: key implementation detail 4"
  ],
  "achievement": "Korean: the single most significant achievement or impact",
  "outcomes": [
    "Korean: learning or result 1",
    "Korean: learning or result 2"
  ],
  "tags": ["tech1", "tech2", "..."],
  "live": "live URL if mentioned in README, omit field if none"
}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    console.error("  Claude API 오류:", await res.text());
    return null;
  }

  const data = await res.json();
  const text = data.content?.[0]?.text?.trim() ?? "";
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);
  } catch {
    console.error("  Claude 응답 파싱 실패:", text.slice(0, 200));
    return null;
  }
}

// ── TypeScript 코드 생성 ────────────────────────────────────────────────────

function toTS(obj) {
  const lines = ["  {"];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) continue;
      lines.push(`    ${k}: [`);
      for (const item of v)
        lines.push(
          `      "${String(item).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}",`
        );
      lines.push(`    ],`);
    } else if (typeof v === "boolean") {
      lines.push(`    ${k}: ${v},`);
    } else {
      lines.push(
        `    ${k}: "${String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}",`
      );
    }
  }
  lines.push("  }");
  return lines.join("\n");
}

// ── 메인 ───────────────────────────────────────────────────────────────────

async function main() {
  const projectsPath = path.join(ROOT, "apps/web/src/data/projects.ts");
  const imagesDir = path.join(ROOT, "apps/web/public/images/projects");

  if (!existsSync(imagesDir)) mkdirSync(imagesDir, { recursive: true });

  // 기존 GitHub URL 수집 (중복 방지)
  const currentContent = readFileSync(projectsPath, "utf-8");
  const existingUrls = new Set(
    [...currentContent.matchAll(/github:\s*["']([^"']+)["']/g)].map((m) => m[1])
  );

  console.log(`\n@${GITHUB_USER} 핀 고정 레포지토리 조회 중...`);
  const pinnedRepos = await fetchPinnedRepos();
  console.log(
    `핀 고정 레포 ${pinnedRepos.length}개: ${pinnedRepos.map((r) => r.name).join(", ")}`
  );

  const newRepos = pinnedRepos.filter(
    (r) => !SKIP_REPOS.has(r.name) && !existingUrls.has(r.html_url)
  );

  if (newRepos.length === 0) {
    console.log("추가할 신규 핀 고정 레포지토리 없음. 종료합니다.");
    return;
  }

  console.log(
    `\n신규 추가 대상 ${newRepos.length}개: ${newRepos.map((r) => r.name).join(", ")}\n`
  );

  const newEntries = [];

  for (const repo of newRepos) {
    console.log(`▶ ${repo.name}`);

    // README 읽기
    const readme = await fetchReadme(repo.name);
    if (readme) {
      console.log(`  README ${readme.length}자 읽음`);
    } else {
      console.log("  README 없음");
    }

    // 이미지 다운로드
    const imageUrls = extractImageUrls(readme, repo.name, repo.default_branch);
    const imagePaths = [];
    for (let i = 0; i < imageUrls.length; i++) {
      const ext =
        (imageUrls[i].match(/\.(png|jpe?g|gif|webp|svg)/i) ?? [".png"])[0];
      const fname = `${repo.name}-${i + 1}${ext.startsWith(".") ? ext : "." + ext}`;
      const dest = path.join(imagesDir, fname);
      try {
        await downloadImage(imageUrls[i], dest);
        imagePaths.push(`/images/projects/${fname}`);
        console.log(`  이미지 다운로드: ${fname}`);
      } catch (e) {
        console.log(`  이미지 다운로드 실패: ${e.message}`);
      }
    }

    // Claude로 프로젝트 정보 추출
    const parsed = await parseWithClaude(repo, readme);

    const duration =
      repo.created_at?.slice(0, 7).replace("-", ".") ?? "";

    const project = parsed
      ? {
          title: parsed.title ?? repo.name,
          subtitle: parsed.subtitle ?? "",
          description: parsed.description ?? repo.description ?? "",
          details: parsed.details ?? [],
          achievement: parsed.achievement ?? "",
          outcomes: parsed.outcomes ?? [],
          tags: parsed.tags ?? repo.topics ?? [],
          company: "개인",
          type: "personal",
          duration,
          teamSize: "개인",
          ...(imagePaths.length > 0 ? { images: imagePaths } : {}),
          github: repo.html_url,
          ...(parsed.live
            ? { live: parsed.live }
            : repo.homepage
            ? { live: repo.homepage }
            : {}),
        }
      : {
          title: repo.name,
          subtitle: repo.description ?? "개인 프로젝트",
          description: repo.description ?? "",
          details: [],
          achievement: "",
          tags: repo.topics ?? [],
          company: "개인",
          type: "personal",
          duration,
          teamSize: "개인",
          ...(imagePaths.length > 0 ? { images: imagePaths } : {}),
          github: repo.html_url,
          ...(repo.homepage ? { live: repo.homepage } : {}),
        };

    newEntries.push(toTS(project));
    console.log(`  ✓ "${project.title}" 추가 완료\n`);
  }

  if (newEntries.length > 0) {
    // ];  바로 앞에 삽입
    const insertion = "\n" + newEntries.join(",\n") + ",";
    const updated = currentContent.replace(/(\n\];)\s*$/, `${insertion}\n];`);
    writeFileSync(projectsPath, updated);
    console.log(`projects.ts에 ${newEntries.length}개 프로젝트 추가 완료.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
