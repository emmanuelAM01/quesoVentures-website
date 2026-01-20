import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center flex flex-col items-center justify-center mx-4 sm:mx-8 md:mx-16 lg:mx-24 min-h-screen">
      <h1 className="font-sans text-xl tracking-tighter sm:text-2xl md:text-3xl lg:text-5xl dark:text-white mb-6">
        Have any tech stuff you need done?
      </h1>
      <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 font-light">
        Websites and Apps built/fixed fast.
      </p>
      <div className="flex justify-center space-x-6">
        <Link
          href="anchor tab to PriceEstimator"
          className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-md text-base font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
