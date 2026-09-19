import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Cobotics",
  description:
    "How Cobotics uses cookies and similar technologies, the categories we use, and how you can manage your preferences.",
}

const LAST_UPDATED = "September 19, 2026"

export default function CookiesPage() {
  return (
    <>
      <header className="not-prose mb-8 border-b border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Cookie Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <p>
        This Cookie Policy explains how Cobotics (&ldquo;Cobotics,&rdquo;
        &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses cookies and
        similar technologies when you visit our websites and applications
        (collectively, the &ldquo;Services&rdquo;). It should be read together
        with our{" "}
        <a href="/legal/privacy">Privacy Policy</a>.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a
        website. They are widely used to make websites work, to improve
        efficiency, and to provide reporting information. Similar technologies
        include pixels, local storage, and software development kits.
      </p>

      <h2>2. Categories of Cookies We Use</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Purpose</th>
            <th>Can be disabled?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strictly necessary</td>
            <td>
              Enable core functionality such as authentication, security, and
              load balancing. The Services cannot function properly without
              them.
            </td>
            <td>No</td>
          </tr>
          <tr>
            <td>Functional</td>
            <td>
              Remember your preferences, such as language and interface
              settings, to provide a more personalized experience.
            </td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>
              Help us understand how visitors interact with the Services so we
              can measure and improve performance.
            </td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Marketing</td>
            <td>
              Used to deliver relevant content and measure the effectiveness of
              campaigns. Set only with your consent.
            </td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <h2>3. First- and Third-Party Cookies</h2>
      <p>
        We use both first-party cookies (set by Cobotics) and third-party
        cookies (set by our service providers, for example analytics and payment
        providers). Third-party cookies are governed by the respective
        provider&rsquo;s privacy and cookie policies.
      </p>

      <h2>4. How Long Cookies Last</h2>
      <p>
        <strong>Session cookies</strong> are temporary and are deleted when you
        close your browser. <strong>Persistent cookies</strong> remain on your
        device until they expire or you delete them. The retention period varies
        by cookie and its purpose.
      </p>

      <h2>5. Managing Your Preferences</h2>
      <p>
        You can manage non-essential cookies through our cookie preferences
        control available within the Services. You can also control cookies
        through your browser settings, including deleting existing cookies and
        blocking future ones. Note that disabling certain cookies may affect the
        functionality of the Services.
      </p>

      <h2>6. Do Not Track</h2>
      <p>
        Some browsers offer a &ldquo;Do Not Track&rdquo; signal. Because there is
        no common industry standard for interpreting these signals, the Services
        do not currently respond to them. We will update this policy if that
        changes.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in
        the technologies we use or for legal and regulatory reasons. The
        &ldquo;Last updated&rdquo; date above reflects the most recent revision.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have questions about our use of cookies, contact us at{" "}
        <a href="mailto:privacy@cobotics.com">privacy@cobotics.com</a>.
      </p>
    </>
  )
}
