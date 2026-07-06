import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl tracking-tight text-lightText dark:text-darkText mb-6 text-balance">
          Your next customer is searching right now.
        </h1>

        <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted mb-10 font-light text-balance">
          I make sure they find you — on Google, Maps, and AI search.
          Everything handled for{" "}
          <span className="font-medium text-lightText dark:text-darkText">
            $300 a month
          </span>
          .
        </p>

        <div className="flex justify-center">
          <Link
            href="#free-audit"
            className="
              bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover
              text-lightBG dark:text-darkBG
              px-8 py-4
              rounded-xl
              text-lg font-semibold
              transition-colors
            "
          >
            See What Your Website Could Look Like
          </Link>
        </div>

        <p className="mt-6 text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
          Web design &amp; local search · Based in Houston, TX
        </p>
      </div>
    </section>
  );
}
