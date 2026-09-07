import { Download, FileArchive, FolderCode } from "lucide-react";
import Link from "next/link";
import { getAllGuides } from "@/lib/guides";

export const metadata = {
  title: "다운로드",
  description: "냥백과 17편 마크다운과 사이트 소스코드를 ZIP으로 받습니다.",
};

export default function DownloadPage() {
  const guides = getAllGuides();

  return (
    <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl sm:text-4xl">다운로드</h1>
      <ol className="mt-5 max-w-xl list-decimal space-y-2 pl-5 text-[var(--muted)]">
        <li>아래에서 받고 싶은 주황색 버튼을 누릅니다.</li>
        <li>브라우저가 zip 저장 창을 띄우거나, 다운로드 폴더에 바로 넣습니다.</li>
        <li>
          미리보기 안에서 저장이 안 되면 버튼을 <strong className="text-[var(--ink)]">오른쪽 클릭 → 다른 이름으로 저장</strong>하세요.
        </li>
      </ol>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6">
          <FileArchive className="h-8 w-8 text-[var(--terracotta)]" />
          <h2 className="mt-4 font-serif text-2xl">마크다운 17편</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            블로그에 붙일 글 원문입니다. 파일 이름{" "}
            <code className="rounded bg-[var(--paper)] px-1">nyang-pedia-guides.zip</code>
          </p>
          <a
            href="/api/download/guides"
            download="nyang-pedia-guides.zip"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--terracotta)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--ink)]"
          >
            <Download className="h-4 w-4" />
            마크다운 ZIP 받기
          </a>
        </div>
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6">
          <FolderCode className="h-8 w-8 text-[var(--sage)]" />
          <h2 className="mt-4 font-serif text-2xl">사이트 소스코드</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            냥백과 Next.js 프로젝트입니다. 파일 이름{" "}
            <code className="rounded bg-[var(--paper)] px-1">nyang-pedia-source.zip</code>
            . 받은 뒤 압축을 풀고 <code className="rounded bg-[var(--paper)] px-1">npm install</code>{" "}
            하세요.
          </p>
          <a
            href="/api/download/source"
            download="nyang-pedia-source.zip"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] hover:bg-[var(--terracotta)]"
          >
            <Download className="h-4 w-4" />
            소스코드 ZIP 받기
          </a>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-2xl">글 하나씩 받기</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          오른쪽 <strong className="text-[var(--ink)]">MD 받기</strong>를 누르면 그 글만{" "}
          <code className="rounded bg-[var(--card)] px-1">.md</code>로 저장됩니다.
        </p>
        <ul className="mt-6 divide-y divide-[var(--line)] overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)]">
          {guides.map((guide) => (
            <li
              key={guide.slug}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5"
            >
              <div>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="font-medium hover:text-[var(--terracotta)]"
                >
                  {guide.title}
                </Link>
                <p className="text-xs text-[var(--muted)]">{guide.slug}.md</p>
              </div>
              <a
                href={`/api/download/md/${guide.slug}`}
                download={`${guide.slug}.md`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-3 py-1.5 text-sm text-[var(--paper)] hover:bg-[var(--terracotta)]"
              >
                <Download className="h-3.5 w-3.5" />
                MD 받기
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
