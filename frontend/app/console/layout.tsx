import { ConsoleLayout } from "@/components/console"

export default function ConsoleRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ConsoleLayout>{children}</ConsoleLayout>
}
