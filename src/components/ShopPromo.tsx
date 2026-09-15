import { ArrowRight, PawPrint } from "lucide-react";
import {
  ADS,
  SHOP,
  SHOP_LINK_REL,
  getRelatedShopTopics,
  shopUrl,
} from "@/lib/ads";

function RecommendBadge() {
  return (
    <span className="rounded-full bg-[var(--paper)]/90 px-2 py-0.5 text-[10px] tracking-wide text-[var(--muted)]">
      추천
    </span>
  );
}

function NewTabHint() {
  return <span className="sr-only"> (새 탭에서 열림)</span>;
}

export function RelatedShopPromo({
  slug,
  category,
}: {
  slug: string;
  category?: string;
}) {
  const topics = getRelatedShopTopics(slug, category);
  const href = shopUrl();

  return (
    <section
      className="mt-12 border-t border-[var(--line)] pt-8"
      aria-labelledby="related-shop-heading"
    >
      <p className="flex items-center gap-1.5 text-xs tracking-wide text-[var(--sage)]">
        <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
        {SHOP.name}
      </p>
      <h2 id="related-shop-heading" className="mt-2 font-serif text-xl">
        이 글과 관련된 용품
      </h2>
      <p className="mt-1 max-w-xl text-sm text-[var(--muted)]">
        가이드에서 다룬 돌봄과 이어지는 용품입니다. 숨숨마을에서 둘러보세요.
      </p>
      <div
        className={`mt-4 grid gap-3 ${
          topics.length === 1 ? "sm:max-w-xl" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {topics.map((topic) => (
          <a
            key={topic.id}
            href={href}
            target="_blank"
            rel={SHOP_LINK_REL}
            aria-label={`${topic.label} — 숨숨마을에서 보기`}
            className="group relative flex flex-col rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 transition-all hover:border-[var(--terracotta)] hover:shadow-[0_12px_40px_rgba(80,40,20,0.08)]"
          >
            <span className="absolute top-3 right-3">
              <RecommendBadge />
            </span>
            <p className="pr-10 font-serif text-lg leading-snug text-[var(--ink)] group-hover:text-[var(--terracotta)]">
              {topic.label}
            </p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
              {topic.blurb}
            </p>
            <p className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--terracotta)]">
              숨숨마을에서 보기
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              <NewTabHint />
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

export function ShopStrip() {
  const copy = ADS.strip;
  const href = shopUrl();

  return (
    <a
      href={href}
      target="_blank"
      rel={SHOP_LINK_REL}
      aria-label={`${copy.title} — 숨숨마을에서 보기`}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-[linear-gradient(120deg,var(--card)_0%,var(--sage-soft)_100%)] px-4 py-3 transition-all hover:border-[var(--terracotta)] sm:px-5"
    >
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-xs tracking-wide text-[var(--sage)]">
          <PawPrint className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {SHOP.name}
          <RecommendBadge />
        </p>
        <p className="mt-1 truncate font-serif text-[var(--ink)] sm:text-lg">
          {copy.title}
        </p>
        <p className="mt-0.5 hidden text-sm text-[var(--muted)] sm:block">
          {copy.body}
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--terracotta)] px-3 py-2 text-sm font-medium text-white transition-colors group-hover:bg-[var(--ink)]">
        {copy.cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        <NewTabHint />
      </span>
    </a>
  );
}
