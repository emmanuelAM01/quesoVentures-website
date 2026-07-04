import type { Metadata } from "next";
import { LegalPage } from "components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Queso Ventures",
  description:
    "Terms of use for Queso Ventures LLC's website and SMS loyalty/notification programs.",
  alternates: { canonical: "https://quesoventures.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" effectiveDate="July 4, 2026">
      <section>
        <h2>1. Acceptance of terms</h2>
        <p>
          By using a website built by Queso Ventures LLC (&quot;Queso
          Ventures,&quot; &quot;we,&quot; &quot;us&quot;) or enrolling in an
          SMS loyalty/notification program we operate, you agree to these
          Terms & Conditions.
        </p>
      </section>

      <section>
        <h2>2. What we do</h2>
        <p>
          Queso Ventures builds and operates websites for local businesses,
          and, for clients who want it, an SMS loyalty/rewards or
          notification program that runs on our infrastructure but is
          branded around that business. When you interact with one of these
          sites or programs, these Terms apply.
        </p>
      </section>

      <section>
        <h2>3. SMS loyalty / notification program terms</h2>
        <p>
          This section covers any SMS-based loyalty, rewards, or
          notification program we operate on behalf of a business (a
          &quot;Program&quot;).
        </p>
        <ul>
          <li>
            <strong>How you join</strong> — you enroll by submitting your
            own mobile number on a Program&apos;s sign-up page and confirming
            you want to receive texts. Don&apos;t sign up a number that
            isn&apos;t yours.
          </li>
          <li>
            <strong>What you&apos;ll get texted</strong> — an enrollment
            confirmation, then messages tied to your activity: visit/progress
            updates, a message when you&apos;ve earned a reward, and a
            confirmation when you redeem one.
          </li>
          <li>
            <strong>Message and data rates may apply.</strong> Frequency
            depends on how often you visit — there&apos;s no fixed schedule
            of unrelated marketing texts.
          </li>
          <li>
            <strong>Quit anytime</strong> — reply <strong>STOP</strong> to
            any message and you&apos;re out immediately, no confirmation call,
            no fee, no hoops. You&apos;ll get one text confirming you&apos;ve
            been unsubscribed and nothing after that. Reply{" "}
            <strong>HELP</strong> for support.
          </li>
          <li>
            Carriers (AT&amp;T, Verizon, T-Mobile, etc.) aren&apos;t
            responsible for delayed or undelivered messages — that&apos;s
            outside our control and theirs.
          </li>
          <li>
            Reward value, eligibility, and what counts as a &quot;visit&quot;
            are set by the business running the Program and can change; the
            business, not Queso Ventures, is who honors the reward.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Your responsibilities</h2>
        <p>
          Use the sites and Programs honestly — don&apos;t try to break
          things, spoof someone else&apos;s phone number, or abuse a rewards
          program (e.g., fake visits).
        </p>
      </section>

      <section>
        <h2>5. No guarantees</h2>
        <p>
          Everything here is provided as-is. We do our best to keep sites and
          Programs running smoothly, but we can&apos;t promise zero downtime
          or guarantee a specific reward will always be available, and we
          aren&apos;t liable for indirect or incidental damages from using
          these services.
        </p>
      </section>

      <section>
        <h2>6. Governing law</h2>
        <p>These Terms are governed by the laws of the State of Texas.</p>
      </section>

      <section>
        <h2>7. Changes to these terms</h2>
        <p>
          If we make a meaningful change to these Terms — especially
          anything affecting an SMS Program — we&apos;ll update the date at
          the top of this page, and for Program changes, we&apos;ll let
          enrolled numbers know by text.
        </p>
      </section>

      <section>
        <h2>8. Contact us</h2>
        <p>
          Questions about these Terms or a specific Program? Email{" "}
          <a href="mailto:hello@quesoventures.com">hello@quesoventures.com</a>.
          See also our <a href="/privacy">Privacy Policy</a>.
        </p>
      </section>
    </LegalPage>
  );
}
