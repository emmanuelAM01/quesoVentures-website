import type { Metadata } from "next";
import GuideHeader from "components/guide/GuideHeader";
import FreeAudit from "components/FreeAudit";
import LiveryCard from "components/LiveryCard";
import StatementCopy from "components/StatementCopy";
import Reveal from "components/Reveal";
import { liveryAt, PAINT } from "components/livery";
import { SITE_URL } from "lib/guide/queries";
import { guideTrail, GUIDE_NAME } from "lib/guide/jsonld";

const TITLE = `How businesses are chosen | ${GUIDE_NAME}`;
const DESCRIPTION =
  "How businesses end up in The Queso Guide, and what it means when an entry says a business is a Queso Member.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guide/standards` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/guide/standards`, type: "website" },
};

// TODO(Emmanuel): placeholder copy. Everything below restates only what the
// guide already does in code: entries follow a visit, are listed by date, and
// end with the membership line. Edit freely, and do not add a policy here that
// the guide does not actually follow.

const STATEMENT =
  "The guide is a record of local places worth knowing. Every entry follows a visit, every entry is dated, and every entry ends by saying whether the business is a Queso Ventures client.";

const PRINCIPLES = [
  {
    title: "Every entry is a visit",
    body: "Each entry is written after a visit, and the month of that visit is printed at the top. It covers who runs the business, what to get, and what is practical to know before you go.",
  },
  {
    title: "A collection, not a ranking",
    body: "Entries are listed in the order they were published. Nothing in the guide is numbered or sorted by how good we think it is.",
  },
  {
    title: "Membership is disclosed",
    body: "Queso Ventures builds websites and handles search for local businesses. A Queso Member is a business that is a client. The end of every entry says which it is.",
  },
  {
    title: "Kept current",
    body: "Hours and details change, so every entry shows the date it was last updated.",
  },
];

export default function Standards() {
  return (
    <>
      <GuideHeader
        title="How businesses are chosen"
        intro="What gets a business into The Queso Guide, and what we tell you about each one."
        trail={[...guideTrail(), { name: "Standards", path: "/guide/standards" }]}
        tall
      />

      <section className="container mx-auto px-4 py-20 sm:py-28">
        <StatementCopy text={STATEMENT} paint={PAINT.rossoCorsa} className="mx-auto max-w-4xl" />
      </section>

      <section id="rules" className="scroll-mt-20 border-y border-lightBorder bg-bandLight dark:border-darkBorder dark:bg-bandDark">
        <div className="container mx-auto px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-3xl tracking-tight text-lightText dark:text-darkText sm:text-4xl md:text-5xl">
              The four rules
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <LiveryCard title={p.title} body={p.body} paint={liveryAt(i)} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FreeAudit
        copy={{
          heading: "Know a place that belongs here?",
          sub: "Tell us about a local business worth a visit, yours included.",
          cta: "Suggest a Business",
          ctaPrefill: "I'd like to suggest a business for The Queso Guide: ",
          reassurance: "It comes straight to me.",
        }}
      />
    </>
  );
}
