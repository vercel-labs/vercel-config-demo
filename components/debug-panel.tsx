/**
 * Debug Panel Component
 *
 * Displays Vercel system environment variables and demo-specific config values.
 * Shown on every page to help understand the current deployment context.
 */

import { Badge } from "@/components/ui/badge"

interface DebugPanelProps {
  /** Additional config values to display */
  extraConfig?: Record<string, string | undefined>
}

export function DebugPanel({ extraConfig }: DebugPanelProps) {
  // System environment variables (automatically available in Vercel deployments)
  const vercelEnv = process.env.VERCEL_ENV
  const gitBranch = process.env.VERCEL_GIT_COMMIT_REF
  const deploymentUrl = process.env.VERCEL_URL

  return (
    <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4">
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Debug Panel
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground w-40">VERCEL_ENV:</span>
          {vercelEnv ? (
            <Badge variant={vercelEnv === "production" ? "default" : "secondary"}>
              {vercelEnv}
            </Badge>
          ) : (
            <span className="text-muted-foreground italic">not set (local dev)</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground w-40">Branch:</span>
          <span className="font-mono text-xs">
            {gitBranch || <span className="text-muted-foreground italic">not set</span>}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground w-40">Deployment URL:</span>
          <span className="font-mono text-xs truncate max-w-xs">
            {deploymentUrl || <span className="text-muted-foreground italic">not set</span>}
          </span>
        </div>

        {extraConfig && Object.keys(extraConfig).length > 0 && (
          <>
            <hr className="my-3 border-border" />
            {Object.entries(extraConfig).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-muted-foreground w-40 truncate">{key}:</span>
                <span className="font-mono text-xs truncate max-w-xs">
                  {value || <span className="text-muted-foreground italic">not set</span>}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
