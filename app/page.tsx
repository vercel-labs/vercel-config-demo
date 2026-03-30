import { PageLayout } from "@/components/page-layout"
import { DebugPanel } from "@/components/debug-panel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Settings, Flag, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vercel Configuration Demo</h1>
          <p className="mt-2 text-muted-foreground">
            Learn how to manage static and dynamic configuration on Vercel
          </p>
        </div>

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>What This Demo Covers</CardTitle>
            <CardDescription>
              Three mechanisms for managing configuration on Vercel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-medium">
                  1
                </span>
                <div>
                  <strong>Environment Variables</strong> - Per-project, per-environment
                  configuration (Development, Preview, Production) that changes between deployments.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-medium">
                  2
                </span>
                <div>
                  <strong>Feature Flags (Vercel Flags SDK + Statsig)</strong> - Toggle features and
                  run experiments without redeploying, while keeping pages cache-friendly.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-medium">
                  3
                </span>
                <div>
                  <strong>Edge Config</strong> - Ultra-low-latency key-value store for dynamic
                  configuration that can change without redeploying (redirects, feature toggles,
                  A/B tests).
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Navigation Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/env-vars" prefetch={true} className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="mt-4">Environment Variables</CardTitle>
                <CardDescription>Build-time vs runtime configuration</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/flags-statsig" prefetch={true} className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Flag className="h-8 w-8 text-muted-foreground" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="mt-4">Feature Flags</CardTitle>
                <CardDescription>Statsig-powered experimentation</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/edge-config" prefetch={true} className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Zap className="h-8 w-8 text-muted-foreground" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="mt-4">Edge Config</CardTitle>
                <CardDescription>Low-latency dynamic config</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        <DebugPanel />
      </div>
    </PageLayout>
  )
}
