import Link from "next/link";
import SearchDemo from "./SearchDemo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 min-h-[88vh] flex items-center pt-24 pb-20">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Copy */}
          <div>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-lightText dark:text-darkText mb-6 text-balance">
              Your next customer is searching right now.
            </h1>

            <p className="max-w-xl text-lg sm:text-xl text-lightTextMuted dark:text-darkTextMuted mb-10 font-light">
              We make sure they find you on Google, Maps, and AI search.
              Everything handled for{" "}
              <span className="font-medium text-lightText dark:text-darkText">
                $300 a month
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href="#free-audit"
                className="
                  w-full sm:w-auto
                  inline-flex items-center justify-center
                  bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover
                  text-lightBG dark:text-darkBG
                  px-6 py-3.5 text-base
                  sm:px-8 sm:py-4 sm:text-lg
                  rounded-xl
                  font-semibold
                  transition-colors
                "
              >
                See What Your Website Could Look Like
              </Link>
              <Link
                href="#how"
                className="text-center sm:text-left text-base font-semibold text-lightText dark:text-darkText hover:opacity-70 transition-opacity"
              >
                How it works ↓
              </Link>
            </div>

            <p className="mt-6 text-sm font-light text-center sm:text-left text-lightTextMuted dark:text-darkTextMuted">
              Web design, SEO &amp; AI SEO · Houston, TX
            </p>
          </div>

          {/* Search demo */}
          <div className="lg:pl-6">
            <SearchDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
