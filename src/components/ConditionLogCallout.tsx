import { ClipboardList, ExternalLink, Smartphone } from "lucide-react";
import { CONDITION_LOG } from "@/lib/companion";

export function ConditionLogCallout({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      aria-labelledby="condition-log-heading"
      className={`rounded-3xl border border-[var(--line)] bg-[var(--card)] ${
        compact ? "p-5 sm:p-6" : "p-5 sm:p-7"
      }`}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="min-w-0 max-w-2xl">
          <p className="flex items-center gap-1.5 text-xs tracking-wide text-[var(--sage)]">
            <ClipboardList className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {CONDITION_LOG.eyebrow}
          </p>
          <h2
            id="condition-log-heading"
            className={`mt-2 font-serif leading-snug text-[var(--ink)] ${
              compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-[1.65rem]"
            }`}
          >
            {CONDITION_LOG.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-[0.95rem]">
            {CONDITION_LOG.body}
          </p>
          <a
            href={CONDITION_LOG.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--sage)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sage)]"
          >
            {CONDITION_LOG.cta}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (새 탭에서 열림)</span>
          </a>
        </div>

        <div className="min-w-0 rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-4 sm:px-5 lg:w-[22rem] lg:shrink-0">
          <p className="flex items-center gap-1.5 text-sm font-medium text-[var(--ink)]">
            <Smartphone className="h-4 w-4 text-[var(--sage)]" aria-hidden="true" />
            스마트폰 홈 화면에 두면 더 편합니다
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              <span className="font-medium text-[var(--ink)]">iPhone Safari</span>
              {" · "}
              공유 → 홈 화면에 추가
            </li>
            <li>
              <span className="font-medium text-[var(--ink)]">Android Chrome</span>
              {" · "}
              메뉴
              <span aria-hidden="true"> (⋮)</span>
              <span className="sr-only"> 점 세 개</span>
              {" → "}
              홈 화면에 추가 / 앱 설치
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
