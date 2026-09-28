import Footer from "components/Footer";
import { houseGradient } from "components/livery";

export function LegalPage({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <main>
        {/*
          A title page rather than a full screen cover: the house type, the
          house rule, the date as the line under it.
        */}
        <section className="container mx-auto px-4 pt-28 pb-16 max-w-3xl sm:pt-36">
          <h1 className="text-5xl sm:text-6xl font-light leading-[1.02] tracking-tight text-lightText dark:text-darkText">
            {title}
          </h1>
          <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
          <p className="mt-8 text-lg font-light text-lightTextMuted dark:text-darkTextMuted">
            Last updated: {effectiveDate}
          </p>
        </section>

        <section className="container mx-auto px-4 pb-24 max-w-3xl">
          <div className="prose-legal space-y-10 text-lg leading-relaxed text-lightTextMuted dark:text-darkTextMuted font-light [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-light [&_h2]:tracking-tight [&_h2]:text-lightText [&_h2]:dark:text-darkText [&_h2]:mb-3 [&_h2]:font-sans [&_strong]:text-lightText [&_strong]:dark:text-darkText [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-lightAccent [&_a]:dark:text-darkAccent [&_a]:underline">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
