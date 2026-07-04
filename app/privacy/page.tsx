import type { Metadata } from "next";
import { LegalPage } from "components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Queso Ventures",
  description:
    "How Queso Ventures LLC collects, uses, and protects information from our website and SMS loyalty programs.",
  alternates: { canonical: "https://quesoventures.com/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="July 4, 2026">
      <section>
        <h2>1. Who we are</h2>
        <p>
          Queso Ventures LLC (&quot;Queso Ventures,&quot; &quot;we,&quot;
          &quot;us&quot;) is a Houston, TX-based web design and marketing
          business. This Privacy Policy covers quesoventures.com, the
          websites we build and host for our clients, and any SMS loyalty or
          notification program we operate on a client&apos;s behalf
          (including pages on subdomains like{" "}
          <span className="whitespace-nowrap">loyalty.quesoventures.com</span>).
          It applies no matter which of those you interact with — the same
          protections apply throughout.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <p>We collect information directly from you, specifically:</p>
        <ul>
          <li>
            <strong>Contact and inquiry information</strong> — your name,
            email, phone number, and message when you submit a contact,
            quote, or booking form on a Queso Ventures-built website.
          </li>
          <li>
            <strong>Phone number and messaging activity for SMS programs</strong>{" "}
            — if you opt in to a loyalty or notification text program, we
            collect your mobile number, your enrollment date, your
            visit/reward progress, and a log of messages sent to you.
          </li>
        </ul>
        <p>
          We don&apos;t buy data about you from anyone else, and we don&apos;t
          collect more than what&apos;s listed above.
        </p>
      </section>

      <section>
        <h2>3. Text messaging (SMS) programs</h2>
        <ul>
          <li>
            We only text you if you opted in yourself, by submitting your
            phone number on an enrollment page.
          </li>
          <li>
            <strong>
              We never sell or share your phone number or opt-in status with
              other companies for their own marketing.
            </strong>{" "}
            It&apos;s used only to run the loyalty/notification program you
            joined.
          </li>
          <li>
            Message frequency depends on your activity — typically an
            enrollment confirmation, then a message per visit or reward
            earned. Message and data rates may apply.
          </li>
          <li>
            You can stop the messages whenever you want by replying{" "}
            <strong>STOP</strong> — you&apos;ll get one confirmation text and
            then nothing further. Reply <strong>HELP</strong> for help at any
            time. See our <a href="/terms">Terms &amp; Conditions</a> for the
            full program terms.
          </li>
          <li>
            We use Telnyx to deliver these messages. They see the phone
            number and message content only to route the text — they don&apos;t
            use it for anything else.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. How we use your information</h2>
        <ul>
          <li>To respond to messages you send us through a website form</li>
          <li>To run the loyalty/rewards program you signed up for</li>
          <li>To keep our sites and systems working and secure</li>
        </ul>
        <p>That&apos;s the whole list — we don&apos;t use your information for anything beyond running the service you interacted with.</p>
      </section>

      <section>
        <h2>5. Who we share it with</h2>
        <p>
          We don&apos;t sell your information, full stop. We use a small set
          of service providers to actually run things — database/hosting,
          email delivery, and Telnyx for SMS delivery — and they only ever
          see what they need to do that one job.
        </p>
      </section>

      <section>
        <h2>6. How long we keep it, and your control over it</h2>
        <p>
          We keep your information only as long as it&apos;s useful for the
          reason you gave it to us — for example, as long as you&apos;re
          enrolled in a loyalty program. You can ask us to delete your
          information or remove you from a program at any time, no questions
          asked, by replying STOP (for texts) or emailing{" "}
          <a href="mailto:hello@quesoventures.com">hello@quesoventures.com</a>.
          There&apos;s no cancellation fee, no fine print, and no obligation
          to keep using anything.
        </p>
      </section>

      <section>
        <h2>7. Security</h2>
        <p>
          We use reasonable, industry-standard measures (encrypted
          connections, access controls) to protect your information. No
          system is 100% unbreakable, but we take this seriously and only
          collect what we actually need in the first place.
        </p>
      </section>

      <section>
        <h2>8. Children&apos;s privacy</h2>
        <p>
          Our services are not directed to, and we do not knowingly collect
          information from, children under 13.
        </p>
      </section>

      <section>
        <h2>9. Changes to this policy</h2>
        <p>
          If this policy changes in a meaningful way, we&apos;ll update the
          date at the top of this page.
        </p>
      </section>

      <section>
        <h2>10. Contact us</h2>
        <p>
          Questions about this policy, your data, or an SMS program? Email{" "}
          <a href="mailto:hello@quesoventures.com">hello@quesoventures.com</a>{" "}
          — a real person (just one, actually) will get back to you.
        </p>
      </section>
    </LegalPage>
  );
}
