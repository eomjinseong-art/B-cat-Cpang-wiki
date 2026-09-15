import Link from "next/link";
import { Menu } from "lucide-react";
import { VisitorCounter } from "@/components/VisitorCounter";
import { SHOP_LINK_REL, shopUrl } from "@/lib/ads";

const NAV = [
  { href: "/guides", label: "전체 글" },
  { href: "/guides/16-ileol-ttaen", label: "이럴 땐" },
  { href: "/guides/08-body-language", label: "바디랭귀지" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--paper)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex min-w-0 items-baseline gap-3">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-xl tracking-tight text-[var(--ink)]">
              냥백과
            </span>
            <span className="hidden text-xs text-[var(--muted)] sm:inline">
              고양이 키우기의 모든 것
            </span>
          </Link>
          <VisitorCounter />
        </div>
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--terracotta)]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={shopUrl()}
            target="_blank"
            rel={SHOP_LINK_REL}
            className="rounded-full bg-[var(--terracotta)] px-3 py-1.5 text-white hover:bg-[var(--ink)]"
          >
            용품 보기
          </a>
          <Link
            href="/download"
            className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[var(--ink)] hover:border-[var(--terracotta)] hover:text-[var(--terracotta)]"
          >
            다운로드
          </Link>
          <Link
            href="/guides"
            className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[var(--ink)] hover:border-[var(--terracotta)] hover:text-[var(--terracotta)]"
          >
            검색
          </Link>
        </nav>
        <details className="relative md:hidden">
          <summary className="flex list-none items-center rounded-full border border-[var(--line)] p-2 [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5" aria-label="메뉴" />
          </summary>
          <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-2 shadow-lg">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-sm hover:bg-[var(--paper)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={shopUrl()}
              target="_blank"
              rel={SHOP_LINK_REL}
              className="block rounded-xl bg-[var(--terracotta)] px-3 py-2 text-sm text-white"
            >
              용품 보기
            </a>
            <Link
              href="/download"
              className="block rounded-xl px-3 py-2 text-sm hover:bg-[var(--paper)]"
            >
              다운로드
            </Link>
            <Link
              href="/guides"
              className="block rounded-xl px-3 py-2 text-sm hover:bg-[var(--paper)]"
            >
              검색·전체
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}