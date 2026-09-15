import { ArrowRight, PawPrint } from "lucide-react";
import { ADS, SHOP, SHOP_LINK_REL, shopUrl, type AdVariant } from "@/lib/ads";

export function AdSlot({ variant = "inline" }: { variant?: AdVariant }) {
  const copy = ADS[variant];
  const compact = variant === "strip";

  return (
    <a
      href={shopUrl()}
      target="_blank"
      rel={SHOP_LINK_REL}
      aria-label={`${copy.title} — 숨숨마을에서 보기`}
      className={`group relative block overflow-hidden rounded-3xl border border-[var(--line)] bg-[linear-gradient(120deg,var(--card)_0%,var(--sage-soft)_100%)] transition-all hover:border-[var(--terracotta)] hover:shadow-[0_12px_40px_rgba(80,40,20,0.08)] ${
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
      }`}
    >
      <span className="absolute top-3 right-3 rounded-full bg-[var(--paper)]/90 px-2 py-0.5 text-[10px] tracking-wide text-[var(--muted)]">
        추천
      </span>
      <div
        className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:pr-16 ${
          compact ? "gap-3" : ""
        }`}
      >
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs tracking-wide text-[var(--sage)]">
            <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
            {SHOP.name} · {SHOP.tagline}
          </p>
          <p
            className={`mt-2 font-serif leading-snug text-[var(--ink)] ${
              compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
            }`}
          >
            {copy.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
            {copy.body}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-[var(--terracotta)] px-4 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-[var(--ink)] sm:self-center">
          {copy.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only"> (새 탭에서 열림)</span>
        </span>
      </div>
    </a>
  );
}
