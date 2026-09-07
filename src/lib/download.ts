import fs from "fs";
import path from "path";
import { zipSync } from "fflate";
import { GUIDES_DIR, getAllGuideFilenames } from "./guides";

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  ".cursor",
  "terminals",
  "coverage",
  "out",
  "dist",
  "downloads",
]);

const SKIP_NAMES = new Set([".DS_Store", "npm-debug.log"]);

function zipResponse(filename: string, files: Record<string, Uint8Array>) {
  const zipped = zipSync(files, { level: 6 });
  return new Response(Buffer.from(zipped), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

function buildMarkdownZipFiles(): Record<string, Uint8Array> {
  const files: Record<string, Uint8Array> = {};
  const names = getAllGuideFilenames();
  for (const name of names) {
    const raw = fs.readFileSync(path.join(GUIDES_DIR, name));
    files[`nyang-pedia-guides/${name}`] = new Uint8Array(raw);
  }
  const readmePath = path.join(process.cwd(), "content", "README.md");
  if (fs.existsSync(readmePath)) {
    files["nyang-pedia-guides/README.md"] = new Uint8Array(
      fs.readFileSync(readmePath),
    );
  }
  return files;
}

export function markdownZipResponse() {
  return zipResponse("nyang-pedia-guides.zip", buildMarkdownZipFiles());
}

function collectSourceFiles(dir: string, rel = ""): Record<string, Uint8Array> {
  const out: Record<string, Uint8Array> = {};
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_NAMES.has(entry.name) || entry.name.endsWith(".log") || entry.name.endsWith(".tsbuildinfo")) continue;
    const childRel = rel ? `${rel}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      Object.assign(out, collectSourceFiles(full, childRel));
      continue;
    }
    if (!entry.isFile()) continue;
    out[`nyang-pedia/${childRel}`] = new Uint8Array(fs.readFileSync(full));
  }
  return out;
}

export function sourceZipResponse() {
  const root = process.cwd();
  const files = collectSourceFiles(root);
  return zipResponse("nyang-pedia-source.zip", files);
}

export function markdownFileResponse(slug: string, body: string) {
  const filename = `${slug}.md`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
