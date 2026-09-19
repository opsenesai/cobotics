import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Overview | Console",
}

export default function OverviewPage() {
  return <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
}
