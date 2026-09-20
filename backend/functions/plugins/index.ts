// Edge Function: plugins
// Per-user plugin/connector configuration. RLS-scoped to the caller.
//
//   GET    /plugins             -> list the caller's plugins
//   PUT    /plugins { connector_id, name?, enabled?, config? } -> upsert
//   DELETE /plugins/:connectorId -> remove a plugin config
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
  const idx = segments.indexOf("plugins")
  const connectorId = idx >= 0 ? segments[idx + 1] : undefined

  const columns = "id, connector_id, name, enabled, config, updated_at"

  if (!connectorId) {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("plugins")
        .select(columns)
        .order("connector_id", { ascending: true })
      if (error) return jsonResponse({ error: error.message }, 400)
      return jsonResponse({ plugins: data })
    }

    if (req.method === "PUT") {
      let body: {
        connector_id?: unknown
        name?: unknown
        enabled?: unknown
        config?: unknown
      }
      try {
        body = await req.json()
      } catch {
        return jsonResponse({ error: "Invalid JSON body" }, 400)
      }
      if (typeof body.connector_id !== "string" || !body.connector_id) {
        return jsonResponse({ error: "connector_id is required" }, 400)
      }

      const { data, error } = await supabase
        .from("plugins")
        .upsert(
          {
            user_id: user.id,
            connector_id: body.connector_id,
            name: typeof body.name === "string" ? body.name : null,
            enabled: body.enabled === true,
            config:
              body.config && typeof body.config === "object"
                ? body.config
                : {},
          },
          { onConflict: "user_id,connector_id" }
        )
        .select(columns)
        .single()
      if (error) return jsonResponse({ error: error.message }, 400)
      return jsonResponse({ plugin: data })
    }

    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  if (req.method === "DELETE") {
    const { error } = await supabase
      .from("plugins")
      .delete()
      .eq("connector_id", connectorId)
    if (error) return jsonResponse({ error: error.message }, 400)
    return jsonResponse({ ok: true })
  }

  return jsonResponse({ error: "Method not allowed" }, 405)
})
