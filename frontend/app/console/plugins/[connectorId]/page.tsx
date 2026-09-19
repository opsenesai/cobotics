export default async function ConnectorDetailPage({
  params,
}: {
  params: Promise<{ connectorId: string }>
}) {
  const { connectorId } = await params
  return (
    <h1 className="text-2xl font-semibold tracking-tight">
      Connector {connectorId}
    </h1>
  )
}
