import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center flex flex-col items-center justify-center mx-4 sm:mx-8 md:mx-16 lg:mx-24 min-h-screen">
      <h1 className="font-sans text-2xl tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-lightText dark:text-darkText mb-6">
        So, you found the QR code. I can help you grow your business.
      </h1>

      <p className="text-xl text-lightTextMuted dark:text-darkTextMuted mb-12 font-light max-w-2xl">
        I leave my stamps where I know I can help
      </p>

      <div className="flex justify-center">
        <Link
          href="/"
          className="
              bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:darkButtonHover
              text-lightBG dark:text-darkBG
              px-6 py-3
              rounded-xl
              text-base font-semibold
              transition-colors
            "
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
