import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function CategoryPills({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/guides"
        className={`rounded-full px-3 py-1.5 text-sm ${
          !active
            ? "bg-[var(--ink)] text-[var(--paper)]"
            : "border border-[var(--line)] bg-[var(--card)] text-[var(--muted)]"
        }`}
      >
        전체
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          href={`/guides?category=${cat.id}`}
          className={`rounded-full px-3 py-1.5 text-sm ${
            active === cat.id
              ? "bg-[var(--ink)] text-[var(--paper)]"
              : "border border-[var(--line)] bg-[var(--card)] text-[var(--muted)]"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
