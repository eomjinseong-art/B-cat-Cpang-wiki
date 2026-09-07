import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { GuideCard } from "@/components/GuideCard";
import { CATEGORIES } from "@/lib/categories";
import { getAllGuides } from "@/lib/guides";

export default function HomePage() {
  const guides = getAllGuides();
  const featured = [
    guides.find((g) => g.slug === "16-ileol-ttaen"),
    guides.find((g) => g.slug === "08-body-language"),
    guides.find((g) => g.slug === "01-ipyang-jun-junbi"),
  ].filter(Boolean);

  return (
    <main className="flex-1">
      <section className="border-b border-[var(--line)] bg-[linear-gradient(180deg,#f8f1e6_0%,#efe4d4_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm tracking-wide text-[var(--terracotta)]">CAT CARE COMPENDIUM</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-[var(--ink)] sm:text-6xl">
            이럴 땐 이렇게.
            <br />
            저런 행동은 이런 뜻.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            고양이와 처음 만나는 날부터 함께 늘어가는 날까지. 입양 준비, 밥과 화장실,
            응급 대처, 바디랭귀지까지 — 우리 아이와 더 오래, 더 행복하게 지내는 법을 담았습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/guides"
              className="rounded-full bg-[var(--terracotta)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--ink)]"
            >
              전체 {guides.length}편 보기
            </Link>
            <Link
              href="/guides/16-ileol-ttaen"
              className="rounded-full border border-[var(--ink)] px-5 py-2.5 text-sm hover:bg-[var(--card)]"
            >
              상황별 대응표
            </Link>
            <Link
              href="/download"
              className="rounded-full border border-[var(--ink)] px-5 py-2.5 text-sm hover:bg-[var(--card)]"
            >
              파일 다운로드
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-serif text-2xl">먼저 읽으면 좋은 글</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((guide) =>
            guide ? <GuideCard key={guide.slug} guide={guide} featured /> : null,
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-serif text-2xl">파일로 가져가기</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          블로그에 붙일 마크다운과, 이 사이트 소스코드를 ZIP으로 받을 수 있습니다.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <a
            href="/api/download/guides"
            download="nyang-pedia-guides.zip"
            className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 hover:border-[var(--terracotta)]"
          >
            <p className="font-serif text-xl">마크다운 17편</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              버튼을 누르면 ZIP 파일이 바로 저장됩니다.
            </p>
            <p className="mt-4 inline-flex rounded-full bg-[var(--terracotta)] px-4 py-2 text-sm text-white">
              ZIP 받기
            </p>
          </a>
          <a
            href="/api/download/source"
            download="nyang-pedia-source.zip"
            className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 hover:border-[var(--terracotta)]"
          >
            <p className="font-serif text-xl">사이트 소스코드</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              버튼을 누르면 ZIP 파일이 바로 저장됩니다.
            </p>
            <p className="mt-4 inline-flex rounded-full bg-[var(--ink)] px-4 py-2 text-sm text-[var(--paper)]">
              ZIP 받기
            </p>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
        <h2 className="font-serif text-2xl">주제</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const count = guides.filter((g) => g.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/guides?category=${cat.id}`}
                className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 hover:border-[var(--terracotta)]"
              >
                <p className="font-serif text-lg">{cat.label}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{cat.blurb}</p>
                <p className="mt-3 text-xs text-[var(--terracotta)]">{count}편</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl">모든 글</h2>
          <Link href="/guides" className="text-sm text-[var(--terracotta)]">
            검색·필터 →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </main>
  );
}
