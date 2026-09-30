const COUPANG_PARTNERS_URL = "https://link.coupang.com/a/hsdzLh1vB6";

/** 하단 쿠팡 파트너스 배너 (광고). 링크는 수익 추적용이므로 수정하지 마세요. */
export function CoupangBanner({ className = "" }: { className?: string }) {
  return (
    <aside aria-label="광고" className={`mt-6 ${className}`}>
      <a
        href={COUPANG_PARTNERS_URL}
        target="_blank"
        rel="sponsored noopener noreferrer nofollow"
        className="flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] transition-colors hover:border-[var(--terracotta)] hover:text-[var(--terracotta)]"
      >
        <span className="shrink-0 rounded border border-[var(--line)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">
          광고
        </span>
        <span className="min-w-0 flex-1">주인님 간식 결재는 집사 몫이니까요 · 쿠팡에서 둘러보기</span>
        <span aria-hidden="true" className="shrink-0 text-[var(--terracotta)]">
          →
        </span>
      </a>
      <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
        이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </aside>
  );
}
