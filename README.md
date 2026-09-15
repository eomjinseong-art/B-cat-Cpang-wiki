# 냥백과 — 고양이 양육 백과

고양이를 키우는 데 필요한 실전 지식을 마크다운으로 정리한 사이트입니다. 입양 준비부터 바디랭귀지, 응급 대응, 용품 고르는 법까지 **17편**의 가이드를 열람·검색할 수 있고, 사이트 곳곳에 고양이 용품 큐레이션 쇼핑몰 **숨숨마을** 광고가 연결되어 있습니다.

- **이럴 땐 이렇게**: 증상·상황별 당장 할 일
- **바디랭귀지**: 꼬리·귀·눈·소리가 의미하는 것
- 입양 준비, 사료, 화장실, 건강·응급, 용품 고르는 법까지 17편

글은 일반적인 정보이며 **수의사 진료를 대체하지 않습니다.**

## 로컬에서 보기

```bash
npm install
npm run dev
```

브라우저에서 [http://127.0.0.1:4327](http://127.0.0.1:4327) 을 엽니다.

## 배포 (GitHub + Vercel)

1. 이 저장소를 GitHub에 push합니다.
2. Vercel에서 **New Project → 이 저장소 Import**를 선택합니다.
   - Next.js를 자동으로 감지하므로 별도 빌드 설정이 필요 없습니다.
3. 배포 후 도메인이 정해지면 환경 변수 `NEXT_PUBLIC_SITE_URL`에 실제 주소를 넣어 주세요 (없으면 `https://b-cat-cpang-wiki.vercel.app`을 사용합니다).

## 글 추가·수정

`content/guides/`에 마크다운 파일을 넣고 상단에 `title`, `description`, `category`, `tags`, `order`, `readMinutes`를 적으면 목록에 자동으로 나타납니다. push만 하면 자동 배포됩니다.

## 숨숨마을 추천 수정

- 문구·관련 주제 매핑·링크: `src/lib/ads.ts` (항상 숨숨마을로만 연결합니다. 쿠팡 URL을 넣지 마세요.)
- 글 하단 관련 용품 카드: `src/components/ShopPromo.tsx`
- 본문 중간·페이지 하단 슬롯: `src/components/AdSlot.tsx`
- 노출 위치: 가이드 본문 뒤(관련 용품), 본문 중간(기존 1회), 홈·목록 하단 얇은 띠

추천 링크나 문구를 바꾸고 싶을 때는 `src/lib/ads.ts`만 수정하면 됩니다.

## 다운로드

사이트 안 **다운로드** 메뉴, 또는 아래 주소로 ZIP을 받을 수 있습니다.

- 마크다운 17편: `/api/download/guides` → `nyang-pedia-guides.zip`
- 사이트 소스코드: `/api/download/source` → `nyang-pedia-source.zip`
- 글 하나: `/api/download/md/<파일명>` 예: `/api/download/md/16-ileol-ttaen`

## 글 목록

| 파일 | 제목 |
| --- | --- |
| `01-ipyang-jun-junbi.md` | 입양 전 준비 체크리스트 |
| `02-cheot-ilgong.md` | 집에 온 첫 7일 |
| `03-saryo-yeongyang.md` | 사료와 영양, 물 |
| `04-hwajangsil.md` | 화장실과 모래 |
| `05-geongang.md` | 건강 신호와 흔한 질병 |
| `06-eunggeup-dokseong.md` | 응급처치와 독성 물질 |
| `07-grooming.md` | 그루밍, 발톱, 이빨, 목욕 |
| `08-body-language.md` | 고양이 바디랭귀지 사전 |
| `09-munje-haengdong.md` | 문제행동 해결 |
| `10-nori-hwan-gyeong.md` | 놀이와 환경 풍요화 |
| `11-saeng-ae.md` | 새끼부터 노묘까지, 중성화와 계절 |
| `12-yongpum.md` | 용품 구매 가이드 |
| `13-damyo.md` | 다묘 가정 |
| `14-anjeon-yeohaeng.md` | 집 안전과 이동·여행 |
| `15-sinhwa-faq.md` | 오해와 진실, 자주 묻는 질문 |
| `16-ileol-ttaen.md` | 이럴 땐 이렇게 |
| `17-jeolyak-diy-tip.md` | 저비용 필수템과 DIY 아이디어 |

파일 안의 `/guides/...` 링크는 이 사이트의 경로입니다. 다른 블로그에 올릴 때는 해당 글 URL로 바꿔 주세요.