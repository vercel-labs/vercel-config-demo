import { NextResponse } from "next/server"

/**
 * Runtime Config Route Handler
 *
 * This endpoint demonstrates RUNTIME environment variable access.
 * Unlike build-time variables (captured at module scope), these are
 * read fresh on each request.
 *
 * Note: Even though these are "runtime", the values still come from
 * the deployment's configured environment variables. To truly change
 * them, you need a new deployment - OR use Edge Config for instant updates.
 */
export async function GET() {
  // These are read at request time (runtime), not build time
  const config = {
    DEMO_PROMO_BANNER_TEXT: process.env.DEMO_PROMO_BANNER_TEXT,
    DEMO_COLOR_THEME: process.env.DEMO_COLOR_THEME,
  }

  return NextResponse.json(config)
}
