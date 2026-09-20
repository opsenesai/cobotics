// Edge Function: chats
// All queries run through the caller's RLS-scoped client, so a user can only
// ever touch their own chats/messages.
//
//   GET    /chats                       -> list the caller's chats
//   POST   /chats        { title? }      -> create a chat (saved with user_id)
//   GET    /chats/:id                    -> one chat + its messages
//   POST   /chats/:id/messages { role, content } -> add a message
//   DELETE /chats/:id                    -> delete a chat (and its messages)
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
  const url = new URL(req.url)
  // Path after the function name: ["chats", ":id", "messages"?]
  const segments = url.pathname.split("/").filter(Boolean)
  const idx = segments.indexOf("chats")
  const chatId = idx >= 0 ? segments[idx + 1] : undefined
  const sub = idx >= 0 ? segments[idx + 2] : undefined

  // ---- Collection: /chats -------------------------------------------------
  if (!chatId) {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("chats")
        .select("id, title, created_at, updated_at")
        .order("updated_at", { ascending: false })
      if (error) return jsonResponse({ error: error.message }, 400)
      return jsonResponse({ chats: data })
    }

    if (req.method === "POST") {
      const body = await readJson(req)
      const title =
        typeof body?.title === "string" && body.title.trim()
          ? body.title.trim()
          : "New chat"
      const { data, error } = await supabase
        .from("chats")
        .insert({ user_id: user.id, title })
        .select("id, title, created_at, updated_at")
        .single()
      if (error) return jsonResponse({ error: error.message }, 400)
      return jsonResponse({ chat: data }, 201)
    }

    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  // ---- Messages: /chats/:id/messages -------------------------------------
  if (sub === "messages") {
    if (req.method === "POST") {
      const body = await readJson(req)
      const role = body?.role
      const content = body?.content
      if (role !== "user" && role !== "assistant" && role !== "system") {
        return jsonResponse({ error: "role must be user|assistant|system" }, 400)
      }
      if (typeof content !== "string") {
        return jsonResponse({ error: "content must be a string" }, 400)
      }
      const { data, error } = await supabase
        .from("messages")
        .insert({ chat_id: chatId, user_id: user.id, role, content })
        .select("id, chat_id, role, content, created_at")
        .single()
      if (error) return jsonResponse({ error: error.message }, 400)
      return jsonResponse({ message: data }, 201)
    }
    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  // ---- Item: /chats/:id ---------------------------------------------------
  if (req.method === "GET") {
    const { data: chat, error: chatErr } = await supabase
      .from("chats")
      .select("id, title, created_at, updated_at")
      .eq("id", chatId)
      .single()
    if (chatErr) return jsonResponse({ error: chatErr.message }, 404)

    const { data: messages, error: msgErr } = await supabase
      .from("messages")
      .select("id, role, content, created_at")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
    if (msgErr) return jsonResponse({ error: msgErr.message }, 400)

    return jsonResponse({ chat, messages })
  }

  if (req.method === "DELETE") {
    const { error } = await supabase.from("chats").delete().eq("id", chatId)
    if (error) return jsonResponse({ error: error.message }, 400)
    return jsonResponse({ ok: true })
  }

  return jsonResponse({ error: "Method not allowed" }, 405)
})

async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  try {
    return await req.json()
  } catch {
    return null
  }
}
