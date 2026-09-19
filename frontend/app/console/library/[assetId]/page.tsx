export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ assetId: string }>
}) {
  const { assetId } = await params
  return (
    <h1 className="text-2xl font-semibold tracking-tight">Asset {assetId}</h1>
  )
}
