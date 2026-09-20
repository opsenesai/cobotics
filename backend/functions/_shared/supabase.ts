// Shared Supabase client helpers for Edge Functions.
// Shared Supabase client helpers for Edge Functions.
import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

// A client scoped to the caller's JWT — respects row-level security.
// Pass the incoming request's Authorization header.
export function createUserClient(req: Request): SupabaseClient {
  const authHeader = req.headers.get("Authorization") ?? ""
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

// A service-role client — bypasses RLS. Use only for privileged server logic.
export function createServiceClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

// Resolve the authenticated user from the request, or null.
export async function getUser(req: Request) {
  const supabase = createUserClient(req)
  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  return data.user
}
