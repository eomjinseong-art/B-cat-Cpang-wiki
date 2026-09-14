import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const title = "냥백과 — 고양이 키우기의 모든 것";
const description =
  "입양 준비부터 바디랭귀지, 응급 대응, 용품 고르는 법까지. 고양이와 더 행복하게 지내는 법을 담은 양육 백과입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s — 냥백과",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "냥백과",
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "냥백과",
  url: SITE_URL,
  description,
  inLanguage: "ko",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-[var(--paper)] text-[var(--ink)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        {children}
        <div className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6">
          <AdSlot variant="banner" />
        </div>
        <Footer />
      </body>
    </html>
  );
}