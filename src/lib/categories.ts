export const CATEGORIES = [
  { id: "start", label: "시작하기", blurb: "입양 전 준비부터 생애주기까지" },
  { id: "daily", label: "하루 돌봄", blurb: "밥, 물, 화장실, 그루밍" },
  { id: "health", label: "건강", blurb: "병원 신호, 질병, 응급·독성" },
  { id: "behavior", label: "행동", blurb: "바디랭귀지와 문제행동" },
  { id: "environment", label: "환경", blurb: "놀이, 다묘, 집 안전" },
  { id: "products", label: "용품", blurb: "무엇을 먼저 살지" },
  { id: "reference", label: "빠른 찾기", blurb: "이럴 땐, FAQ" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function categoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
