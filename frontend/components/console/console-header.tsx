import { Menu } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

export interface ConsoleHeaderProps extends React.ComponentProps<"header"> {
  title?: string
  /** Opens the mobile navigation drawer. When omitted, the menu button is hidden. */
  onMenuClick?: () => void
}

function ConsoleHeader({
  className,
  title: _title,
  onMenuClick,
  ...props
}: ConsoleHeaderProps) {
  return (
    <header
      data-slot="console-header"
      className={cn(
        "flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background px-4 sm:px-6",
        className
      )}
      {...props}
    >
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
    </header>
  )
}

export { ConsoleHeader }
