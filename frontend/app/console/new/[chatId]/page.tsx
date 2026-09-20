"use client"

import { use, useState } from "react"

import { Chat, type Message } from "@/components/pages/console/new"

// UUID v4 (8-4-4-4-12 hex) used as message ids.
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

export default function ChatDetailPage({
  params,
}: {
  params: Promise<{ chatId: string }>
}) {
  const { chatId } = use(params)

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setInput(event.target.value)
  }

  const sendMessage = (content: string) => {
    const trimmed = content.trim()
    if (!trimmed) return

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
        content: `The chat backend isn't connected yet, so this is a placeholder response for chat ${chatId}.`,
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

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col">
      <Chat
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isGenerating={isGenerating}
        stop={() => setIsGenerating(false)}
        setMessages={(next) => setMessages(next as Message[])}
        className="h-full"
      />
    </div>
  )
}
