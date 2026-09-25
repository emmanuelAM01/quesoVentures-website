import type { Metadata } from "next";
import Link from "next/link";
import GuideHeader from "components/guide/GuideHeader";
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
// guide already does in code. Edit freely, and do not add a policy here that
// the guide does not actually follow.
export default function Standards() {
  return (
    <>
      <GuideHeader
        title="How businesses are chosen"
        intro="What gets a business into The Queso Guide, and what we tell you about each one."
        trail={[...guideTrail(), { name: "Standards", path: "/guide/standards" }]}
      />
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-12 text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
          <div>
            <h2 className={H2}>Every entry is a visit</h2>
            <p>
              Each entry is written after a visit, and the month of that visit is printed at the top.
              We write about who runs the business, what to get, and what is practical to know before you go.
            </p>
          </div>
          <div>
            <h2 className={H2}>It is a collection, not a ranking</h2>
            <p>
              Entries are listed in the order they were published. Nothing in the guide is numbered or
              sorted by how good we think it is.
            </p>
          </div>
          <div>
            <h2 className={H2}>What &ldquo;Queso Member&rdquo; means</h2>
            <p>
              Queso Ventures builds websites and handles search for local businesses. A Queso Member is a
              business that is a Queso Ventures client. Some businesses in the guide are members and some
              are not, and the end of every entry says which.
            </p>
          </div>
          <div>
            <h2 className={H2}>Keeping it current</h2>
            <p>
              Hours and details change. Every entry shows the date it was last updated. If something is
              out of date,{" "}
              <Link href="/contact" className="font-medium text-lightAccent underline underline-offset-4 dark:text-darkAccent">
                tell us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

const H2 = "mb-3 text-2xl font-semibold tracking-tight text-lightText dark:text-darkText";
