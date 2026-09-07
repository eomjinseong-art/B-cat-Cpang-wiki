"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBox() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  return (
    <form
      className="relative"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const input = form.elements.namedItem("q") as HTMLInputElement;
        const next = new URLSearchParams(params.toString());
        const value = input.value.trim();
        if (value) next.set("q", value);
        else next.delete("q");
        router.push(`/guides?${next.toString()}`);
      }}
    >
      <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
      <input
        type="search"
        name="q"
        defaultValue={q}
        key={q}
        placeholder="증상, 용품, 행동으로 검색"
        className="w-full rounded-full border border-[var(--line)] bg-[var(--card)] py-3 pr-4 pl-10 text-sm outline-none ring-[var(--terracotta)] focus:ring-2"
        aria-label="글 검색"
      />
    </form>
  );
}
