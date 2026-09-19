import Link from "next/link"
import { AppLayout } from "@/components/app"

const legalLinks = [
  { title: "Terms of Service", href: "/legal/terms" },
  { title: "Privacy Policy", href: "/legal/privacy" },
  { title: "Cookie Policy", href: "/legal/cookies" },
]

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Legal
            </p>
            <nav className="flex flex-col gap-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
            {children}
          </article>
        </div>
      </div>
    </AppLayout>
  )
}
