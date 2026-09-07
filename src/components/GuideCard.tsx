import Link from "next/link";
import { categoryLabel } from "@/lib/categories";
import type { GuideMeta } from "@/lib/guides";

export function GuideCard({
  guide,
  featured = false,
}: {
  guide: GuideMeta;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={`group flex flex-col rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--terracotta)] hover:shadow-[0_12px_40px_rgba(80,40,20,0.08)] ${
        featured ? "sm:p-7" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <span className="rounded-full bg-[var(--sage-soft)] px-2 py-0.5 text-[var(--sage)]">
          {categoryLabel(guide.category)}
        </span>
        <span>{guide.readMinutes}분</span>
      </div>
      <h3
        className={`mt-3 font-serif text-[var(--ink)] group-hover:text-[var(--terracotta)] ${
          featured ? "text-2xl" : "text-xl"
        }`}
      >
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
        {guide.description}
      </p>
      <p className="mt-4 text-sm text-[var(--terracotta)]">읽어보기 →</p>
    </Link>
  );
}
