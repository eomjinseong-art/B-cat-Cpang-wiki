import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CategoryId } from "./categories";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  category: CategoryId | string;
  tags: string[];
  order: number;
  readMinutes: number;
};

export type Guide = GuideMeta & {
  content: string;
};

function readGuideFile(filename: string): Guide {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(GUIDES_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    category: String(data.category ?? "reference"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    order: Number(data.order ?? 99),
    readMinutes: Number(data.readMinutes ?? 8),
    content,
  };
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readGuideFile)
    .sort((a, b) => a.order - b.order);
}

export function getGuide(slug: string): Guide | null {
  const file = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return readGuideFile(`${slug}.md`);
}

export function getGuideRawMarkdown(slug: string): string | null {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  const file = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

export function getAllGuideFilenames(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

export { GUIDES_DIR };

export function getGuidesByCategory(category: string): Guide[] {
  return getAllGuides().filter((guide) => guide.category === category);
}

export function searchGuides(query: string): Guide[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllGuides();
  return getAllGuides().filter((guide) => {
    const hay = [
      guide.title,
      guide.description,
      guide.tags.join(" "),
      guide.content,
    ]
      .join("\n")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function headingId(text: string) {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w가-힣-]/g, "")
    .toLowerCase();
}

export function extractHeadings(markdown: string) {
  const headings: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({ id: headingId(text), text, level });
  }
  return headings;
}
