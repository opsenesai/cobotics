"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"

function ResetPasswordForm() {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const password = String(formData.get("password") ?? "")
    const confirm = String(formData.get("confirm") ?? "")

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    setIsSubmitting(true)
    try {
      // The recovery link establishes a session; update the password on it.
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })

      if (updateError) {
        setError(updateError.message ?? "Could not reset your password.")
        return
      }

      router.push("/auth/login")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set a new password</CardTitle>
        <CardDescription>
          Choose a strong password you don&rsquo;t use elsewhere.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">New password</FieldLabel>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="new-password"
                className="h-10"
                required
              />
              <FieldDescription>Use at least 8 characters.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm">Confirm password</FieldLabel>
              <PasswordInput
                id="confirm"
                name="confirm"
                autoComplete="new-password"
                className="h-10"
                required
              />
            </Field>

            {error && <FieldError>{error}</FieldError>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              Reset password
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <div className="px-6 text-center text-sm text-muted-foreground">
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </Card>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <Card>
          <CardContent className="flex items-center justify-center py-10">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}
