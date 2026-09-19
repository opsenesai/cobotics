import { Bell, Menu, Search, UserCircle2 } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

export interface ConsoleHeaderProps extends React.ComponentProps<"header"> {
  title?: string
  /** Opens the mobile navigation drawer. When omitted, the menu button is hidden. */
  onMenuClick?: () => void
}

function ConsoleHeader({
  className,
  title = "Overview",
  onMenuClick,
  ...props
}: ConsoleHeaderProps) {
  return (
    <header
      data-slot="console-header"
      className={cn(
        "flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 sm:px-6",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu />
          </Button>
        )}
        <h1 className="truncate text-base font-semibold tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon-sm" aria-label="Search">
          <Search />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Account">
          <UserCircle2 />
        </Button>
      </div>
    </header>
  )
}

export { ConsoleHeader }
