import { Info } from "lucide-react";
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
import { EnvVarsTable } from "./env-vars-table";

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
const BUILD_TIME_BRAND_NAME = process.env.DEMO_BRAND_NAME;
const BUILD_TIME_API_URL = process.env.DEMO_API_BASE_URL;

export default function EnvVarsPage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Environment Variables
          </h1>
          <p className="mt-2 text-muted-foreground">
            Demonstrating build-time vs runtime environment variable usage
          </p>
        </div>

        {/* Key Concepts */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Key Concepts</AlertTitle>
          <AlertDescription className="mt-2">
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <strong>Snapshotted per deployment:</strong> ALL env vars are
                captured at deploy time. If someone updates a value in the
                dashboard while you&apos;re testing a Preview, your Preview
                keeps using the old values. Only new deployments get updated
                values.
              </li>
              <li>
                <strong>Environment-specific:</strong> Env vars can differ by
                environment (Development, Preview, Production) - configure in
                Vercel Project Settings.
              </li>
              <li>
                <strong>Branch overrides:</strong> In Preview, branch-specific
                overrides take precedence over general Preview env vars.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Build-time vs Runtime explanation */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Build-time (Module Scope)</CardTitle>
              <CardDescription>
                Inlined into the JS bundle during build
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>
                Variables accessed at the top level of a module are literally
                replaced with their values in the compiled code. The string
                is baked into your bundle - it&apos;s not even a variable lookup
                at runtime.
              </p>
              <code className="mt-2 block rounded bg-muted p-2 text-xs">
                {"const API_URL = process.env.MY_VAR // Becomes: const API_URL = \"https://...\""}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Runtime (Inside Functions)</CardTitle>
              <CardDescription>Read from serverless function environment</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              <p>
                Variables accessed inside Route Handlers or Server Components
                are read from the function&apos;s environment per request. Still
                snapshotted per deployment, but allows the same code to behave
                differently across environments without rebuilding.
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
              buildTimeApiUrl={BUILD_TIME_API_URL}
              buildTimeBrandName={BUILD_TIME_BRAND_NAME}
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
  );
}
