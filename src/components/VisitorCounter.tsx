"use client";

import { useEffect, useState } from "react";

const ABACUS_BASE = "https://abacus.jasoncameron.dev";
const NAMESPACE = "b-cat-cpang-wiki";
const KEY = "visits";
const STORAGE_KEY = "b-cat-cpang-wiki:visits:last-hit";

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function canUseStorage() {
  try {
    const probe = `${STORAGE_KEY}:probe`;
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

function parseCount(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("value" in payload)) {
    return null;
  }
  const value = Number((payload as { value: unknown }).value);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}

let pendingCount: Promise<number | null> | null = null;

function loadVisitCount() {
  if (pendingCount) return pendingCount;

  pendingCount = (async () => {
    const storageOk = canUseStorage();
    const lastHit = storageOk ? localStorage.getItem(STORAGE_KEY) : null;
    const today = todayKey();
    const shouldHit = storageOk && lastHit !== today;
    if (shouldHit) {
      localStorage.setItem(STORAGE_KEY, today);
    }

    const endpoint = shouldHit ? "hit" : "get";
    const response = await fetch(
      `${ABACUS_BASE}/${endpoint}/${NAMESPACE}/${KEY}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      if (shouldHit) localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    const next = parseCount(await response.json());
    if (next === null && shouldHit) {
      localStorage.removeItem(STORAGE_KEY);
    }
    return next;
  })();

  return pendingCount;
}

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadVisitCount()
      .then((next) => {
        if (!cancelled && next !== null) setCount(next);
      })
      .catch(() => {
        // Hide on failure.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 text-xs tabular-nums text-[var(--muted)]"
      aria-hidden="true"
    >
      <span>👁</span>
      <span>{count.toLocaleString()}</span>
    </span>
  );
}
