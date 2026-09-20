// Edge Function: auth
// - GET  /auth  -> current user's profile (fetched by user_id, RLS-enforced)
// - PATCH /auth -> update the editable username for the current user
import { corsHeaders, jsonResponse } from "../_shared/cors.ts"
import { createUserClient, getUser } from "../_shared/supabase.ts"

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const user = await getUser(req)
  if (!user) {
    return jsonResponse({ error: "Unauthorized" }, 401)
  }

  const supabase = createUserClient(req)

  // GET: return the caller's profile.
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("users")
      .select("user_id, org_id, username, email, full_name, avatar_url")
      .eq("user_id", user.id)
      .single()

    if (error) return jsonResponse({ error: error.message }, 400)
    return jsonResponse({ profile: data })
  }

  // PATCH: update the (editable) username.
  if (req.method === "PATCH") {
    let body: { username?: unknown }
    try {
      body = await req.json()
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400)
    }

    const username = body.username
    if (typeof username !== "string" || username.length < 3 || username.length > 32) {
      return jsonResponse({ error: "username must be 3-32 characters" }, 400)
    }

    const { data, error } = await supabase
      .from("users")
      .update({ username })
      .eq("user_id", user.id)
      .select("user_id, org_id, username")
      .single()

    if (error) {
      // 23505 = unique_violation (username taken)
      const status = (error as { code?: string }).code === "23505" ? 409 : 400
      return jsonResponse({ error: error.message }, status)
    }
    return jsonResponse({ profile: data })
  }

  return jsonResponse({ error: "Method not allowed" }, 405)
})
