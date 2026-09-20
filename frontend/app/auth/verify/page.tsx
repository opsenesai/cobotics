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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Field, FieldGroup, FieldError } from "@/components/ui/field"

const OTP_LENGTH = 6

function VerifyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setNotice(null)

    if (!email) {
      setError("Missing email address. Start from sign up again.")
      return
    }

    if (code.length !== OTP_LENGTH) {
      setError(`Enter the ${OTP_LENGTH}-digit code from your email.`)
      return
    }

    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "signup",
      })

      if (verifyError) {
        setError(
          verifyError.message ?? "That code is incorrect or has expired."
        )
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

  async function handleResend() {
    setError(null)
    setNotice(null)

    if (!email) {
      setError("Missing email address. Start from sign up again.")
      return
    }

    setIsResending(true)
    try {
      const supabase = createClient()
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      })

      if (resendError) {
        setError(resendError.message ?? "Could not resend the code.")
        return
      }

      setNotice("A new code is on its way.")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          {email
            ? `We sent a ${OTP_LENGTH}-digit code to ${email}.`
            : `Enter the ${OTP_LENGTH}-digit code we sent to your email.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            <Field className="items-center">
              <InputOTP
                maxLength={OTP_LENGTH}
                value={code}
                onChange={setCode}
                aria-label="Verification code"
                containerClassName="justify-center"
              >
                <InputOTPGroup className="gap-2">
                  {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="size-10 rounded-lg border"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </Field>

            {error && <FieldError>{error}</FieldError>}
            {notice && (
              <p className="text-sm font-normal text-muted-foreground">
                {notice}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              Verify
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending && <Loader2 className="animate-spin" />}
              Resend code
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

export default function VerifyPage() {
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
      <VerifyForm />
    </Suspense>
  )
}
