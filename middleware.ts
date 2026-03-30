import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { get } from "@vercel/edge-config"

/**
 * Middleware for Edge Config-powered dynamic routing
 *
 * This middleware demonstrates how Edge Config can be used at the edge
 * to make routing decisions without a full server round-trip.
 *
 * Key concepts:
 * - Runs at the edge, before your application code
 * - Edge Config reads are ultra-fast (< 1ms)
 * - Can rewrite, redirect, or modify requests based on config
 * - Changes to Edge Config take effect immediately (no redeploy)
 *
 * Example use cases:
 * - A/B testing different page versions
 * - Geo-based routing
 * - Maintenance mode
 * - Feature flag evaluation at the edge
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Example: Rewrite /sale to /sale-v2 based on Edge Config
  if (pathname === "/sale") {
    // Skip Edge Config check if not configured
    if (!process.env.EDGE_CONFIG) {
      return NextResponse.next()
    }

    try {
      // Read the sale page version from Edge Config
      // This value can be changed in the Vercel dashboard without redeploying
      const salePageVersion = await get<"v1" | "v2">("sale_page_version")

      if (salePageVersion === "v2") {
        // Rewrite to the v2 version of the sale page
        // The user still sees /sale in their browser, but gets /sale-v2 content
        return NextResponse.rewrite(new URL("/sale-v2", request.url))
      }
    } catch (error) {
      // If Edge Config is not configured or fails, continue with default behavior
      console.error("Edge Config error in middleware:", error)
    }
  }

  // Continue with the request if no rewrite is needed
  return NextResponse.next()
}

/**
 * Configure which paths the middleware runs on
 *
 * We only need to intercept /sale for this demo.
 * In production, you might match more paths or use regex patterns.
 */
export const config = {
  matcher: ["/sale"],
}
