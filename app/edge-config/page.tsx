import { PageLayout } from "@/components/page-layout"
import { DebugPanel } from "@/components/debug-panel"
import { EdgeConfigDisplay } from "./edge-config-display"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Zap, Info } from "lucide-react"
import { getEdgeConfigValues } from "@/lib/edge-config"

export default async function EdgeConfigPage() {
  // Fetch Edge Config values server-side
  const edgeConfigData = await getEdgeConfigValues()

  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edge Config</h1>
          <p className="mt-2 text-muted-foreground">
            Ultra-low-latency key-value store for dynamic configuration
          </p>
        </div>

        {/* Key Benefits */}
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertTitle>Why Edge Config?</AlertTitle>
          <AlertDescription className="mt-2">
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong>Sub-millisecond reads:</strong> Data is replicated to all edge locations
                for ultra-fast access.
              </li>
              <li>
                <strong>No redeploy needed:</strong> Update configuration instantly without
                triggering a new deployment.
              </li>
              <li>
                <strong>Works in middleware:</strong> Perfect for redirects, A/B tests, and
                geo-targeting at the edge.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Current Edge Config Values */}
        <Card>
          <CardHeader>
            <CardTitle>Current Edge Config Values</CardTitle>
            <CardDescription>
              Fetched from Edge Config at request time (also available via{" "}
              <code className="text-xs">/api/edge-config</code>)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EdgeConfigDisplay data={edgeConfigData} />
          </CardContent>
        </Card>

        {/* Middleware Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Middleware Example
            </CardTitle>
            <CardDescription>
              Using Edge Config in middleware for dynamic rewrites
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <p className="text-muted-foreground">
              This demo includes a middleware that reads <code>sale_page_version</code> from Edge
              Config. When set to <code>&quot;v2&quot;</code>, requests to <code>/sale</code> are rewritten to{" "}
              <code>/sale-v2</code>.
            </p>
            <pre className="rounded bg-muted p-4 text-xs overflow-x-auto">
{`// middleware.ts
import { NextResponse } from "next/server"
import { get } from "@vercel/edge-config"

export async function middleware(request) {
  if (request.nextUrl.pathname === "/sale") {
    const version = await get("sale_page_version")
    if (version === "v2") {
      return NextResponse.rewrite(
        new URL("/sale-v2", request.url)
      )
    }
  }
  return NextResponse.next()
}`}
            </pre>
            <p className="text-muted-foreground">
              Try visiting <a href="/sale" className="underline">/sale</a> - the page you see
              depends on the Edge Config value!
            </p>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Common Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Regional Banners</h4>
                <p className="text-sm text-muted-foreground">
                  Show different promotional banners based on visitor country, updated instantly.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Block Lists</h4>
                <p className="text-sm text-muted-foreground">
                  Instantly block SKUs, users, or IPs without redeploying.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Redirect Rules</h4>
                <p className="text-sm text-muted-foreground">
                  Manage URL redirects dynamically from Edge Config.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Feature Rollouts</h4>
                <p className="text-sm text-muted-foreground">
                  Gradually roll out features by percentage or user segment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <DebugPanel
          extraConfig={{
            EDGE_CONFIG: process.env.EDGE_CONFIG ? "(connected)" : "(not configured)",
            sale_page_version: edgeConfigData.sale_page_version || "not set",
          }}
        />
      </div>
    </PageLayout>
  )
}
