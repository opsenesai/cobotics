// Edge Function: memory
// Per-user memory entries. RLS-scoped to the caller.
//
//   GET    /memory              -> list the caller's memories
//   POST   /memory { content, kind? } -> create a memory
//   DELETE /memory/:id          -> delete a memory
import { corsHeaders, jsonResponse } from "../_shared/cors.ts"
import { createUserClient, getUser } from "../_shared/supabase.ts"

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const user = await getUser(req)
  if (!user) return jsonResponse({ error: "Unauthorized" }, 401)

  const supabase = createUserClient(req)
  const url = new URL(req.url)
  const segments = url.pathname.split("/").filter(Boolean)
  const idx = segments.indexOf("memory")
  const id = idx >= 0 ? segments[idx + 1] : undefined

  if (!id) {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("memories")
        .select("id, content, kind, created_at")
        .order("created_at", { ascending: false })
      if (error) return jsonResponse({ error: error.message }, 400)
      return jsonResponse({ memories: data })
    }

    if (req.method === "POST") {
      let body: { content?: unknown; kind?: unknown }
      try {
        body = await req.json()
      } catch {
        return jsonResponse({ error: "Invalid JSON body" }, 400)
      }
      if (typeof body.content !== "string" || !body.content.trim()) {
        return jsonResponse({ error: "content is required" }, 400)
      }
      const kind = typeof body.kind === "string" ? body.kind : "note"

      const { data, error } = await supabase
        .from("memories")
        .insert({ user_id: user.id, content: body.content.trim(), kind })
        .select("id, content, kind, created_at")
        .single()
      if (error) return jsonResponse({ error: error.message }, 400)
      return jsonResponse({ memory: data }, 201)
    }

    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  if (req.method === "DELETE") {
    const { error } = await supabase.from("memories").delete().eq("id", id)
    if (error) return jsonResponse({ error: error.message }, 400)
    return jsonResponse({ ok: true })
  }

  return jsonResponse({ error: "Method not allowed" }, 405)
})
