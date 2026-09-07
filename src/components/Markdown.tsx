import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AdSlot } from "@/components/AdSlot";
import { headingId } from "@/lib/guides";

function childText(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return childText((children as { props: { children?: unknown } }).props.children);
  }
  return "";
}

const components: Components = {
  h2: ({ children }) => {
    const id = headingId(childText(children));
    return (
      <h2 id={id} className="scroll-mt-24 font-serif">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = headingId(childText(children));
    return (
      <h3 id={id} className="scroll-mt-24">
        {children}
      </h3>
    );
  },
  a: ({ href, children }) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className="text-[var(--terracotta)] underline-offset-2 hover:underline">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--terracotta)] underline-offset-2 hover:underline"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-[3px] border-[var(--terracotta)] bg-[var(--sage-soft)]/50 px-4 py-3 not-italic">
      {children}
    </blockquote>
  ),
};

// 문단 경계(빈 줄)를 찾아 글의 55% 지점 근처에서 본문을 둘로 나눕니다.
// 코드 블록(```) 중간이 잘리지 않도록 안전한 경계만 후보로 삼습니다.
function isInsideFence(markdown: string, pos: number): boolean {
  let count = 0;
  let idx = -1;
  while ((idx = markdown.indexOf("```", idx + 1)) !== -1) {
    if (idx >= pos) break;
    count += 1;
  }
  return count % 2 === 1;
}

function splitAtAdPoint(markdown: string): [string, string] {
  const target = Math.floor(markdown.length * 0.55);
  const candidates: number[] = [];
  let idx = -1;
  while ((idx = markdown.indexOf("\n\n", idx + 1)) !== -1) {
    if (!isInsideFence(markdown, idx)) candidates.push(idx);
  }
  if (candidates.length === 0) {
    const mid = Math.floor(markdown.length / 2);
    return [markdown.slice(0, mid), markdown.slice(mid)];
  }
  const best = candidates.reduce((a, b) =>
    Math.abs(a - target) <= Math.abs(b - target) ? a : b,
  );
  return [markdown.slice(0, best), markdown.slice(best)];
}

export function Markdown({
  content,
  showAd = true,
}: {
  content: string;
  showAd?: boolean;
}) {
  if (!showAd) {
    return (
      <div className="guide-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    );
  }

  const [first, second] = splitAtAdPoint(content);
  return (
    <div className="guide-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {first}
      </ReactMarkdown>
      <div className="my-8">
        <AdSlot variant="inline" />
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {second}
      </ReactMarkdown>
    </div>
  );
}