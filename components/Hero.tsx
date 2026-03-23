import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-lightText dark:text-darkText mb-6">
          More Clients Finding You on Google and AI Search
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted mb-12 font-light">
          Built for Houston Service Businesses.
        </p>

        <div className="flex justify-center">
          <Link
            href="#free-audit"
            className="
              bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover
              text-lightBG dark:text-darkBG
              px-6 py-3
              rounded-xl
              text-base font-semibold
              transition-colors
            "
          >
            Get a Free Visibility Check
          </Link>
        </div>
      </div>
    </section>
  );
}


