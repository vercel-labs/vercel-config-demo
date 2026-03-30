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
              Use Edge Config for <strong>operational configuration</strong>{" "}that needs to change
              instantly without any deployment - blocklists, redirects, kill switches. It&apos;s
              NOT for A/B testing (use Statsig for experiments with measurement).
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong>Sub-millisecond reads:</strong> Data is replicated to
                all edge locations globally for ultra-fast access.
              </li>
              <li>
                <strong>Truly instant updates:</strong> Unlike env vars which are
                snapshotted per deployment, Edge Config changes apply to ALL existing
                deployments immediately - no redeploy needed.
              </li>
              <li>
                <strong>Works in middleware:</strong> Perfect for decisions that
                must happen before your app code runs - redirects, geo-routing, blocking.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Comparison */}
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="text-base">Edge Config vs Env Vars vs Feature Flags</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 pr-4 font-medium">Scenario</th>
                    <th className="pb-2 pr-4 font-medium">Use</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 pr-4">Block a SKU or IP immediately during incident</td>
                    <td className="py-2">Edge Config</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">A/B test checkout flow and measure conversion</td>
                    <td className="py-2">Statsig</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Point preview branch to different API sandbox</td>
                    <td className="py-2">Env Vars (branch override)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Redirect /promo to /sale for next 2 hours</td>
                    <td className="py-2">Edge Config</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

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
                <h4 className="font-semibold mb-2">Kill Switches</h4>
                <p className="text-sm text-muted-foreground">
                  Instantly disable features during incidents without redeploying.
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
