import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/**
 * Sale Page V2 (New Version)
 *
 * This page is shown when Edge Config sale_page_version is set to "v2".
 * The middleware handles the rewrite from /sale to /sale-v2.
 */
export default function SalePageV2() {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Sale</h1>
          <Badge>Version 2 (New!)</Badge>
        </div>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>New Sale Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You are viewing the <strong>V2 (new)</strong> version of the sale page!
            </p>
            <p className="text-muted-foreground">
              The middleware detected <code>sale_page_version: &quot;v2&quot;</code> in Edge Config
              and rewrote your request from <code>/sale</code> to <code>/sale-v2</code>.
            </p>
            <div className="rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 p-8 text-center">
              <p className="text-2xl font-bold">Modern Sale Banner</p>
              <p className="text-muted-foreground">New gradient design with updated styling</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
