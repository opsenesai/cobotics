import { AppLayout } from "@/components/app"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:py-14">
        <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
          {children}
        </article>
      </div>
    </AppLayout>
  )
}
