// 광고(숨숨마을) 설정 — 광고 문구나 링크를 바꾸려면 이 파일만 수정하면 됩니다.
export const SHOP = {
  name: "숨숨마을",
  url: "https://b-cat-cpang.vercel.app/",
  tagline: "고양이와 집사를 위한 용품 큐레이션",
} as const;

export type AdVariant = "inline" | "banner" | "list";

type AdCopy = {
  title: string;
  body: string;
  cta: string;
};

export const ADS: Record<AdVariant, AdCopy> = {
  inline: {
    title: "우리 집 고양이를 위한, 제대로 고른 용품",
    body: "필수템부터 특별한 선물까지, 집사가 직접 고른 용품을 숨숨마을에서 만나 보세요.",
    cta: "숨숨마을에서 보기",
  },
  banner: {
    title: "고양이와 집사를 위한 작은 마을, 숨숨마을",
    body: "매일 쓰는 필수템부터 마음을 담은 선물까지. 우리 아이에게 꼭 맞는 용품을 골라 드려요.",
    cta: "용품 구경하기",
  },
  list: {
    title: "냥이 필수템, 한눈에 보기",
    body: "입양 준비부터 매일 쓰는 용품까지, 집사가 고른 것만 모았어요.",
    cta: "숨숨마을 가기",
  },
};