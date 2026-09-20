"use client"

import { use, useState } from "react"

import { Chat, type Message } from "@/components/pages/console/new"

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)
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
      id: createId(),
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
        id: createId(),
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
