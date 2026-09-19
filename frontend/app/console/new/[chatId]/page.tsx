export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ chatId: string }>
}) {
  const { chatId } = await params
  return (
    <h1 className="text-2xl font-semibold tracking-tight">Chat {chatId}</h1>
  )
}
