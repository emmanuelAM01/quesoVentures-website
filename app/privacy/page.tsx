import type { Metadata } from "next";
import { LegalPage } from "components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Queso Ventures",
  description:
    "How Queso Ventures LLC collects, uses, and protects information from our websites, SMS loyalty programs, and software, including bank data in the Queso Revenue System.",
  alternates: { canonical: "https://www.quesoventures.com/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="October 1, 2026">
      <section>
        <h2>1. Who we are</h2>
        <p>
          Queso Ventures LLC (&quot;Queso Ventures,&quot; &quot;we,&quot;
          &quot;us&quot;) is a Houston, TX-based web design and marketing
          business. This Privacy Policy covers quesoventures.com, the
          websites we build and host for our clients, the software we build
          and run under Queso Studios (including the Queso client portal and
          the Queso Revenue System (QRS) app), and any SMS loyalty or notification
          program we operate on a client&apos;s behalf (including pages on
          subdomains like{" "}
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
          <li>
            <strong>Bank data for QRS users</strong> — see{" "}
            <a href="#qrs">section 4</a>.
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
            In addition to transactional loyalty notifications (such as visit
            confirmations and reward alerts), enrolled customers may
            periodically receive promotional messages and re-engagement
            reminders — for example, a check-in message after a period of
            inactivity. Message frequency varies. All messages include
            opt-out instructions, and customers may reply STOP at any time to
            unsubscribe.
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

      {/* Linked from /studios/qrs, and what Plaid reviews. Keep it true to the code. */}
      <section id="qrs" className="scroll-mt-28 space-y-4">
        <h2>4. Queso Revenue System (QRS)</h2>
        <p>
          QRS is a tool that connects to your business bank accounts and cards
          so you can see what came in, what went out, and where it went.
          Because it handles bank data, it gets its own section.
        </p>

        <p>
          <strong>How the connection works.</strong> You connect your bank
          through Plaid, a service used by thousands of finance apps. You sign
          in on Plaid&apos;s screen, not ours. We never see or store your bank
          username or password. Plaid&apos;s handling of your data is covered
          by the{" "}
          <a href="https://plaid.com/legal/#end-user-privacy-policy" target="_blank" rel="noopener noreferrer">
            Plaid End User Privacy Policy
          </a>
          .
        </p>

        <p>
          <strong>What QRS collects.</strong>
        </p>
        <ul>
          <li>
            From your bank, through Plaid: your bank&apos;s name, your account
            names and types, the last four digits of each account number,
            account balances, and your transactions (date, amount, merchant or
            description, and category).
          </li>
          <li>
            From you: your email address to sign in, the business or personal
            tags you set, the goals you create, and any CSV exports you
            request.
          </li>
        </ul>

        <p>
          <strong>What QRS never collects.</strong> Your full account or
          routing numbers, or your bank login. QRS is read-only. Nothing in it
          can move, send, or spend your money.
        </p>

        <p>
          <strong>How we use it.</strong> Only to run QRS for you: showing your
          spending and income, applying your tags, tracking your goals, and
          building the exports you ask for. That&apos;s it.
        </p>

        <p>
          <strong>What we never do with it.</strong>
        </p>
        <ul>
          <li>We don&apos;t sell it or share it for anyone&apos;s marketing, full stop.</li>
          <li>We don&apos;t use it to make credit or lending decisions.</li>
          <li>We don&apos;t use it to train AI models.</li>
        </ul>

        <p>
          <strong>Personal charges.</strong> If a connected account or card
          also carries personal spending, those transactions come in too. You
          can tag them as personal, and they&apos;re treated with the same care
          as everything else.
        </p>

        <p>
          <strong>Who else sees it.</strong> Plaid, to make the connection. Our
          database and hosting providers, to store and run QRS. Nobody else.
        </p>

        <p>
          <strong>How it&apos;s protected.</strong>
        </p>
        <ul>
          <li>Data is encrypted in transit and at rest.</li>
          <li>
            The access your bank grants QRS is stored encrypted, and the key
            lives only in the app that reads your accounts.
          </li>
          <li>Every customer&apos;s data is walled off from every other customer&apos;s.</li>
          <li>
            Access to our systems is limited to one person, protected by
            multi-factor authentication.
          </li>
        </ul>

        <p>
          <strong>How long we keep it, and how to get rid of it.</strong>
        </p>
        <ul>
          <li>We keep your QRS data for as long as your bank is connected.</li>
          <li>Unlinking a bank immediately disconnects it and deletes its accounts and transactions.</li>
          <li>
            Closing your QRS account deletes all of your QRS data within 30
            days, including from backups as they cycle out.
          </li>
          <li>
            You can also cut off access from Plaid&apos;s side at any time at{" "}
            <a href="https://my.plaid.com" target="_blank" rel="noopener noreferrer">
              my.plaid.com
            </a>
            .
          </li>
          <li>CSV files you&apos;ve already downloaded are yours, so deleting them is up to you.</li>
        </ul>

        <p>
          Questions or deletion requests: email{" "}
          <a href="mailto:hello@quesoventures.com">hello@quesoventures.com</a>.
        </p>
      </section>

      <section>
        <h2>5. How we use your information</h2>
        <ul>
          <li>To respond to messages you send us through a website form</li>
          <li>To run the loyalty/rewards program you signed up for</li>
          <li>To run the software you use, such as the Queso Revenue System</li>
          <li>To keep our sites and systems working and secure</li>
        </ul>
        <p>That&apos;s the whole list — we don&apos;t use your information for anything beyond running the service you interacted with.</p>
      </section>

      <section>
        <h2>6. Who we share it with</h2>
        <p>
          We don&apos;t sell your information, full stop. We use a small set
          of service providers to actually run things — database/hosting,
          email delivery, Telnyx for SMS delivery, and Plaid, to connect bank
          accounts for QRS — and they only ever see what they need to do that
          one job.
        </p>
      </section>

      <section>
        <h2>7. How long we keep it, and your control over it</h2>
        <p>
          We keep your information only as long as it&apos;s useful for the
          reason you gave it to us — for example, as long as you&apos;re
          enrolled in a loyalty program. You can ask us to delete your
          information or remove you from a program at any time, no questions
          asked, by replying STOP (for texts) or emailing{" "}
          <a href="mailto:hello@quesoventures.com">hello@quesoventures.com</a>.
          There&apos;s no cancellation fee, no fine print, and no obligation
          to keep using anything. QRS bank data has its own rules, in{" "}
          <a href="#qrs">section 4</a>.
        </p>
      </section>

      <section>
        <h2>8. Security</h2>
        <p>
          We use reasonable, industry-standard measures (encrypted
          connections, access controls) to protect your information. Bank
          data in QRS gets extra protection; see <a href="#qrs">section 4</a>. No
          system is 100% unbreakable, but we take this seriously and only
          collect what we actually need in the first place.
        </p>
      </section>

      <section>
        <h2>9. Children&apos;s privacy</h2>
        <p>
          Our services are not directed to, and we do not knowingly collect
          information from, children under 13.
        </p>
      </section>

      <section>
        <h2>10. Changes to this policy</h2>
        <p>
          If this policy changes in a meaningful way, we&apos;ll update the
          date at the top of this page.
        </p>
      </section>

      <section>
        <h2>11. Contact us</h2>
        <p>
          Questions about this policy, your data, QRS, or an SMS program? Email{" "}
          <a href="mailto:hello@quesoventures.com">hello@quesoventures.com</a>{" "}
          — a real person (just one, actually) will get back to you.
        </p>
      </section>
    </LegalPage>
  );
}
