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
          the Queso Revenue System), and any SMS loyalty or notification
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
            <strong>Bank account and transaction information</strong> — only
            if you use the Queso Revenue System and choose to link a bank.
            Section 4 explains exactly what that is and how it is handled.
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

      <section className="space-y-4">
        <h2>4. Bank data and the Queso Revenue System</h2>
        <p>
          The Queso Revenue System (&quot;QRS&quot;) shows a business owner
          their bank accounts and cards in one place: what came in, what
          went out, and where it went. This section covers the bank data it
          uses. It applies on top of everything else in this policy, and
          where the two differ, this section wins.
        </p>

        <p>
          <strong>How banks are connected.</strong> We use Plaid Inc.
          (&quot;Plaid&quot;) to connect to your bank. You sign in on
          Plaid&apos;s own secure screen, not ours, and we never see or
          store your bank username or password. By linking an account, you
          grant Queso Ventures and Plaid the right, power, and authority to
          act on your behalf to access and transmit your personal and
          financial information from your bank. You agree to your personal
          and financial information being transferred, stored, and processed
          by Plaid in accordance with the{" "}
          <a href="https://plaid.com/legal/#end-user-privacy-policy" target="_blank" rel="noopener noreferrer">
            Plaid End User Privacy Policy
          </a>
          .
        </p>

        <p>
          <strong>What we receive.</strong> QRS asks Plaid for transaction
          data only. From each bank you link, we receive:
        </p>
        <ul>
          <li>the name of the bank</li>
          <li>
            each account&apos;s name, type (such as checking, savings, or
            credit card), last four digits, and balance
          </li>
          <li>
            each transaction&apos;s date, amount, description, merchant
            name, and the category Plaid suggests for it
          </li>
        </ul>
        <p>
          We do not request your full account or routing numbers, your
          identity details (such as your address or Social Security number),
          or any access that can move money. Nothing in QRS can make a
          payment, a transfer, or any other transaction.
        </p>
        <p>
          QRS also keeps what you add yourself: whether a charge is business
          or personal, its category, notes, the tagging rules you set, and
          your goals.
        </p>

        <p>
          <strong>How we use it.</strong> Only to show you your own numbers
          in QRS: your transactions, your in and out by month, where your
          money went, your tags, your goals, and the exports you ask for.
        </p>
        <ul>
          <li>We never sell your bank data.</li>
          <li>
            We never share it with anyone for their own marketing, and we
            never use it for advertising.
          </li>
          <li>
            We never use it to make credit, lending, or eligibility
            decisions about you.
          </li>
          <li>
            We never use it to train artificial intelligence models, and we
            never combine it with another customer&apos;s data.
          </li>
        </ul>

        <p>
          <strong>Who can see it.</strong> You. Queso Ventures looks at it
          only when we need to: to help you when you ask, to keep the service
          working and secure, or when the law requires it. The only service
          providers that handle it are the ones that make QRS run: Plaid, to
          connect to your bank, and our database and application hosting
          providers (Supabase and Vercel), which store and serve it for us
          and do not use it for anything else.
        </p>

        <p>
          <strong>How we protect it.</strong> Bank data is encrypted in
          transit. The access Plaid grants us to your accounts is stored
          encrypted (AES-256), with the key kept apart from the database it
          is stored in. Bank data is closed to direct database access: only
          our own servers can read it, and only to run QRS.
        </p>

        <p>
          <strong>How long we keep it, and how to delete it.</strong> We keep
          your bank data for as long as the bank is linked and you use QRS.
        </p>
        <ul>
          <li>
            When you unlink a bank, we delete its stored access, its
            accounts, and its transactions from our systems, and we can no
            longer read anything from that bank.
          </li>
          <li>
            When you cancel QRS, or email{" "}
            <a href="mailto:hello@quesoventures.com">hello@quesoventures.com</a>{" "}
            asking us to, we delete all of your bank data within 30 days.
          </li>
          <li>
            You can also stop the connection from your bank&apos;s side, or
            through Plaid at{" "}
            <a href="https://my.plaid.com" target="_blank" rel="noopener noreferrer">
              my.plaid.com
            </a>
            .
          </li>
        </ul>
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
          email delivery, Telnyx for SMS delivery, and Plaid to connect bank
          accounts — and they only ever see what they need to do that one
          job.
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
          to keep using anything. Bank data has its own rules, in section 4.
        </p>
      </section>

      <section>
        <h2>8. Security</h2>
        <p>
          We use reasonable, industry-standard measures (encrypted
          connections, access controls, and encryption of the most sensitive
          credentials we hold) to protect your information. No
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
          Questions about this policy, your data, your bank data, or an SMS program? Email{" "}
          <a href="mailto:hello@quesoventures.com">hello@quesoventures.com</a>{" "}
          — a real person (just one, actually) will get back to you.
        </p>
      </section>
    </LegalPage>
  );
}
