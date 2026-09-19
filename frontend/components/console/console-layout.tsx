import { cn } from "cn"
import { ConsoleSidebar } from "@/components/console/console-sidebar"
import { ConsoleHeader } from "@/components/console/console-header"

export interface ConsoleLayoutProps extends React.ComponentProps<"div"> {
  title?: string
}

function ConsoleLayout({
  className,
  children,
  title,
  ...props
}: ConsoleLayoutProps) {
  return (
    <div
      data-slot="console-layout"
      className={cn("flex h-svh overflow-hidden bg-background", className)}
      {...props}
    >
      <ConsoleSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <ConsoleHeader title={title} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}

export { ConsoleLayout }
