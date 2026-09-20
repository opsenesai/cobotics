import { AppHeader, AppFooter } from "@/components/app"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <AppHeader />

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>

      <AppFooter />
    </div>
  )
}
