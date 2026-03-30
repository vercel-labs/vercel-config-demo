import { PageLayout } from "@/components/page-layout"
import { DebugPanel } from "@/components/debug-panel"
import { ProductDetailMock } from "./product-detail-mock"
import { FlagsTable } from "./flags-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Lightbulb } from "lucide-react"
import {
  newPdpLayoutFlag,
  freeShippingThresholdFlag,
  checkoutExperimentFlag,
} from "@/lib/flags"

export default async function FlagsStatsigPage() {
  // Evaluate flags on the server
  const newPdpLayout = await newPdpLayoutFlag()
  const freeShippingThreshold = await freeShippingThresholdFlag()
  const checkoutVariant = await checkoutExperimentFlag()

  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feature Flags with Statsig</h1>
          <p className="mt-2 text-muted-foreground">
            Toggle features and run experiments without redeploying
          </p>
        </div>

        {/* Static but Dynamic concept */}
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>The &quot;Static but Dynamic&quot; Concept</AlertTitle>
          <AlertDescription className="mt-2">
            <p>
              Feature flags are evaluated at the edge (in middleware), and the results are passed
              to your pages via headers or cookies. This means your pages can still be cached and
              served from the CDN, while different users see different experiences.
            </p>
          </AlertDescription>
        </Alert>

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
              newPdpLayout={newPdpLayout}
              freeShippingThreshold={freeShippingThreshold}
              checkoutVariant={checkoutVariant}
            />
          </CardContent>
        </Card>

        {/* Product Detail Mock */}
        <Card>
          <CardHeader>
            <CardTitle>Product Detail Page (Mock)</CardTitle>
            <CardDescription>
              Layout changes based on <code className="text-xs">flag_new_pdp_layout</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductDetailMock
              isNewLayout={newPdpLayout}
              freeShippingThreshold={freeShippingThreshold}
              checkoutVariant={checkoutVariant}
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
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              <strong>Using the Vercel Toolbar:</strong> When deployed to Vercel with the toolbar
              enabled, you can override flag values directly in the browser. Click the flag icon
              in the toolbar to see available flags and toggle them.
            </p>
            <p>
              <strong>Using Environment Variables (local dev):</strong> Set these in your{" "}
              <code>.env.local</code>:
            </p>
            <pre className="rounded bg-muted p-3 text-xs overflow-x-auto">
{`FLAG_NEW_PDP_LAYOUT=true
FLAG_FREE_SHIPPING_THRESHOLD=75
FLAG_CHECKOUT_VARIANT=variant_a`}
            </pre>
            <p>
              <strong>Using Statsig Console:</strong> Create feature gates and experiments in
              Statsig, then update targeting rules to control rollout percentage, user segments,
              or experiment allocation.
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
  )
}
