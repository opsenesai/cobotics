import Link from "next/link"
import { cn } from "cn"

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
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center font-semibold">
          <span className="text-base tracking-tight">cobotics</span>
        </Link>
      </div>
    </header>
  )
}

export { AppHeader }
