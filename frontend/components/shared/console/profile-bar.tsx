"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  Palette,
  Settings,
  MessageSquarePlus,
  ExternalLink,
  LogOut,
  ChevronUp,
} from "lucide-react"

import { cn } from "cn"
import { createClient } from "@/lib/supabase/client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/shared/console/theme-toggle"
import { LanguageToggle } from "@/components/shared/console/language-toggle"

export interface ProfileBarProps extends React.ComponentProps<"div"> {
  /** Called when a menu item is clicked, so a parent drawer can close on navigation. */
  onNavigate?: () => void
}

const menuItemClass = cn(
  "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-foreground transition-colors",
  "hover:bg-muted focus-visible:bg-muted outline-none"
)

// First letter of first + last name; for a single name, the first two letters.
function initials(name: string): string {
  const source = name.trim()
  if (!source) return ""
  const parts = source.split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return source.slice(0, 2).toUpperCase()
}

function ProfileBar({ className, onNavigate, ...props }: ProfileBarProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [displayName, setDisplayName] = useState("Profile")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    async function load() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: row } = await supabase
        .from("users")
        .select("username, full_name, avatar_url")
        .eq("user_id", user.id)
        .single()

      if (!active) return
      setDisplayName(row?.full_name || row?.username || user.email || "Profile")
      setAvatarUrl(row?.avatar_url ?? null)
    }
    load()
    return () => {
      active = false
    }
  }, [])

  function close() {
    setOpen(false)
    onNavigate?.()
  }

  async function handleLogout() {
    close()
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <div
      data-slot="profile-bar"
      className={cn("shrink-0 border-t border-sidebar-border", className)}
      {...props}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            "flex h-14 w-full items-center gap-2.5 px-4 text-sm font-medium transition-colors outline-none",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            "data-[popup-open]:bg-sidebar-accent data-[popup-open]:text-sidebar-accent-foreground"
          )}
        >
          <Avatar size="sm">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={displayName} />
            ) : null}
            <AvatarFallback>
              {initials(displayName) || <User className="size-3.5" />}
            </AvatarFallback>
          </Avatar>
          <span className="flex-1 truncate text-left">{displayName}</span>
          <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
        </PopoverTrigger>

        <PopoverContent
          side="top"
          align="center"
          sideOffset={8}
          className="w-[calc(15rem-2rem)] gap-1 p-1"
        >
          <a href="#settings/account" onClick={close} className={menuItemClass}>
            <Settings className="size-4 shrink-0" />
            Settings
          </a>
          <a
            href="#settings/personalization"
            onClick={close}
            className={menuItemClass}
          >
            <Palette className="size-4 shrink-0" />
            Personalization
          </a>
          <a
            href="https://tally.so/r/dW7g5V"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className={menuItemClass}
          >
            <MessageSquarePlus className="size-4 shrink-0" />
            <span className="flex-1 text-left">Feedback</span>
            <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
          </a>

          <Separator className="my-1" />

          <ThemeToggle />
          <LanguageToggle />

          <Separator className="my-1" />

          <button
            type="button"
            onClick={handleLogout}
            className={cn(menuItemClass, "text-destructive hover:bg-destructive/10")}
          >
            <LogOut className="size-4 shrink-0" />
            Log out
          </button>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { ProfileBar }
