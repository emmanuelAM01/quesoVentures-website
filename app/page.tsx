"use client" 
import Header from "components/Header";
import Hero from "components/Hero";
import Features from "components/Features";
import Section from "components/Section";
import Accordion from "components/Accordion";
import Footer from "components/Footer";
import PriceEstimator from "components/PriceEstimator";
import FreeAudit from "components/FreeAudit";

export default function Page() {

const faqItems = [
  {
    title: "How do you help Houston businesses get more leads?",
    content:
      "I audit your website, Google presence, and messaging, then fix what's holding you back. This includes local SEO improvements, site structure fixes, better content, and optimizing your Google Business Profile so more people find you, trust you, and contact you.",
  },
  {
    title: "What's the difference between SEO and AI search optimization (GEO)?",
    content:
      "SEO helps you rank on Google through keywords, backlinks, and site optimization. AI search optimization (GEO - Generative Engine Optimization) helps your business get mentioned when people ask ChatGPT, Perplexity, or Google's AI for recommendations. AI tools pull from your website content, reviews, and service pages, so I optimize these to make sure AI understands what you do and who you serve.",
  },
  {
    title: "Do I need a new website or can you improve what I have?",
    content:
      "Most of the time, we can improve what you have. If your current site is functional, we'll optimize it with better text content, faster loading, clearer structure, and stronger lead capture. A full rebuild is only necessary if your site is truly broken or impossible to update.",
  },
  {
    title: "How long does it take to see results?",
    content:
      "Quick wins like better messaging and conversion improvements can show up in weeks. Rankings and consistent organic leads build over 2-4 months. The goal is compounding growth, not a one-time spike. I focus on building a lead generation system that works for you long-term.",
  },
  {
    title: "Do you run paid ads or just give organic traction?",
    content:
      "I can help with paid ads, but my main focus is building organic lead flow from Google and AI search. The goal is to get you off the ad treadmill so you're not dependent on paying for every click forever.",
  },
  {
    title: "What types of businesses do you work with?",
    content:
      "Service businesses in Houston do best - med spas, clinics, law firms, contractors, local brands, cafes, restaurants, and concierge services. If you have a physical location or serve a local market, we're probably a good fit.",
  },
  {
    title: "What's included in the free Website Growth Audit?",
    content:
      "A review of your site structure, Google visibility, conversion blockers, page speed, and lead capture setup. You'll get a prioritized 30-day plan that shows exactly what to fix first to start getting more leads.",
  },
  {
    title: "How much does it cost?",
    content:
      "Pricing depends on scope. Most clients work with me on a monthly retainer so we can continuously improve rankings, traffic, and conversions over time. Book a free audit and I'll give you transparent pricing based on what your business actually needs.",
  },
];

  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <Header />
      <main>
        <Hero />
        <Features />
        <FreeAudit />
        <section className="container mx-auto px-4 py-16 bg-lightBG dark:bg-darkBG transition-colors">
          <div className="flex flex-col items-center text-center w-full">
            <div className="max-w-4xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-6">
                Common Questions About SEO and AI Search for Houston Businesses
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl font-light text-lightTextMuted dark:text-darkTextMuted">
                Everything you need to know about getting more leads from Google and AI search.
              </p>
            </div>

            <Accordion items={faqItems} />
            
            <div className="mt-10 text-center">
              <p className="text-base sm:text-lg text-lightTextMuted dark:text-darkTextMuted font-light mb-4">
                Still have questions?
              </p>
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("contact:prefill", { 
                    detail: { message: "I have a question about SEO/GEO for my Houston business:" } 
                  }));
                  window.dispatchEvent(new CustomEvent("modal:open", { 
                    detail: { id: "contact-popup" } 
                  }));
                }}
                className="inline-flex items-center justify-center rounded-xl border border-lightBorder dark:border-darkBorder px-6 py-3 text-base font-semibold text-lightText dark:text-darkText hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                Ask Me Directly
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}