import Link from "next/link"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

export interface AppHeaderProps extends React.ComponentProps<"header"> {}

function AppHeader({ className, ...props }: AppHeaderProps) {
  return (
    <header
      data-slot="app-header"
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block size-6 rounded-md bg-primary" />
          <span className="text-base tracking-tight">Cobotics</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" render={<Link href="/" />}>
            Home
          </Button>
          <Button variant="ghost" size="sm" render={<Link href="/console" />}>
            Console
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" render={<Link href="/console" />}>
            Sign in
          </Button>
        </div>
      </div>
    </header>
  )
}

export { AppHeader }
