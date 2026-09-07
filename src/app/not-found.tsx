import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex flex-1 max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-sm text-[var(--terracotta)]">404</p>
      <h1 className="mt-2 font-serif text-3xl">글을 찾을 수 없습니다</h1>
      <p className="mt-3 text-[var(--muted)]">
        주소가 바뀌었거나 아직 없는 페이지입니다. 목록에서 다시 골라 주세요.
      </p>
      <Link
        href="/guides"
        className="mt-8 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm text-[var(--paper)]"
      >
        전체 글 보기
      </Link>
    </main>
  );
}
