import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/**
 * Sale Page V1 (Default)
 *
 * This is the default sale page shown when Edge Config
 * sale_page_version is not set or set to "v1".
 */
export default function SalePageV1() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Sale</h1>
          <Badge variant="secondary">Version 1</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Classic Sale Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You are viewing the <strong>V1 (classic)</strong> version of the sale page.
            </p>
            <p className="text-muted-foreground">
              This page is controlled by the <code>sale_page_version</code> key in Edge Config.
              When set to <code>&quot;v2&quot;</code>, the middleware will rewrite this request to show
              the V2 page instead.
            </p>
            <div className="rounded-lg border-2 border-dashed p-8 text-center">
              <p className="text-xl font-semibold">Classic Sale Banner</p>
              <p className="text-muted-foreground">Traditional layout style</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
