import { Info, Lightbulb } from "lucide-react";
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
import {
  checkoutExperimentFlag,
  freeShippingThresholdFlag,
  newPdpLayoutFlag,
} from "@/lib/flags";
import { FlagsTable } from "./flags-table";
import { ProductDetailMock } from "./product-detail-mock";

export default async function FlagsStatsigPage() {
  // Evaluate flags on the server
  const newPdpLayout = await newPdpLayoutFlag();
  const freeShippingThreshold = await freeShippingThresholdFlag();
  const checkoutVariant = await checkoutExperimentFlag();

  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Feature Flags with Statsig
          </h1>
          <p className="mt-2 text-muted-foreground">
            Toggle features and run experiments without redeploying
          </p>
        </div>

        {/* Why Statsig */}
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Why Feature Flags (Statsig)?</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2 text-muted-foreground">
              Use Statsig for <strong>experimentation with measurement</strong>{" "}
              - A/B tests where you need statistical analysis, consistent user
              bucketing across sessions, and metric tracking to measure impact.
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <strong>No redeploy needed:</strong> Toggle features instantly
                from the Statsig console or Vercel Toolbar - changes apply to
                all existing deployments immediately.
              </li>
              <li>
                <strong>Statistical rigor:</strong> Get confidence intervals,
                p-values, and automatic detection of metric regressions.
              </li>
              <li>
                <strong>Cache-friendly:</strong> Flags are evaluated at the edge
                and passed via headers/cookies, so pages stay CDN-cacheable
                while users see different experiences.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* When NOT to use */}
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="text-base">
              When NOT to Use Feature Flags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground text-sm">
            <p>
              Feature flags add complexity - managing flags per environment,
              ensuring consistent evaluation, and cleaning up old flags.
              Consider simpler alternatives:
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <strong>Branch-specific env vars:</strong> If you just need
                different config per preview branch (not per user), use env var
                overrides instead.
              </li>
              <li>
                <strong>Edge Config:</strong> If you need instant operational
                changes (kill switches, blocklists) without user bucketing or
                measurement.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Current Flag Values */}
        <Card>
          <CardHeader>
            <CardTitle>Current Flag Values</CardTitle>
            <CardDescription>
              These values are evaluated server-side on each request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FlagsTable
              checkoutVariant={checkoutVariant}
              freeShippingThreshold={freeShippingThreshold}
              newPdpLayout={newPdpLayout}
            />
          </CardContent>
        </Card>

        {/* Product Detail Mock */}
        <Card>
          <CardHeader>
            <CardTitle>Product Detail Page (Mock)</CardTitle>
            <CardDescription>
              Layout changes based on{" "}
              <code className="text-xs">flag_new_pdp_layout</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductDetailMock
              checkoutVariant={checkoutVariant}
              freeShippingThreshold={freeShippingThreshold}
              isNewLayout={newPdpLayout}
            />
          </CardContent>
        </Card>

        {/* Override Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Override Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground text-sm">
            <p>
              <strong>Using the Vercel Toolbar:</strong> When deployed to Vercel
              with the toolbar enabled, you can override flag values directly in
              the browser. Click the flag icon in the toolbar to see available
              flags and toggle them.
            </p>
            <p>
              <strong>Using Environment Variables (local dev):</strong> Set
              these in your <code>.env.local</code>:
            </p>
            <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
              {`FLAG_NEW_PDP_LAYOUT=true
FLAG_FREE_SHIPPING_THRESHOLD=75
FLAG_CHECKOUT_VARIANT=variant_a`}
            </pre>
            <p>
              <strong>Using Statsig Console:</strong> Create feature gates and
              experiments in Statsig, then update targeting rules to control
              rollout percentage, user segments, or experiment allocation.
            </p>
          </CardContent>
        </Card>

        <DebugPanel
          extraConfig={{
            flag_new_pdp_layout: String(newPdpLayout),
            flag_free_shipping_threshold: String(freeShippingThreshold),
            flag_checkout_experiment_variant: checkoutVariant,
          }}
        />
      </div>
    </PageLayout>
  );
}
