"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefilledEmail = searchParams.get("email") ?? ""
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const confirm = String(formData.get("confirm") ?? "")

    if (!name || !email || !password) {
      setError("Fill in all fields to create your account.")
      return
    }

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
      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      })

      if (signUpError) {
        setError(signUpError.message ?? "Could not create your account.")
        return
      }

      router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Get started with Cobotics in a few seconds.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                className="h-10"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                defaultValue={prefilledEmail}
                className="h-10"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="new-password"
                className="h-10"
                required
              />
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
              Create account
            </Button>

            <FieldDescription className="text-center">
              By creating an account you agree to our{" "}
              <Link href="/legal/terms">Terms</Link> and{" "}
              <Link href="/legal/privacy">Privacy Policy</Link>.
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
      <div className="px-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </Card>
  )
}

export default function SignupPage() {
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
      <SignupForm />
    </Suspense>
  )
}
