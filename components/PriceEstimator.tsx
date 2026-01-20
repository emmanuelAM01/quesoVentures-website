"use client";

import React, { useMemo, useState } from "react";

type ServiceKey = 
  | "basic-website" 
  | "ecommerce" 
  | "blog-content" 
  | "booking-site"
  | "app-mvp" 
  | "internal-tool";

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function panel() {
  return "rounded-2xl border border-black/10 bg-white/70 p-5 backdrop-blur dark:border-white/10 dark:bg-white/5";
}

function checkbox(checked: boolean) {
  return [
    "flex h-5 w-5 items-center justify-center rounded border transition",
    checked
      ? "border-black bg-black dark:border-white dark:bg-white"
      : "border-black/20 bg-white dark:border-white/20 dark:bg-transparent",
  ].join(" ");
}

export default function PriceEstimator() {
  const [service, setService] = useState<ServiceKey | null>(null);
  
  // Common options
  const [pages, setPages] = useState(3);
  const [hosting, setHosting] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  
  // Service-specific
  const [ecommerce, setEcommerce] = useState(false);
  const [chatbot, setChatbot] = useState(false);
  
  // Internal tool
  const [customUseCase, setCustomUseCase] = useState("");

  // Calculate price
  const estimate = useMemo(() => {
    if (!service) return null;

    let basePrice = 0;
    let rangeLow = 0;
    let rangeHigh = 0;
    let isRange = false;
    let description = "";
    let includes: string[] = [];

    // BASIC WEBSITE
    if (service === "basic-website") {
      basePrice = 2000;
      
      // Page pricing: first 3 included, 4-6 are $200 each, 7+ are $350 each
      if (pages > 3 && pages <= 6) {
        basePrice += (pages - 3) * 200;
      } else if (pages > 6) {
        basePrice += (3 * 200) + ((pages - 6) * 350);
      }
      
      description = "A professional website that makes your business look legitimate";
      includes = [
        `${pages} page${pages > 1 ? 's' : ''}`,
        "Mobile friendly",
        "Contact form",
        "Deployed and live",
        "30 day support"
      ];
    }

    // E-COMMERCE SITE
    if (service === "ecommerce") {
      rangeLow = 4000;
      rangeHigh = 8000;
      isRange = true;
      
      if (chatbot) {
        rangeLow += 1500;
        rangeHigh += 2500;
      }
      
      description = "Online store with shopping cart and payments";
      includes = [
        "Product catalog",
        "Shopping cart",
        "Payment processing (Stripe)",
        "Order management",
        "Mobile friendly"
      ];
      if (chatbot) includes.push("Customer service chatbot");
    }

    // BLOG / CONTENT SITE
    if (service === "blog-content") {
      rangeLow = 3500;
      rangeHigh = 6000;
      isRange = true;
      
      description = "Content-focused website with blog and SEO";
      includes = [
        "Blog system (easy to update)",
        "SEO setup",
        "Multiple pages",
        "Search functionality",
        "Social sharing"
      ];
    }

    // BOOKING / APPOINTMENT SITE
    if (service === "booking-site") {
      rangeLow = 3500;
      rangeHigh = 7000;
      isRange = true;
      
      if (ecommerce) {
        rangeLow += 1500;
        rangeHigh += 2500;
      }
      
      description = "Let customers book appointments or reserve services online";
      includes = [
        "Calendar booking system",
        "Email confirmations",
        "Payment collection",
        "Customer management"
      ];
      if (ecommerce) includes.push("Product sales");
    }

    // APP / MVP
    if (service === "app-mvp") {
      rangeLow = 4000;
      rangeHigh = 8000;
      isRange = true;
      
      description = "Turn your idea into something you can show people and test";
      includes = [
        "Working demo you can click through",
        "User accounts (optional)",
        "Basic database",
        "Hosted online",
        "Screen record friendly"
      ];
    }

    // INTERNAL TOOL
    if (service === "internal-tool") {
      // This will show examples, not calculate
      return {
        isExample: true,
        examples: [
          { name: "WhatsApp customer service bot", price: 8000 },
          { name: "Admin dashboard for orders", price: 12000 },
          { name: "Document upload and parsing system", price: 10000 },
          { name: "CRM for client tracking", price: 14000 },
        ],
        customUseCase,
      };
    }

    // Add hosting and maintenance
    const monthlyHosting = hosting ? 50 : 0;
    const monthlyMaintenance = maintenance ? 100 : 0;
    const monthlyTotal = monthlyHosting + monthlyMaintenance;

    return {
      isExample: false,
      basePrice,
      rangeLow,
      rangeHigh,
      isRange,
      description,
      includes,
      monthlyTotal,
      monthlyHosting,
      monthlyMaintenance,
    };
  }, [service, pages, hosting, maintenance, ecommerce, chatbot, customUseCase]);

  const showOptions = service && service !== "internal-tool";

  return (
    <section id="pricing-estimator" className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
      <h2 className="text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
        Get an estimate
      </h2>
      <p className="mt-3 max-w-2xl text-base text-black/70 dark:text-white/70">
        Pick what you need and see pricing instantly
      </p>
    </div>
      <div className="mt-8">
        {/* Service selection - centered when no service selected */}
        <div className={[
          "transition-all duration-500 ease-in-out",
          !service ? "mx-auto max-w-3xl" : "grid gap-6 lg:grid-cols-12"
        ].join(" ")}>
          
          {/* LEFT SIDE - Service Selection */}
          <div className={[
            "transition-all duration-500 ease-in-out",
            !service ? "" : "lg:col-span-7"
          ].join(" ")}>
            <div className={panel()}>
              <div className="text-sm font-semibold text-black dark:text-white">What do you need?</div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  className={[
                    "rounded-xl border p-4 text-left transition-all duration-300",
                    service === "basic-website"
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20",
                  ].join(" ")}
                  onClick={() => setService("basic-website")}
                  type="button"
                >
                  <div className="font-semibold">Basic Website</div>
                  <div className="mt-1 text-sm opacity-70">What people expect your business to have</div>
                </button>

                <button
                  className={[
                    "rounded-xl border p-4 text-left transition-all duration-300",
                    service === "ecommerce"
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20",
                  ].join(" ")}
                  onClick={() => setService("ecommerce")}
                  type="button"
                >
                  <div className="font-semibold">Online Store</div>
                  <div className="mt-1 text-sm opacity-70">Sell products with shopping cart</div>
                </button>

                <button
                  className={[
                    "rounded-xl border p-4 text-left transition-all duration-300",
                    service === "blog-content"
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20",
                  ].join(" ")}
                  onClick={() => setService("blog-content")}
                  type="button"
                >
                  <div className="font-semibold">Blog / Content Site</div>
                  <div className="mt-1 text-sm opacity-70">Regular updates, articles, SEO</div>
                </button>

                <button
                  className={[
                    "rounded-xl border p-4 text-left transition-all duration-300",
                    service === "booking-site"
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20",
                  ].join(" ")}
                  onClick={() => setService("booking-site")}
                  type="button"
                >
                  <div className="font-semibold">Booking Site</div>
                  <div className="mt-1 text-sm opacity-70">Appointments, reservations, calendar</div>
                </button>

                <button
                  className={[
                    "rounded-xl border p-4 text-left transition-all duration-300",
                    service === "app-mvp"
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20",
                  ].join(" ")}
                  onClick={() => setService("app-mvp")}
                  type="button"
                >
                  <div className="font-semibold">App or MVP</div>
                  <div className="mt-1 text-sm opacity-70">Test your idea before going all in</div>
                </button>

                <button
                  className={[
                    "rounded-xl border p-4 text-left transition-all duration-300",
                    service === "internal-tool"
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                      : "border-black/10 bg-white hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20",
                  ].join(" ")}
                  onClick={() => setService("internal-tool")}
                  type="button"
                >
                  <div className="font-semibold">Internal Tool</div>
                  <div className="mt-1 text-sm opacity-70">Automate workflows, save time</div>
                </button>

                {/* Full-width "Don't see what you need?" option */}
                <button
                  className="sm:col-span-2 rounded-xl border border-dashed border-black/20 bg-white/50 p-4 text-center transition-all duration-300 hover:border-black/40 hover:bg-white/80 dark:border-white/20 dark:bg-white/5 dark:hover:border-white/40 dark:hover:bg-white/10"
                  onClick={() => {
                    // TODO: Open contact popup
                    console.log("Opening contact popup...");
                  }}
                  type="button"
                >
                  <div className="font-semibold text-black dark:text-white">Don't see what you need?</div>
                  <div className="mt-1 text-sm text-black/70 dark:text-white/70">Tell me about your project</div>
                </button>
              </div>
              

              {/* OPTIONS SECTION */}
              {showOptions && (
                <div className="mt-6 animate-fadeIn border-t border-black/10 pt-6 dark:border-white/10">
                  <div className="text-sm font-semibold text-black dark:text-white">Customize</div>

                  <div className="mt-4 space-y-4">
                    {/* Pages slider for basic website */}
                    {service === "basic-website" && (
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-black/80 dark:text-white/80">Number of pages</div>
                          <div className="text-sm font-semibold text-black dark:text-white">{pages}</div>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={pages}
                          onChange={(e) => setPages(parseInt(e.target.value))}
                          className="mt-2 h-2 w-full appearance-none rounded-full bg-black/10 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black dark:bg-white/10 dark:[&::-webkit-slider-thumb]:bg-white"
                        />
                        <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                          First 3 included. Pages 4-6 are $200 each, 7+ are $350 each
                        </div>
                      </div>
                    )}

                    {/* Chatbot option for ecommerce */}
                    {service === "ecommerce" && (
                      <label className="flex cursor-pointer items-start gap-3">
                        <div className={checkbox(chatbot)}>
                          {chatbot && (
                            <svg className="h-3 w-3 text-white dark:text-black" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-black dark:text-white">Customer service chatbot</div>
                          <div className="text-xs text-black/60 dark:text-white/60">Answer common questions automatically</div>
                        </div>
                        <input type="checkbox" className="sr-only" checked={chatbot} onChange={(e) => setChatbot(e.target.checked)} />
                      </label>
                    )}

                    {/* Ecommerce option for booking */}
                    {service === "booking-site" && (
                      <label className="flex cursor-pointer items-start gap-3">
                        <div className={checkbox(ecommerce)}>
                          {ecommerce && (
                            <svg className="h-3 w-3 text-white dark:text-black" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-black dark:text-white">Also sell products</div>
                          <div className="text-xs text-black/60 dark:text-white/60">Combine bookings with product sales</div>
                        </div>
                        <input type="checkbox" className="sr-only" checked={ecommerce} onChange={(e) => setEcommerce(e.target.checked)} />
                      </label>
                    )}

                    {/* Common options for all except internal */}
                    <div className="space-y-3 border-t border-black/10 pt-4 dark:border-white/10">
                      <label className="flex cursor-pointer items-start gap-3">
                        <div className={checkbox(hosting)}>
                          {hosting && (
                            <svg className="h-3 w-3 text-white dark:text-black" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-black dark:text-white">I manage hosting ($50/month)</div>
                          <div className="text-xs text-black/60 dark:text-white/60">Otherwise you own and control it</div>
                        </div>
                        <input type="checkbox" className="sr-only" checked={hosting} onChange={(e) => setHosting(e.target.checked)} />
                      </label>

                      <label className="flex cursor-pointer items-start gap-3">
                        <div className={checkbox(maintenance)}>
                          {maintenance && (
                            <svg className="h-3 w-3 text-white dark:text-black" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-black dark:text-white">Maintenance ($100/month)</div>
                          <div className="text-xs text-black/60 dark:text-white/60">2 text changes, uptime monitoring. First 30 days free</div>
                        </div>
                        <input type="checkbox" className="sr-only" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Internal tool section */}
              {service === "internal-tool" && (
                <div className="mt-6 animate-fadeIn border-t border-black/10 pt-6 dark:border-white/10">
                  <div className="mb-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1 text-sm text-blue-900 dark:text-blue-100">
                        <strong>Tell me what you need below.</strong> I'll review your workflow and give you an accurate quote. The examples on the right are just for reference.
                      </div>
                    </div>
                  </div>

                  <div className="text-sm font-semibold text-black dark:text-white">Describe your workflow</div>
                  <textarea
                    className="mt-3 w-full rounded-xl border border-black/10 bg-white/70 p-3 text-sm text-black outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/30 dark:focus:ring-white/5"
                    rows={5}
                    placeholder="Example: I need a tool that lets my team upload invoices, extract data automatically, and update our Google Sheet. Right now we do this manually and it takes 2 hours per day..."
                    value={customUseCase}
                    onChange={(e) => setCustomUseCase(e.target.value)}
                  />
                  <div className="mt-2 text-xs text-black/60 dark:text-white/60">
                    No technical terms needed. Just describe the manual work you want to eliminate.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Pricing Display - slides in when service is selected */}
          {service && (
            <div className={[
              "lg:col-span-5",
              "animate-slideInRight"
            ].join(" ")}>
              <div className={panel()}>
                {estimate?.isExample ? (
                  // Internal tool examples
                  <div>
                    <div className="text-sm font-semibold text-black dark:text-white">Example projects & pricing</div>
                    <div className="mt-4 space-y-3">
                      {estimate.examples.map((ex) => (
                        <div
                          key={ex.name}
                          className="flex items-center justify-between rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5"
                        >
                          <div className="text-sm text-black dark:text-white">{ex.name}</div>
                          <div className="text-sm font-semibold text-black dark:text-white">{money(ex.price)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-xl border border-black/10 bg-white/60 p-4 text-sm text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                      These are just examples. Your actual price depends on complexity, integrations, and data requirements.
                    </div>

                    <div className="mt-6 rounded-2xl border border-black/10 bg-black p-5 text-white dark:border-white/10 dark:bg-white dark:text-black">
                      <div className="text-sm font-semibold">Ready to get a quote?</div>
                      <div className="mt-2 text-sm opacity-90">
                        Describe your workflow on the left and I'll give you accurate pricing.
                      </div>
                      <div className="mt-4">
                        <a
                          href="#contact"
                          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90 dark:bg-black dark:text-white"
                        >
                          Contact me
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular pricing display
                  <div>
                    <div className="text-sm font-semibold text-black dark:text-white">Your estimate</div>

                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
                      <div className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                        One-time cost
                      </div>
                      <div className="mt-2 text-3xl font-semibold tracking-tight text-black dark:text-white">
                        {estimate.isRange 
                          ? `${money(estimate.rangeLow)} - ${money(estimate.rangeHigh)}`
                          : money(estimate.basePrice)}
                      </div>

                      {estimate.monthlyTotal > 0 && (
                        <>
                          <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 text-sm dark:border-white/10">
                            <span className="text-black/70 dark:text-white/70">Monthly</span>
                            <span className="font-semibold text-black dark:text-white">
                              {money(estimate.monthlyTotal)}/mo
                            </span>
                          </div>
                          <div className="mt-1 text-xs text-black/60 dark:text-white/60">
                            {estimate.monthlyHosting > 0 && `Hosting $${estimate.monthlyHosting}/mo`}
                            {estimate.monthlyHosting > 0 && estimate.monthlyMaintenance > 0 && " + "}
                            {estimate.monthlyMaintenance > 0 && `Maintenance $${estimate.monthlyMaintenance}/mo`}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-5 rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="text-xs font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
                        What's included
                      </div>
                      <div className="mt-3 space-y-2">
                        {estimate.includes.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-black dark:text-white" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                            </svg>
                            <div className="text-sm text-black/70 dark:text-white/70">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {estimate.description && (
                      <div className="mt-5 rounded-xl border border-black/10 bg-white/60 p-4 text-sm text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                        {estimate.description}
                      </div>
                    )}

                    {estimate.isRange && (
                      <div className="mt-5 rounded-xl border border-black/10 bg-white/60 p-4 text-sm text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                        This is a range. Final quote after a short call to understand your exact needs.
                      </div>
                    )}

                    <div className="mt-6 rounded-2xl border border-black/10 bg-black p-5 text-white dark:border-white/10 dark:bg-white dark:text-black">
                      <div className="text-sm font-semibold">Get an exact quote</div>
                      <div className="mt-2 text-sm opacity-90">
                        Send me what you need and I'll confirm pricing and timeline.
                      </div>
                      <div className="mt-4">
                        <a
                          href="#contact"
                          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90 dark:bg-black dark:text-white"
                        >
                          Contact me
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}