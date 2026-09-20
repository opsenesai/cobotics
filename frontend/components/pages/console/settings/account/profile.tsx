"use client"

import { useEffect, useState } from "react"
import { User } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field"
import { Skeleton } from "@/components/ui/skeleton"

interface ProfileData {
  userId: string
  orgId: string | null
  displayName: string
  email: string
  avatarUrl: string | null
}

function initials(name: string, email: string): string {
  const source = name.trim() || email.trim()
  if (!source) return ""
  const parts = source.split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return source.slice(0, 2).toUpperCase()
}

export function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      const supabase = createClient()
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        if (active) {
          setError("You are not signed in.")
          setLoading(false)
        }
        return
      }

      // Fetch the app profile row (RLS restricts this to the current user).
      const { data: row } = await supabase
        .from("users")
        .select("user_id, org_id, username, full_name, email, avatar_url")
        .eq("user_id", user.id)
        .single()

      if (!active) return

      setProfile({
        userId: user.id,
        orgId: row?.org_id ?? null,
        displayName: row?.full_name || row?.username || "—",
        email: row?.email || user.email || "—",
        avatarUrl: row?.avatar_url ?? null,
      })
      setLoading(false)
    }

    load()
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <ProfileSkeleton />
  }

  if (error || !profile) {
    return (
      <p className="text-sm text-muted-foreground">
        {error ?? "Could not load your profile."}
      </p>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar size="lg">
            {profile.avatarUrl ? (
              <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
            ) : null}
            <AvatarFallback>
              {initials(profile.displayName, profile.email) || (
                <User className="size-4" />
              )}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-foreground">
              {profile.displayName}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </div>
      </CardHeader>

      <FieldSeparator />

      <CardContent>
        <FieldGroup className="gap-4">
          <Field orientation="horizontal">
            <FieldTitle>Display name</FieldTitle>
            <FieldDescription className="text-right">
              {profile.displayName}
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <FieldTitle>Email</FieldTitle>
            <FieldDescription className="text-right">
              {profile.email}
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <FieldTitle>User ID</FieldTitle>
            <FieldDescription className="text-right font-mono break-all">
              {profile.userId}
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <FieldTitle>Org ID</FieldTitle>
            <FieldDescription className="text-right font-mono break-all">
              {profile.orgId ?? "—"}
            </FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
Profile.displayName = "Profile"

function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </CardHeader>

      <FieldSeparator />

      <CardContent>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
