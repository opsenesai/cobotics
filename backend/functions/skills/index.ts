// Edge Function: skills
// Per-user skill preferences. RLS-scoped to the caller.
//
//   GET    /skills               -> list the caller's skill prefs
//   PUT    /skills  { skill_id, enabled } -> upsert a skill pref
import { corsHeaders, jsonResponse } from "../_shared/cors.ts"
import { createUserClient, getUser } from "../_shared/supabase.ts"

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const user = await getUser(req)
  if (!user) return jsonResponse({ error: "Unauthorized" }, 401)

  const supabase = createUserClient(req)

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("skills")
      .select("id, skill_id, enabled, updated_at")
      .order("skill_id", { ascending: true })
    if (error) return jsonResponse({ error: error.message }, 400)
    return jsonResponse({ skills: data })
  }

  if (req.method === "PUT") {
    let body: { skill_id?: unknown; enabled?: unknown }
    try {
      body = await req.json()
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400)
    }
    if (typeof body.skill_id !== "string" || !body.skill_id) {
      return jsonResponse({ error: "skill_id is required" }, 400)
    }
    const enabled = body.enabled !== false // default true

    const { data, error } = await supabase
      .from("skills")
      .upsert(
        { user_id: user.id, skill_id: body.skill_id, enabled },
        { onConflict: "user_id,skill_id" }
      )
      .select("id, skill_id, enabled")
      .single()
    if (error) return jsonResponse({ error: error.message }, 400)
    return jsonResponse({ skill: data })
  }

  return jsonResponse({ error: "Method not allowed" }, 405)
})
