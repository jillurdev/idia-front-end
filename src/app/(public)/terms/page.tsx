import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using IdiaDesigns.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Hero */}
      <div className="bg-brand-navy py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-purple text-[11px] tracking-[0.2em] uppercase font-medium mb-3">
            Legal
          </p>
          <h1 className="font-serif text-4xl font-semibold text-brand-white mb-3">
            Terms of Service
          </h1>
          <p className="text-brand-white/40 text-sm">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-surface rounded-xl border border-border p-8 sm:p-12 space-y-10">

          <Section title="1. Acceptance of Terms">
            By accessing or using IdiaDesigns, you agree to be bound by these
            Terms of Service. If you do not agree, please do not use our
            platform. We reserve the right to update these terms at any time,
            and continued use of the platform constitutes acceptance of the
            revised terms.
          </Section>

          <Section title="2. Use of the Platform">
            IdiaDesigns provides premium digital assets including motion
            graphics, templates, and design files. You may use these assets
            for personal and commercial projects in accordance with the license
            purchased. You may not redistribute, resell, or sublicense any
            asset without explicit written permission from IdiaDesigns.
          </Section>

          <Section title="3. Account Responsibilities">
            You are responsible for maintaining the confidentiality of your
            account credentials. You agree to notify us immediately of any
            unauthorized access to your account. IdiaDesigns is not liable for
            any loss resulting from unauthorized use of your account.
          </Section>

          <Section title="4. Purchases and Payments">
            All purchases are final unless otherwise stated. We support
            payments via LemonSqueezy (USD) and SSLCommerz (BDT). Prices are
            displayed in the applicable currency and may vary by region.
            Refunds are handled on a case-by-case basis per our Refund Policy.
          </Section>

          <Section title="5. Intellectual Property">
            All content on IdiaDesigns — including designs, graphics, logos,
            and software — is the property of IdiaDesigns or its content
            creators. Unauthorized use, reproduction, or distribution is
            strictly prohibited and may result in account termination and legal
            action.
          </Section>

          <Section title="6. Prohibited Conduct">
            You agree not to use the platform to upload malicious content,
            attempt to hack or disrupt our services, impersonate other users,
            or engage in fraudulent activity. Violation of these terms may
            result in immediate account suspension.
          </Section>

          <Section title="7. Limitation of Liability">
            IdiaDesigns is provided on an "as is" basis. We make no warranties
            regarding uptime, accuracy, or fitness for a particular purpose.
            To the fullest extent permitted by law, IdiaDesigns shall not be
            liable for any indirect, incidental, or consequential damages.
          </Section>

          <Section title="8. Governing Law">
            These terms are governed by the laws of Bangladesh. Any disputes
            arising from the use of this platform shall be subject to the
            exclusive jurisdiction of the courts of Bangladesh.
          </Section>

          <Section title="9. Contact Us">
            If you have any questions about these terms, please contact us at{" "}
            <a
              href="mailto:legal@idiadesigns.com"
              className="text-brand-purple-dark hover:text-brand-purple transition-colors">
              legal@idiadesigns.com
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