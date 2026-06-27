import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How IdiaDesigns collects and uses your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Hero */}
      <div className="bg-brand-navy py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-purple text-[11px] tracking-[0.2em] uppercase font-medium mb-3">
            Legal
          </p>
          <h1 className="font-serif text-4xl font-semibold text-brand-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-brand-white/40 text-sm">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-surface rounded-xl border border-border p-8 sm:p-12 space-y-10">

          <Section title="1. Information We Collect">
            We collect information you provide directly — such as your name,
            email address, phone number, and payment details — when you
            register or make a purchase. We also collect usage data such as
            pages visited, download history, and device information to improve
            our services.
          </Section>

          <Section title="2. How We Use Your Information">
            We use your information to process transactions, send verification
            and purchase confirmation emails, provide customer support, and
            send relevant product updates or promotional content (which you can
            opt out of at any time). We do not sell your personal data to third
            parties.
          </Section>

          <Section title="3. Cookies">
            IdiaDesigns uses cookies to maintain your session and preferences.
            Authentication tokens are stored in secure, HTTP-only cookies.
            You can disable cookies in your browser settings, but this may
            affect platform functionality.
          </Section>

          <Section title="4. Data Sharing">
            We share your data only with trusted third-party services necessary
            to operate the platform — including payment processors (LemonSqueezy,
            SSLCommerz) and email services (Resend). These providers are bound
            by their own privacy policies and are not permitted to use your
            data for other purposes.
          </Section>

          <Section title="5. Data Retention">
            We retain your personal data for as long as your account is active
            or as needed to provide services. You may request deletion of your
            account and associated data at any time by contacting us. Some data
            may be retained for legal or fraud prevention purposes.
          </Section>

          <Section title="6. Security">
            We implement industry-standard security measures including password
            hashing, HTTPS encryption, and HTTP-only cookies. However, no
            method of transmission over the internet is 100% secure, and we
            cannot guarantee absolute security.
          </Section>

          <Section title="7. Your Rights">
            You have the right to access, correct, or delete your personal
            data. You may also request a copy of the data we hold about you.
            To exercise these rights, contact us at the email below.
          </Section>

          <Section title="8. Children's Privacy">
            IdiaDesigns is not intended for users under the age of 13. We do
            not knowingly collect personal data from children. If you believe
            a child has provided us with personal information, please contact
            us immediately.
          </Section>

          <Section title="9. Changes to This Policy">
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes via email or a notice on the platform.
            Continued use after changes constitutes acceptance of the updated
            policy.
          </Section>

          <Section title="10. Contact Us">
            For privacy-related questions or requests, contact us at{" "}
            <a
              href="mailto:privacy@idiadesigns.com"
              className="text-brand-purple-dark hover:text-brand-purple transition-colors">
              privacy@idiadesigns.com
            </a>
            .
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="font-serif text-xl font-semibold text-brand-navy">{title}</h2>
      <p className="text-text-primary/70 text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}