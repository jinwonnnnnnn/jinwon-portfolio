#!/usr/bin/env node
/**
 * 진원의 GitHub 레포지토리를 포트폴리오 projects.ts에 자동으로 동기화합니다.
 * GitHub Actions에서 매일 실행됩니다.
 *
 * 동작 순서:
 * 1. GitHub API로 공개 레포 목록 조회
 * 2. projects.ts에 없는 신규 레포 필터링
 * 3. 각 레포의 README 읽기 + 이미지 다운로드
 * 4. Claude API로 한국어 프로젝트 정보 생성
 * 5. projects.ts 끝에 삽입 후 저장
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const GITHUB_USER = "jinwonnnnnnn";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// 수동 관리 레포 — 자동 동기화 제외
const SKIP_REPOS = new Set([
  "jinwon-portfolio",
  "jinwonnnnnnn", // profile README
]);

// ── GitHub API ─────────────────────────────────────────────────────────────

async function ghFetch(endpoint) {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "jinwon-portfolio-sync",
      ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${endpoint}`);
  return res.json();
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
  "live": "live URL if mentioned, omit field if none"
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
    // JSON 블록만 추출 (마크다운 fence 대응)
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
        lines.push(`      "${String(item).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}",`);
      lines.push(`    ],`);
    } else if (typeof v === "boolean") {
      lines.push(`    ${k}: ${v},`);
    } else {
      lines.push(`    ${k}: "${String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}",`);
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

  console.log(`\n@${GITHUB_USER} 레포지토리 조회 중...`);
  const repos = await ghFetch(
    `/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=public`
  );

  const newRepos = repos.filter(
    (r) =>
      !r.fork &&
      !r.archived &&
      !SKIP_REPOS.has(r.name) &&
      !existingUrls.has(r.html_url)
  );

  if (newRepos.length === 0) {
    console.log("신규 레포지토리 없음. 종료합니다.");
    return;
  }

  console.log(
    `신규 레포 ${newRepos.length}개 발견: ${newRepos.map((r) => r.name).join(", ")}\n`
  );

  const newEntries = [];

  for (const repo of newRepos) {
    console.log(`▶ ${repo.name}`);

    // README 읽기
    let readme = "";
    try {
      const readmeData = await ghFetch(
        `/repos/${GITHUB_USER}/${repo.name}/readme`
      );
      readme = Buffer.from(readmeData.content, "base64").toString("utf-8");
      console.log(`  README ${readme.length}자 읽음`);
    } catch {
      console.log("  README 없음");
    }

    // 이미지 다운로드
    const imageUrls = extractImageUrls(
      readme,
      repo.name,
      repo.default_branch ?? "main"
    );
    const imagePaths = [];
    for (let i = 0; i < imageUrls.length; i++) {
      const ext = (imageUrls[i].match(/\.(png|jpe?g|gif|webp|svg)/i) ?? [".png"])[0];
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
          ...(parsed.live ? { live: parsed.live } : {}),
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
