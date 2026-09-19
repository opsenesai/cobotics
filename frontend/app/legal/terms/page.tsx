import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Cobotics",
  description:
    "The terms and conditions that govern your access to and use of the Cobotics platform and services.",
}

const LAST_UPDATED = "September 19, 2026"

export default function TermsPage() {
  return (
    <>
      <header className="not-prose mb-8 border-b border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement
        between you and Cobotics (&ldquo;Cobotics,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) and govern your access to and use
        of our websites, applications, APIs, and related services (collectively,
        the &ldquo;Services&rdquo;). By accessing or using the Services, you
        agree to be bound by these Terms. If you do not agree, do not use the
        Services.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 years old, or the age of legal majority in your
        jurisdiction, to use the Services. By using the Services, you represent
        that you meet these requirements and that any information you provide is
        accurate and complete.
      </p>

      <h2>2. Accounts</h2>
      <p>
        When you create an account, you are responsible for maintaining the
        confidentiality of your credentials and for all activity that occurs
        under your account. You agree to notify us promptly of any unauthorized
        use or suspected breach of security. We are not liable for any loss
        arising from your failure to safeguard your account.
      </p>

      <h2>3. Acceptable Use</h2>
      <p>You agree not to use the Services to:</p>
      <ul>
        <li>Violate any applicable law, regulation, or third-party right.</li>
        <li>
          Upload or transmit malicious code, or attempt to disrupt, degrade, or
          gain unauthorized access to the Services or related systems.
        </li>
        <li>
          Reverse engineer, decompile, or otherwise attempt to derive source
          code, except to the extent expressly permitted by law.
        </li>
        <li>
          Misrepresent your identity or affiliation, or use the Services to
          harass, abuse, or harm others.
        </li>
      </ul>

      <h2>4. Subscriptions and Billing</h2>
      <p>
        Certain features of the Services require a paid subscription. Fees are
        billed in advance on a recurring basis according to the plan you select
        and are non-refundable except as required by law. We may change pricing
        with reasonable prior notice, and continued use after the change takes
        effect constitutes acceptance of the new fees.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        The Services, including all software, text, graphics, and trademarks,
        are owned by Cobotics or its licensors and are protected by intellectual
        property laws. We grant you a limited, non-exclusive, non-transferable,
        revocable license to use the Services in accordance with these Terms.
      </p>

      <h2>6. Customer Content</h2>
      <p>
        You retain all rights to the data and content you submit to the Services
        (&ldquo;Customer Content&rdquo;). You grant us a limited license to host,
        process, and transmit Customer Content solely to provide and improve the
        Services. You are responsible for ensuring you have the rights necessary
        to submit Customer Content.
      </p>

      <h2>7. Third-Party Services</h2>
      <p>
        The Services may integrate with or link to third-party products. We are
        not responsible for the content, policies, or practices of any
        third-party service, and your use of them is governed by their own
        terms.
      </p>

      <h2>8. Disclaimer of Warranties</h2>
      <p>
        The Services are provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; without warranties of any kind, whether express or
        implied, including implied warranties of merchantability, fitness for a
        particular purpose, and non-infringement, to the maximum extent
        permitted by law.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Cobotics will not be liable for
        any indirect, incidental, special, consequential, or punitive damages,
        or any loss of profits or revenues, whether incurred directly or
        indirectly, arising from your use of the Services.
      </p>

      <h2>10. Termination</h2>
      <p>
        We may suspend or terminate your access to the Services at any time if
        you breach these Terms or if we are required to do so by law. Upon
        termination, your right to use the Services will cease immediately.
      </p>

      <h2>11. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. If we make material
        changes, we will provide notice through the Services or by other
        reasonable means. Your continued use of the Services after the effective
        date constitutes acceptance of the revised Terms.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have questions about these Terms, contact us at{" "}
        <a href="mailto:legal@cobotics.com">legal@cobotics.com</a>.
      </p>
    </>
  )
}
