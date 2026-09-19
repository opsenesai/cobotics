import Link from "next/link"
import { cn } from "cn"

export interface AppFooterProps extends React.ComponentProps<"footer"> {}

function AppFooter({ className, ...props }: AppFooterProps) {
  return (
    <footer
      data-slot="app-footer"
      className={cn("w-full border-t border-border bg-background", className)}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Cobotics. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link href="/" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export { AppFooter }
