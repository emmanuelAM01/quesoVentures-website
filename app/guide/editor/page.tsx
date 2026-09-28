import type { Metadata } from "next";
import Link from "next/link";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import GuideHeader from "components/guide/GuideHeader";
import { BUSINESS } from "components/businessInfo";
import { SITE_URL } from "lib/guide/queries";
import { guideTrail, GUIDE_NAME, ldJson } from "lib/guide/jsonld";

const TITLE = `Emmanuel, editor | ${GUIDE_NAME}`;
const DESCRIPTION = "Emmanuel writes The Queso Guide and runs Queso Ventures in Northeast Houston.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guide/editor` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/guide/editor`, type: "profile" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/guide/editor#person`,
    name: "Emmanuel",
    url: `${SITE_URL}/guide/editor`,
    jobTitle: "Editor, The Queso Guide",
    worksFor: { "@id": `${BUSINESS.url}/#organization`, "@type": "Organization", name: BUSINESS.name },
  },
};

// TODO(Emmanuel): placeholder bio. Replace with your own words, and add a photo
// and any profiles you want linked (they can go in `sameAs` above).
export default function Editor() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <GuideHeader
        title="Emmanuel"
        intro="I write The Queso Guide."
        trail={[...guideTrail(), { name: "Editor", path: "/guide/editor" }]}
      />
      <section className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl space-y-6 text-xl font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
          <p>
            I run Queso Ventures out of {BUSINESS.addressLine}. We build websites and help local
            businesses get found. Every entry in the guide is mine, and I have been to every place in it.
          </p>
          <p>Curious about the rest of what I do?</p>
          <Link href="/about" className={`${arrowTone("light")} pt-2`}>
            <ArrowMark label="Read about Queso Ventures" />
          </Link>
        </div>
      </section>
    </>
  );
}
