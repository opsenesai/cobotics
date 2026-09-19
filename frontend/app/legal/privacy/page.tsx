import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Cobotics",
  description:
    "How Cobotics collects, uses, shares, and protects your personal information when you use our platform and services.",
}

const LAST_UPDATED = "September 19, 2026"

export default function PrivacyPage() {
  return (
    <>
      <header className="not-prose mb-8 border-b border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <p>
        This Privacy Policy explains how Cobotics (&ldquo;Cobotics,&rdquo;
        &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses,
        discloses, and safeguards your personal information when you use our
        websites, applications, APIs, and related services (collectively, the
        &ldquo;Services&rdquo;). By using the Services, you agree to the
        practices described here.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect the following categories of information:</p>
      <ul>
        <li>
          <strong>Account information</strong> — such as your name, email
          address, and organization, provided when you register.
        </li>
        <li>
          <strong>Usage data</strong> — such as log files, device identifiers,
          IP address, browser type, and interactions with the Services.
        </li>
        <li>
          <strong>Content</strong> — data and files you submit while using the
          Services.
        </li>
        <li>
          <strong>Payment information</strong> — processed by our payment
          providers; we do not store full card numbers.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve the Services.</li>
        <li>Authenticate users and secure accounts.</li>
        <li>Process transactions and send related communications.</li>
        <li>
          Respond to inquiries, provide support, and send service updates.
        </li>
        <li>
          Detect, prevent, and address fraud, abuse, and security incidents.
        </li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>3. Legal Bases for Processing</h2>
      <p>
        Where applicable law (such as the GDPR) requires it, we process personal
        information on the basis of contractual necessity, legitimate interests,
        your consent, and compliance with legal obligations.
      </p>

      <h2>4. How We Share Information</h2>
      <p>
        We do not sell your personal information. We may share it with service
        providers that process data on our behalf, with third parties when
        required by law or to protect our rights, and in connection with a
        merger, acquisition, or asset sale, subject to appropriate safeguards.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain personal information for as long as necessary to provide the
        Services and fulfill the purposes described in this policy, unless a
        longer retention period is required or permitted by law.
      </p>

      <h2>6. Security</h2>
      <p>
        We implement administrative, technical, and organizational measures
        designed to protect personal information. No method of transmission or
        storage is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your location, you may have the right to access, correct,
        delete, or port your personal information, and to object to or restrict
        certain processing. To exercise these rights, contact us using the
        details below. We will respond in accordance with applicable law.
      </p>

      <h2>8. International Transfers</h2>
      <p>
        Your information may be processed in countries other than your own. Where
        we transfer personal information across borders, we rely on appropriate
        safeguards such as standard contractual clauses.
      </p>

      <h2>9. Children&rsquo;s Privacy</h2>
      <p>
        The Services are not directed to children under 16, and we do not
        knowingly collect personal information from them. If you believe a child
        has provided us information, contact us and we will take appropriate
        steps to delete it.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. If we make material
        changes, we will notify you through the Services or by other reasonable
        means. The &ldquo;Last updated&rdquo; date above reflects the most recent
        revision.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices,
        contact our privacy team at{" "}
        <a href="mailto:privacy@cobotics.com">privacy@cobotics.com</a>.
      </p>
    </>
  )
}
