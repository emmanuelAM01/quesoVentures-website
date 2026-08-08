import Reveal from "./Reveal";
import { liveryAt } from "./livery";
import Glow from "./Glow";

const steps = [
  {
    title: "Reach out",
    body: "Send a quick message or book a call. Just tell us about your business.",
  },
  {
    title: "See your preview",
    body: "We build what your business could look like online. Free, before you decide anything.",
  },
  {
    title: "Get found",
    body: "Love it? We launch. Then we keep you climbing on Google, Maps, and AI search every month.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="container mx-auto px-4 py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-3">
            Getting started is easy
          </h2>
          <p className="text-lg sm:text-xl text-lightTextMuted dark:text-darkTextMuted font-light">
            Three steps. No pressure at any of them.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 120}>
              <Glow color={liveryAt(i + 3).hex} radius="rounded-3xl" lift={false}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark">
                  <span
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ backgroundColor: liveryAt(i + 3).hex }}
                  />
                  <div className="p-8 pt-10">
                  <p
                    className="text-5xl font-semibold mb-5"
                    style={{ color: liveryAt(i + 3).ink }}
                  >
                    {i + 1}
                  </p>
                  <h3 className="text-xl font-semibold text-lightText dark:text-darkText mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                    {step.body}
                  </p>
                  </div>
                </div>
              </Glow>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
