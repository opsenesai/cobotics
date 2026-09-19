import { Bell, Search, UserCircle2 } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

export interface ConsoleHeaderProps extends React.ComponentProps<"header"> {
  title?: string
}

function ConsoleHeader({ className, title = "Overview", ...props }: ConsoleHeaderProps) {
  return (
    <header
      data-slot="console-header"
      className={cn(
        "flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 sm:px-6",
        className
      )}
      {...props}
    >
      <h1 className="text-base font-semibold tracking-tight">{title}</h1>

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
