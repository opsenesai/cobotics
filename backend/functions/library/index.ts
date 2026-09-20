// Edge Function: library
// Per-user library assets. RLS-scoped to the caller.
//
//   GET    /library              -> list the caller's assets
//   POST   /library { name, type?, storage_path?, metadata? } -> create
//   GET    /library/:id          -> one asset
//   DELETE /library/:id          -> delete an asset
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
  const idx = segments.indexOf("library")
  const id = idx >= 0 ? segments[idx + 1] : undefined

  const columns = "id, name, type, storage_path, metadata, created_at, updated_at"

  if (!id) {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("library_assets")
        .select(columns)
        .order("created_at", { ascending: false })
      if (error) return jsonResponse({ error: error.message }, 400)
      return jsonResponse({ assets: data })
    }

    if (req.method === "POST") {
      let body: {
        name?: unknown
        type?: unknown
        storage_path?: unknown
        metadata?: unknown
      }
      try {
        body = await req.json()
      } catch {
        return jsonResponse({ error: "Invalid JSON body" }, 400)
      }
      if (typeof body.name !== "string" || !body.name.trim()) {
        return jsonResponse({ error: "name is required" }, 400)
      }

      const { data, error } = await supabase
        .from("library_assets")
        .insert({
          user_id: user.id,
          name: body.name.trim(),
          type: typeof body.type === "string" ? body.type : "file",
          storage_path:
            typeof body.storage_path === "string" ? body.storage_path : null,
          metadata:
            body.metadata && typeof body.metadata === "object"
              ? body.metadata
              : {},
        })
        .select(columns)
        .single()
      if (error) return jsonResponse({ error: error.message }, 400)
      return jsonResponse({ asset: data }, 201)
    }

    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("library_assets")
      .select(columns)
      .eq("id", id)
      .single()
    if (error) return jsonResponse({ error: error.message }, 404)
    return jsonResponse({ asset: data })
  }

  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("library_assets")
      .delete()
      .eq("id", id)
    if (error) return jsonResponse({ error: error.message }, 400)
    return jsonResponse({ ok: true })
  }

  return jsonResponse({ error: "Method not allowed" }, 405)
})
