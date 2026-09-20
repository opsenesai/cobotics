"use client"

import { useState } from "react"

import { Chat, type Message } from "@/components/pages/console/new"

// Prompt suggestions are hidden for now. Restore by passing `append` and
// `suggestions` to <Chat /> below.
// const SUGGESTIONS = [
//   "Summarize the latest deployment logs",
//   "Draft a release note for this week",
//   "Explain what this repository does",
// ]

// UUID v4 (8-4-4-4-12 hex) used as the unique chat id.
function createUuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => {
    const n = Number(c)
    return (
      n ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (n / 4)))
    ).toString(16)
  })
}

export default function NewPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [chatId, setChatId] = useState<string | null>(null)

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setInput(event.target.value)
  }

  const sendMessage = (content: string) => {
    const trimmed = content.trim()
    if (!trimmed) return

    // On the first message, mint a chat id and reflect it in the URL without
    // a full navigation so the conversation state is preserved.
    if (!chatId) {
      const newChatId = createUuid()
      setChatId(newChatId)
      window.history.replaceState(null, "", `/console/new/${newChatId}`)
    }

    const userMessage: Message = {
      id: createUuid(),
      role: "user",
      content: trimmed,
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)

    // Placeholder assistant echo until the backend chat API is wired up.
    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: createUuid(),
        role: "assistant",
        content:
          "The chat backend isn't connected yet, so this is a placeholder response.",
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsGenerating(false)
    }, 600)
  }

  const handleSubmit = (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.()
    sendMessage(input)
  }

  const isEmpty = messages.length === 0

  return (
    <div
      className={`mx-auto flex h-full w-full max-w-3xl flex-col ${
        isEmpty ? "justify-center" : ""
      }`}
    >
      {isEmpty ? (
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-2xl font-normal tracking-tight sm:text-3xl">
            How can I help?
          </h1>
        </div>
      ) : null}
      <Chat
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isGenerating={isGenerating}
        stop={() => setIsGenerating(false)}
        // Prompt suggestions hidden for now:
        // append={(message) => sendMessage(message.content)}
        // suggestions={SUGGESTIONS}
        setMessages={(next) => setMessages(next as Message[])}
        className={isEmpty ? "h-auto" : "h-full"}
      />
    </div>
  )
}
