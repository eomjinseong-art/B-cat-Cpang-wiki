import { Suspense } from "react";
import { AdSlot } from "@/components/AdSlot";
import { CategoryPills } from "@/components/CategoryPills";
import { GuideCard } from "@/components/GuideCard";
import { SearchBox } from "@/components/SearchBox";
import { categoryLabel } from "@/lib/categories";
import { getAllGuides, searchGuides } from "@/lib/guides";

export const metadata = {
  title: "전체 글",
  description: "냥백과 고양이 양육 가이드 목록과 검색",
};

function GuideIndex({
  category,
  q,
}: {
  category?: string;
  q?: string;
}) {
  const all = q ? searchGuides(q) : getAllGuides();
  const guides = category ? all.filter((g) => g.category === category) : all;

  return (
    <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl sm:text-4xl">양육 가이드</h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        증상·용품·행동 키워드로 찾거나, 주제로 걸러 보세요. 글이 필요하면{" "}
        <a href="/download" className="text-[var(--terracotta)] hover:underline">
          17편 ZIP으로 받기
        </a>
        를 이용해도 됩니다.
      </p>
      <div className="mt-6 max-w-xl">
        <SearchBox />
      </div>
      <div className="mt-5">
        <CategoryPills active={category} />
      </div>
      <p className="mt-8 text-sm text-[var(--muted)]">
        {q ? `“${q}” 검색 · ` : null}
        {category ? `${categoryLabel(category)} · ` : null}
        {guides.length}편
      </p>
      {guides.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-16 text-center">
          <p className="font-serif text-xl">해당하는 글이 없습니다</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            다른 단어로 검색하거나 주제를 바꿔 보세요. 응급 상황은 「이럴 땐 이렇게」를
            먼저 보세요.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 3).map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
          {guides.length > 3 ? (
            <div className="sm:col-span-2 lg:col-span-3">
              <AdSlot variant="list" />
            </div>
          ) : null}
          {guides.slice(3).map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}
    </main>
  );
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-16 text-[var(--muted)]">목록을 불러오는 중…</main>
      }
    >
      <GuideIndex category={category} q={q} />
    </Suspense>
  );
}
