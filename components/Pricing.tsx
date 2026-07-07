import { FaCheck } from "react-icons/fa";
import Reveal from "./Reveal";
import NicheCtaButton from "./NicheCtaButton";

const included = [
  "Your website, built, hosted, and maintained",
  "Google and Maps presence that gets you found",
  "AI SEO, so ChatGPT and Siri recommend you",
  "Monthly updates and direct support, a text away",
  "No hourly billing, no surprise fees",
];

export default function Pricing() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8 sm:p-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-6">
                One plan. One price.
              </h2>
              <p className="text-6xl sm:text-7xl tracking-tight font-semibold text-lightText dark:text-darkText">
                $300
                <span className="text-xl sm:text-2xl font-light text-lightTextMuted dark:text-darkTextMuted">
                  {" "}
                  / month
                </span>
              </p>
              <p className="mt-4 text-base sm:text-lg font-light text-lightTextMuted dark:text-darkTextMuted">
                Agencies charge $1,500 or more, and most are not even touching
                AI SEO.
              </p>
              <div className="mt-8">
                <NicheCtaButton
                  message="I want to talk about getting my business found online. Here's my situation:"
                  label="Let's Talk First"
                />
              </div>
              <p className="mt-4 text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                No payment until we&apos;ve talked and you&apos;ve seen your
                preview. 4 month minimum.
              </p>
            </div>

            <ul className="space-y-4">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lightAccent/10 dark:bg-darkAccent/10 text-lightAccent dark:text-darkAccent">
                    <FaCheck size={11} />
                  </span>
                  <span className="text-base sm:text-lg font-light text-lightText dark:text-darkText">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
