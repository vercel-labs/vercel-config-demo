import { PageLayout } from "@/components/page-layout"
import { DebugPanel } from "@/components/debug-panel"
import { EnvVarsTable } from "./env-vars-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

/**
 * BUILD-TIME ENVIRONMENT VARIABLES
 *
 * These values are captured when the module is evaluated during the build process.
 * They are "baked in" to the deployment and won't change until a new deployment.
 *
 * This is useful for:
 * - API endpoints that don't change at runtime
 * - Brand names that are deployment-specific
 * - Configuration that should be consistent across all requests
 */
const BUILD_TIME_BRAND_NAME = process.env.DEMO_BRAND_NAME
const BUILD_TIME_API_URL = process.env.DEMO_API_BASE_URL

export default function EnvVarsPage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Environment Variables</h1>
          <p className="mt-2 text-muted-foreground">
            Demonstrating build-time vs runtime environment variable usage
          </p>
        </div>

        {/* Key Concepts */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Key Concepts</AlertTitle>
          <AlertDescription className="mt-2">
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong>Environment-specific:</strong> Env vars can differ by environment
                (Development, Preview, Production) - configure in Vercel Project Settings.
              </li>
              <li>
                <strong>Changes require redeployment:</strong> Updates apply to new deployments
                only, not retroactively to existing ones.
              </li>
              <li>
                <strong>Branch overrides:</strong> In Preview, branch-specific overrides take
                precedence over general Preview env vars.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Build-time vs Runtime explanation */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Build-time Variables</CardTitle>
              <CardDescription>
                Read when the module is evaluated during build
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Variables accessed at the top level of a module (outside functions) are captured
                during the build process. The values are &quot;baked in&quot; and remain constant
                for the life of that deployment.
              </p>
              <code className="mt-2 block rounded bg-muted p-2 text-xs">
                const API_URL = process.env.MY_VAR // At module scope
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Runtime Variables</CardTitle>
              <CardDescription>Read fresh on each request</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Variables accessed inside Route Handlers or Server Components are read at request
                time. This allows for more dynamic behavior, though the values still come from the
                deployment&apos;s environment.
              </p>
              <code className="mt-2 block rounded bg-muted p-2 text-xs">
                {"export async function GET() { return process.env.MY_VAR }"}
              </code>
            </CardContent>
          </Card>
        </div>

        {/* Environment Variables Table */}
        <Card>
          <CardHeader>
            <CardTitle>Demo Environment Variables</CardTitle>
            <CardDescription>
              Current values from build-time and runtime sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EnvVarsTable
              buildTimeBrandName={BUILD_TIME_BRAND_NAME}
              buildTimeApiUrl={BUILD_TIME_API_URL}
            />
          </CardContent>
        </Card>

        <DebugPanel
          extraConfig={{
            DEMO_BRAND_NAME: BUILD_TIME_BRAND_NAME,
            DEMO_API_BASE_URL: BUILD_TIME_API_URL,
          }}
        />
      </div>
    </PageLayout>
  )
}
