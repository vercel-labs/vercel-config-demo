import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { EdgeConfigData } from "@/lib/edge-config"

interface EdgeConfigDisplayProps {
  data: EdgeConfigData
}

export function EdgeConfigDisplay({ data }: EdgeConfigDisplayProps) {
  const hasData =
    data.regional_banner_by_country ||
    data.blocked_skus?.length ||
    data.redirect_rules?.length ||
    data.sale_page_version

  if (!hasData) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center">
        <p className="text-muted-foreground">
          No Edge Config data found. Make sure EDGE_CONFIG is set and the store contains the
          expected keys.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Expected keys: <code>regional_banner_by_country</code>, <code>blocked_skus</code>,{" "}
          <code>redirect_rules</code>, <code>sale_page_version</code>
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Regional Banners */}
      <div>
        <h4 className="text-sm font-semibold mb-2">regional_banner_by_country</h4>
        {data.regional_banner_by_country ? (
          <div className="space-y-2">
            {Object.entries(data.regional_banner_by_country).map(([country, banner]) => (
              <div
                key={country}
                className="rounded p-2 text-sm"
                style={{
                  backgroundColor: banner.backgroundColor,
                  color: banner.textColor,
                }}
              >
                <strong>{country}:</strong> {banner.text}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">Not configured</p>
        )}
      </div>

      <Separator />

      {/* Blocked SKUs */}
      <div>
        <h4 className="text-sm font-semibold mb-2">blocked_skus</h4>
        {data.blocked_skus?.length ? (
          <div className="flex flex-wrap gap-2">
            {data.blocked_skus.map((sku) => (
              <Badge key={sku} variant="destructive">
                {sku}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">No blocked SKUs</p>
        )}
      </div>

      <Separator />

      {/* Redirect Rules */}
      <div>
        <h4 className="text-sm font-semibold mb-2">redirect_rules</h4>
        {data.redirect_rules?.length ? (
          <div className="space-y-1 text-sm font-mono">
            {data.redirect_rules.map((rule, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-muted-foreground">{rule.from}</span>
                <span>→</span>
                <span>{rule.to}</span>
                <Badge variant="outline" className="text-xs">
                  {rule.permanent ? "301" : "302"}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">No redirect rules</p>
        )}
      </div>

      <Separator />

      {/* Sale Page Version */}
      <div>
        <h4 className="text-sm font-semibold mb-2">sale_page_version</h4>
        {data.sale_page_version ? (
          <Badge>{data.sale_page_version}</Badge>
        ) : (
          <p className="text-sm text-muted-foreground italic">Not set (defaults to v1)</p>
        )}
      </div>
    </div>
  )
}
