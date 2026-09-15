import { SHOP_LINK_REL, shopUrl } from "@/lib/ads";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--card)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="font-serif text-lg text-[var(--ink)]">냥백과</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          고양이와 함께하는 집사를 위한 양육 백과입니다. 글은 일반적인 정보이며
          수의사 진료를 대체하지 않습니다. 응급·투약·중독은 즉시 동물병원에
          문의하세요.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <a
            href={shopUrl()}
            target="_blank"
            rel={SHOP_LINK_REL}
            className="text-[var(--terracotta)] hover:underline"
          >
            우리 아이 용품이 궁금하다면 → 숨숨마을
          </a>
          <span className="hidden text-[var(--line)] sm:inline">·</span>
          <a href="/download" className="text-[var(--terracotta)] hover:underline">
            마크다운 17편과 사이트 소스 다운로드
          </a>
        </div>
        <p className="mt-6 text-xs text-[var(--muted)]">
          원문은 <code className="rounded bg-[var(--paper)] px-1">content/guides</code> 폴더의
          마크다운입니다.
        </p>
      </div>
    </footer>
  );
}