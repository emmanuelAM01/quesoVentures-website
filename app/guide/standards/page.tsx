import type { Metadata } from "next";
import GuideHeader from "components/guide/GuideHeader";
import FreeAudit from "components/FreeAudit";
import ChangeList from "components/ChangeList";
import StatementSection from "components/StatementSection";
import { SITE_URL } from "lib/guide/queries";
import { guideTrail, GUIDE_NAME } from "lib/guide/jsonld";

const TITLE = `How businesses are chosen | ${GUIDE_NAME}`;
const DESCRIPTION =
  "How a business gets into The Queso Guide, and what it means when an entry says Queso Member.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guide/standards` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/guide/standards`, type: "website" },
};

// Everything below restates only what the guide already does in code:
// entries follow a visit, are listed by date, and end with the membership
// line. Do not add a policy here that the guide does not actually follow.

const STATEMENT =
  "The guide is my list of local places worth knowing. I visit every one, I date every entry, and I tell you when a business is a Queso Ventures client.";

const PRINCIPLES = [
  {
    title: "Every entry is a visit",
    body: "I go before I write. The month I went is at the top, along with who runs it, what to get, and what is good to know before you go.",
  },
  {
    title: "No rankings",
    body: "Entries are listed in the order I publish them. Nothing is numbered, and nothing is sorted by how much I liked it.",
  },
  {
    title: "Clients are labeled",
    body: "Queso Ventures builds websites and gets local businesses found. A business that is a client is a Queso Member, and the bottom of its entry says so.",
  },
  {
    title: "Kept current",
    body: "Hours change. Every entry shows the date I last updated it.",
  },
];

export default function Standards() {
  return (
    <>
      <GuideHeader
        title="How businesses are chosen"
        intro="What it takes to get into The Queso Guide, and what I tell you about each place."
        trail={[...guideTrail(), { name: "Standards", path: "/guide/standards" }]}
        tall
      />

      <StatementSection text={STATEMENT} />

      <div id="rules" className="scroll-mt-20">
        <ChangeList heading="The four rules" items={PRINCIPLES} />
      </div>

      <FreeAudit
        copy={{
          heading: "Know a place that belongs here?",
          sub: "Tell me about a local spot worth the trip. Yours counts too.",
          cta: "Suggest a business",
          ctaPrefill: "I'd like to suggest a business for The Queso Guide: ",
          reassurance: "It comes straight to me.",
        }}
      />
    </>
  );
}
