import Link from "next/link"
import { AppFooter } from "@/components/app"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 font-semibold"
        >
          <span className="inline-block size-7 rounded-md bg-primary" />
          <span className="text-lg tracking-tight">Cobotics</span>
        </Link>

        <div className="w-full max-w-sm">{children}</div>
      </div>

      <AppFooter />
    </div>
  )
}
