// 숨숨마을 추천 설정 — 문구·노출만 바꾸려면 이 파일만 수정하면 됩니다.
// 위키 프로모는 쿠팡 파트너스 URL로 바로 보내지 않습니다. 항상 숨숨마을만 엽니다.
export const SHOP = {
  name: "숨숨마을",
  url: "https://b-cat-cpang.vercel.app/",
  tagline: "고양이와 집사를 위한 용품 큐레이션",
} as const;

export const SHOP_LINK_REL = "noopener noreferrer" as const;

export type AdVariant = "inline" | "banner" | "list" | "strip";

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
    cta: "숨숨마을에서 보기",
  },
  list: {
    title: "냥이 필수템, 한눈에 보기",
    body: "입양 준비부터 매일 쓰는 용품까지, 집사가 고른 것만 모았어요.",
    cta: "숨숨마을에서 보기",
  },
  strip: {
    title: "숨숨마을에서 보기",
    body: "가이드에서 다룬 돌봄과 이어지는 고양이 용품을 한곳에서 둘러보세요.",
    cta: "숨숨마을에서 보기",
  },
};

export type ShopTopic = {
  id: string;
  label: string;
  blurb: string;
};

const SHOP_TOPICS = {
  feed: {
    id: "feed",
    label: "고양이 사료",
    blurb: "건식·습식, 우리 아이 몸에 맞는 급여부터.",
  },
  litter: {
    id: "litter",
    label: "고양이 모래",
    blurb: "먼지와 발 편안함을 먼저 보는 모래.",
  },
  treats: {
    id: "treats",
    label: "고양이 간식",
    blurb: "훈련·관계용 간식도 열량부터 맞춰 보세요.",
  },
  tower: {
    id: "tower",
    label: "스크래처·캣타워",
    blurb: "세로 공간과 발톱을 한 번에.",
  },
  hygiene: {
    id: "hygiene",
    label: "위생·화장실",
    blurb: "화장실, 모래, 매트처럼 매일 쓰는 것.",
  },
  toys: {
    id: "toys",
    label: "장난감",
    blurb: "사냥 놀이에 쓰는 낚싯대와 공.",
  },
  grooming: {
    id: "grooming",
    label: "그루밍",
    blurb: "브러시, 발톱깎이, 양치 용품.",
  },
} as const satisfies Record<string, ShopTopic>;

type ShopTopicId = keyof typeof SHOP_TOPICS;

const DEFAULT_RELATED: ShopTopic = {
  id: "all",
  label: "숨숨마을 큐레이션",
  blurb: "이 글에서 다룬 돌봄과 이어지는 용품을 한곳에서 둘러보세요.",
};

const GUIDE_TOPICS: Record<string, ShopTopicId[]> = {
  "01-ipyang-jun-junbi": ["hygiene", "tower", "feed"],
  "02-cheot-ilgong": ["tower", "hygiene"],
  "03-saryo-yeongyang": ["feed", "treats"],
  "04-hwajangsil": ["litter", "hygiene"],
  "05-geongang": ["feed"],
  "07-grooming": ["grooming"],
  "08-body-language": ["toys"],
  "09-munje-haengdong": ["tower", "toys"],
  "10-nori-hwan-gyeong": ["toys", "tower"],
  "11-saeng-ae": ["feed", "grooming"],
  "12-yongpum": ["hygiene", "tower", "feed"],
  "13-damyo": ["hygiene", "tower"],
  "17-jeolyak-diy-tip": ["toys", "hygiene"],
};

const CATEGORY_TOPICS: Record<string, ShopTopicId[]> = {
  start: ["hygiene", "tower"],
  daily: ["feed", "hygiene"],
  health: ["feed"],
  behavior: ["toys", "tower"],
  environment: ["toys", "tower"],
  products: ["hygiene", "tower", "feed"],
};

export function shopUrl() {
  return SHOP.url;
}

export function getRelatedShopTopics(slug: string, category?: string): ShopTopic[] {
  const ids = GUIDE_TOPICS[slug] ?? (category ? CATEGORY_TOPICS[category] : undefined);
  if (!ids || ids.length === 0) return [DEFAULT_RELATED];
  return ids.map((id) => SHOP_TOPICS[id]);
}
