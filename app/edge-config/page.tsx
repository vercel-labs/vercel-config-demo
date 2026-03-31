import { Info, Zap } from "lucide-react";
import { DebugPanel } from "@/components/debug-panel";
import { PageLayout } from "@/components/page-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEdgeConfigValues } from "@/lib/edge-config";
import { EdgeConfigDisplay } from "./edge-config-display";

export const dynamic = "force-dynamic";

export default async function EdgeConfigPage() {
  // Fetch Edge Config values server-side
  const edgeConfigData = await getEdgeConfigValues();

  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Edge Config</h1>
          <p className="mt-2 text-muted-foreground">
            Ultra-low-latency key-value store for dynamic configuration
          </p>
        </div>

        {/* Key Benefits */}
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertTitle>Why Edge Config?</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2 text-muted-foreground">
              Edge Config is for <strong>operational configuration</strong> that
              needs ultra-low latency reads globally. For experiments with
              statistical analysis and user bucketing, use a platform like
              Statsig instead.
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <strong>Sub-millisecond reads:</strong> Data is replicated to
                all edge locations for ultra-fast access.
              </li>
              <li>
                <strong>No redeploy needed:</strong> Update configuration
                instantly without triggering a new deployment.
              </li>
              <li>
                <strong>Works in middleware:</strong> Perfect for redirects,
                blocklists, kill switches, and geo-targeted content at the edge.
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
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              This demo includes a middleware that reads{" "}
              <code>sale_page_version</code> from Edge Config. When set to{" "}
              <code>&quot;v2&quot;</code>, requests to <code>/sale</code> are
              rewritten to <code>/sale-v2</code>.
            </p>
            <pre className="overflow-x-auto rounded bg-muted p-4 text-xs">
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
              Try visiting{" "}
              <a className="underline" href="/sale">
                /sale
              </a>{" "}
              - the page you see depends on the Edge Config value!
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
                <h4 className="mb-2 font-semibold">Regional Banners</h4>
                <p className="text-muted-foreground text-sm">
                  Show different promotional banners based on visitor country,
                  updated instantly.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold">Block Lists</h4>
                <p className="text-muted-foreground text-sm">
                  Instantly block SKUs, users, or IPs without redeploying.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold">Redirect Rules</h4>
                <p className="text-muted-foreground text-sm">
                  Manage URL redirects dynamically from Edge Config.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold">Kill Switches</h4>
                <p className="text-muted-foreground text-sm">
                  Instantly disable features during incidents without
                  redeploying.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <DebugPanel
          extraConfig={{
            EDGE_CONFIG: process.env.EDGE_CONFIG
              ? "(connected)"
              : "(not configured)",
            sale_page_version: edgeConfigData.sale_page_version || "not set",
          }}
        />
      </div>
    </PageLayout>
  );
}
