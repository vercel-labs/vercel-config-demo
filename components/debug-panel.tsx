/**
 * Debug Panel Component
 *
 * Displays Vercel system environment variables and demo-specific config values.
 * Shown on every page to help understand the current deployment context.
 */

import { Badge } from "@/components/ui/badge";

interface DebugPanelProps {
  /** Additional config values to display */
  extraConfig?: Record<string, string | undefined>;
}

export function DebugPanel({ extraConfig }: DebugPanelProps) {
  // System environment variables (automatically available in Vercel deployments)
  const vercelEnv = process.env.VERCEL_ENV;
  const gitBranch = process.env.VERCEL_GIT_COMMIT_REF;
  const deploymentUrl = process.env.VERCEL_URL;

  return (
    <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4">
      <h3 className="mb-3 font-semibold text-muted-foreground text-sm uppercase tracking-wide">
        Debug Panel
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-40 text-muted-foreground">VERCEL_ENV:</span>
          {vercelEnv ? (
            <Badge
              variant={vercelEnv === "production" ? "default" : "secondary"}
            >
              {vercelEnv}
            </Badge>
          ) : (
            <span className="text-muted-foreground italic">
              not set (local dev)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-40 text-muted-foreground">Branch:</span>
          <span className="font-mono text-xs">
            {gitBranch || (
              <span className="text-muted-foreground italic">not set</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-40 text-muted-foreground">Deployment URL:</span>
          <span className="max-w-xs truncate font-mono text-xs">
            {deploymentUrl || (
              <span className="text-muted-foreground italic">not set</span>
            )}
          </span>
        </div>

        {extraConfig && Object.keys(extraConfig).length > 0 && (
          <>
            <hr className="my-3 border-border" />
            {Object.entries(extraConfig).map(([key, value]) => (
              <div className="flex items-center gap-2" key={key}>
                <span className="w-40 truncate text-muted-foreground">
                  {key}:
                </span>
                <span className="max-w-xs truncate font-mono text-xs">
                  {value || (
                    <span className="text-muted-foreground italic">
                      not set
                    </span>
                  )}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
