import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center flex flex-col items-center justify-center mx-4 sm:mx-8 md:mx-16 lg:mx-24 min-h-screen">
      <h1 className="font-sans text-3xl tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl dark:text-white mb-6">
        Your app ideas and website goals are within reach
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 font-light">
        The technical business partner you never had
      </p>
      <div className="flex justify-center space-x-6">
        <Link
          href="/get-started"
          className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-md text-base font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </Link>
        <Link
          href="https://github.com"
          className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-md text-base font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
        >
          Download
        </Link>
      </div>
    </section>
  );
}
