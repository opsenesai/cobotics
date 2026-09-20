"use client"

import { useState } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // The email from the last failed attempt, carried over to the signup link.
  const [lastEmail, setLastEmail] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if (!email || !password) {
      setError("Enter your email and password to continue.")
      return
    }

    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        // "Email not confirmed" is only returned after the password is
        // correct, so it's safe to act on without enabling enumeration.
        // Send the user to verify and re-issue the signup OTP.
        const notConfirmed =
          signInError.code === "email_not_confirmed" ||
          /email not confirmed/i.test(signInError.message ?? "")

        if (notConfirmed) {
          await supabase.auth.resend({ type: "signup", email })
          router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
          return
        }

        // Otherwise keep the generic message (no enumeration) and remember
        // the email so the "Create one" link can prefill signup.
        setLastEmail(email)
        setError(signInError.message ?? "Invalid email or password.")
        return
      }

      router.push("/console")
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const signupHref = lastEmail
    ? `/auth/signup?email=${encodeURIComponent(lastEmail)}`
    : "/auth/signup"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your credentials to access the console.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-10"
                required
              />
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/auth/forgot"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                className="h-10"
                required
              />
            </Field>

            <Field orientation="horizontal">
              <Checkbox id="remember" name="remember" />
              <FieldLabel htmlFor="remember" className="font-normal">
                Remember me
              </FieldLabel>
            </Field>

            {error && (
              <div>
                <FieldError>{error}</FieldError>
                {lastEmail && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    No account yet?{" "}
                    <Link
                      href={signupHref}
                      className="font-medium text-primary hover:underline"
                    >
                      Create one
                    </Link>
                  </p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              Sign in
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <div className="px-6 text-center text-sm text-muted-foreground">
        Don&rsquo;t have an account?{" "}
        <Link
          href={signupHref}
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </Card>
  )
}
