import { NextResponse } from "next/server"
import { getEdgeConfigValues } from "@/lib/edge-config"

/**
 * Edge Config API Route
 *
 * Returns the current Edge Config values as JSON.
 * Useful for debugging or for client-side fetching if needed.
 */
export async function GET() {
  const data = await getEdgeConfigValues()

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    data,
  })
}
