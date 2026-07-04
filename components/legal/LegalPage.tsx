import Header from "components/Header";
import Footer from "components/Footer";

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
      <Header />
      <main>
        <section className="container mx-auto px-4 pt-20 pb-6 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl text-lightText dark:text-darkText mb-2 tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-lightTextMuted dark:text-darkTextMuted">
            Last updated: {effectiveDate}
          </p>
        </section>

        <section className="container mx-auto px-4 pb-24 max-w-3xl">
          <div className="prose-legal space-y-8 text-base text-lightTextMuted dark:text-darkTextMuted font-light [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-semibold [&_h2]:text-lightText [&_h2]:dark:text-darkText [&_h2]:mb-3 [&_h2]:font-sans [&_strong]:text-lightText [&_strong]:dark:text-darkText [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-lightAccent [&_a]:dark:text-darkAccent [&_a]:underline">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
