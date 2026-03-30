import { ArrowRight, Flag, Settings, Zap } from "lucide-react";
import Link from "next/link";
import { DebugPanel } from "@/components/debug-panel";
import { PageLayout } from "@/components/page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Vercel Configuration Demo
          </h1>
          <p className="mt-2 text-muted-foreground">
            Learn how to manage static and dynamic configuration on Vercel
          </p>
        </div>

        {/* The Core Challenge */}
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardHeader>
            <CardTitle>The Core Challenge</CardTitle>
            <CardDescription>
              Real-world scenario: Simultaneous preview deployments with different configs
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>
              Teams often have multiple developers working on feature branches, each needing
              isolated preview deployments running simultaneously. Each branch may need
              different configuration - pointing to different API instances, CMS versions,
              or feature states for testing.
            </p>
            <p className="text-muted-foreground">
              <strong>The constraint:</strong> When a preview is deployed, Vercel snapshots
              env vars at that moment. If you update a value later, existing previews keep
              their original snapshotted values. This creates conflicts when Branch A and
              Branch B need different values for the same variable.
            </p>
          </CardContent>
        </Card>

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Three Configuration Mechanisms</CardTitle>
            <CardDescription>
              Choose based on how often values change and who needs to change them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-xs">
                  1
                </span>
                <div>
                  <strong>Environment Variables</strong> - Per-deployment config
                  snapshotted at build time. Use branch-specific overrides for
                  isolated preview environments. <em>Requires redeploy to change.</em>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-xs">
                  2
                </span>
                <div>
                  <strong>Feature Flags (Statsig)</strong> - Experimentation with
                  statistical analysis, user bucketing, and metric tracking.
                  <em> Changes instantly without redeploy.</em>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-xs">
                  3
                </span>
                <div>
                  <strong>Edge Config</strong> - Operational config (blocklists,
                  redirects, kill switches) with sub-millisecond reads at the edge.
                  <em> Changes instantly without redeploy.</em>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Navigation Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link className="group" href="/env-vars" prefetch={true}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="mt-4">Environment Variables</CardTitle>
                <CardDescription>
                  Build-time vs runtime configuration
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link className="group" href="/flags-statsig" prefetch={true}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Flag className="h-8 w-8 text-muted-foreground" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardTitle className="mt-4">Feature Flags</CardTitle>
                <CardDescription>
                  Statsig-powered experimentation
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link className="group" href="/edge-config" prefetch={true}>
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
  );
}
