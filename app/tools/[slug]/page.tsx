import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "components/Footer";
import { PRODUCTS, productBySlug } from "components/catalog";
import { BUSINESS } from "components/businessInfo";
import {
  GoesWellWith,
  ReadyWhenYouAre,
  ToolHero,
  ToolQuestions,
  WhatYouGet,
  toolJsonLd,
} from "components/tools/ToolPage";

/**
 * Every tool's page, from the catalogue. The website and the Queso Revenue
 * System have pages of their own (static routes beside this one win).
 */
const OWN_PAGE = new Set(["website", "queso-revenue-system"]);

export function generateStaticParams() {
  return PRODUCTS.filter((p) => !OWN_PAGE.has(p.slug)).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = productBySlug(params.slug);
  if (!p) return {};
  const url = `${BUSINESS.url}/tools/${p.slug}`;
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: p.seoTitle, description: p.seoDescription, url, siteName: BUSINESS.name, type: "website" },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const product = productBySlug(params.slug);
  if (!product || OWN_PAGE.has(params.slug)) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-lightBG dark:bg-darkBG">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd(product)) }} />
      <main>
        <ToolHero product={product} />
        <WhatYouGet product={product} />
        <ToolQuestions product={product} />
        <GoesWellWith product={product} />
        <ReadyWhenYouAre product={product} />
      </main>
      <Footer />
    </div>
  );
}
