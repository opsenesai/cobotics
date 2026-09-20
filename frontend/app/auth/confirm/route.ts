import { type EmailOtpType } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

// Confirmation endpoint for email links (password recovery, email confirm).
// Supabase sends a link to /auth/confirm?token_hash=...&type=...&next=...
// We verify the token, which establishes a session, then redirect onward.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/auth/reset"

  const redirectTo = new URL(next, request.url)

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) {
      return NextResponse.redirect(redirectTo)
    }
  }

  // Invalid or expired link — send to login with an error flag.
  const errorRedirect = new URL("/auth/login", request.url)
  errorRedirect.searchParams.set("error", "invalid_link")
  return NextResponse.redirect(errorRedirect)
}
