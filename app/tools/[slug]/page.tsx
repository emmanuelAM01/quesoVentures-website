import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "components/Footer";
import { PRODUCTS, hasFullPage, productBySlug } from "components/catalog";
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
 * The tools that keep a full page from the shared template. Today that is
 * Customer Loyalty alone, unchanged: it is the page Telnyx reviews for the
 * text program. The website and the Queso Revenue System have pages of their
 * own (static routes beside this one win).
 *
 * Every other tool has no page. Its address redirects to the home page with
 * the tool open in the Get Started panel (see redirects in next.config.js).
 */
const OWN_ROUTE = new Set(["website", "queso-revenue-system"]);
const HERE = PRODUCTS.filter((p) => hasFullPage(p) && !OWN_ROUTE.has(p.slug));

export function generateStaticParams() {
  return HERE.map((p) => ({ slug: p.slug }));
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
  const product = HERE.find((p) => p.slug === params.slug);
  if (!product) notFound();

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
