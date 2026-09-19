import { cn } from "cn"
import { AppHeader } from "@/components/app/app-header"
import { AppFooter } from "@/components/app/app-footer"

export interface AppLayoutProps extends React.ComponentProps<"div"> {}

function AppLayout({ className, children, ...props }: AppLayoutProps) {
  return (
    <div
      data-slot="app-layout"
      className={cn("flex min-h-svh flex-col bg-background", className)}
      {...props}
    >
      <AppHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <AppFooter />
    </div>
  )
}

export { AppLayout }
