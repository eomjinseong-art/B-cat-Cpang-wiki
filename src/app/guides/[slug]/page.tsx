import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { RelatedShopPromo } from "@/components/ShopPromo";
import { TableOfContents } from "@/components/TableOfContents";
import { categoryLabel } from "@/lib/categories";
import { extractHeadings, getAllGuides, getGuide } from "@/lib/guides";

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "글을 찾을 수 없습니다" };
  return { title: guide.title, description: guide.description };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const headings = extractHeadings(guide.content);
  const all = getAllGuides();
  const index = all.findIndex((g) => g.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;
  const related = all
    .filter((g) => g.category === guide.category && g.slug !== slug)
    .slice(0, 3);

  return (
    <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-[var(--muted)]">
        <Link href="/guides" className="hover:text-[var(--terracotta)]">
          전체 글
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/guides?category=${guide.category}`}
          className="hover:text-[var(--terracotta)]"
        >
          {categoryLabel(guide.category)}
        </Link>
      </p>
      <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">{guide.description}</p>
      <p className="mt-3 text-sm text-[var(--muted)]">읽는 시간 약 {guide.readMinutes}분</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={`/api/download/md/${guide.slug}`}
          download={`${guide.slug}.md`}
          className="inline-flex items-center rounded-full bg-[var(--terracotta)] px-3 py-1.5 text-sm text-white hover:bg-[var(--ink)]"
        >
          이 글 마크다운 받기
        </a>
        <Link
          href="/download"
          className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 text-sm hover:border-[var(--terracotta)] hover:text-[var(--terracotta)]"
        >
          16편·소스 ZIP
        </Link>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <article>
          <Markdown content={guide.content} />
          <RelatedShopPromo slug={guide.slug} category={guide.category} />
        </article>
        <TableOfContents headings={headings} />
      </div>

      {related.length > 0 ? (
        <section className="mt-16 border-t border-[var(--line)] pt-8">
          <h2 className="font-serif text-xl">같은 주제</h2>
          <ul className="mt-4 space-y-2">
            {related.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-[var(--terracotta)] hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav className="mt-12 grid gap-4 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/guides/${prev.slug}`}
            className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 hover:border-[var(--terracotta)]"
          >
            <p className="text-xs text-[var(--muted)]">이전</p>
            <p className="mt-1 font-serif">{prev.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/guides/${next.slug}`}
            className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 text-right hover:border-[var(--terracotta)]"
          >
            <p className="text-xs text-[var(--muted)]">다음</p>
            <p className="mt-1 font-serif">{next.title}</p>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
