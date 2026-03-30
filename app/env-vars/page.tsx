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
          <AlertTitle>Why Environment Variables?</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2 text-muted-foreground">
              Use env vars for configuration that differs by environment (dev/preview/prod)
              but stays constant within a deployment - like API endpoints, database URLs,
              or third-party service credentials.
            </p>
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
                <strong>Branch overrides:</strong> For isolated preview testing,
                use branch-specific overrides. This lets Branch A point to Salesforce
                sandbox 1 while Branch B points to sandbox 2 - without conflicts.
              </li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Real World Scenario */}
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="text-base">Real-World Scenario: Isolated Preview Environments</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Your team has multiple developers working on feature branches. Developer A
              needs their preview to hit Salesforce sandbox A, while Developer B needs
              to hit sandbox B for regression testing.
            </p>
            <p>
              <strong>Solution:</strong> Use branch-specific environment variable overrides
              in Vercel. Each branch can have its own <code>SALESFORCE_URL</code> that only
              applies to previews from that branch.
            </p>
          </CardContent>
        </Card>

        {/* How to Set Up Branch-Specific Env Vars */}
        <Card>
          <CardHeader>
            <CardTitle>How to Set Up Branch-Specific Overrides</CardTitle>
            <CardDescription>
              Step-by-step guide in the Vercel Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-xs">
                  1
                </span>
                <p className="text-sm font-medium">
                  Go to Project Settings &rarr; Environment Variables
                </p>
              </div>
              <div className="rounded-lg border overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-30%20at%2012.03.10%E2%80%AFAM-IbOny4uQhKqojYPukhEdoUT2Je7Mmq.png"
                  alt="Vercel Environment Variables settings page showing Link Shared Variable and Add Environment Variable buttons"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-xs">
                  2
                </span>
                <p className="text-sm font-medium">
                  Click &quot;Add Environment Variable&quot; and select which environments to apply it to
                </p>
              </div>
              <div className="rounded-lg border overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-30%20at%2012.06.07%E2%80%AFAM-2rXW75zn7YBUwD6WvSaZPCY8ed2AhT.png"
                  alt="Add Environment Variable modal showing Environments dropdown with Production, Preview, and Development options"
                  className="w-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                You can apply variables to All Environments, or select specific ones (Production, Preview, Development).
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-xs">
                  3
                </span>
                <p className="text-sm font-medium">
                  For Preview, choose a specific branch to create a branch-specific override
                </p>
              </div>
              <div className="rounded-lg border overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-30%20at%2012.03.25%E2%80%AFAM-hndRvVxRhn6jMdQex4wJaqMqEoWCux.png"
                  alt="Add Environment Variable modal showing Preview environment selected with branch dropdown listing specific branches"
                  className="w-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                The branch dropdown lets you target a specific branch instead of &quot;All Preview Branches&quot;.
                This override only applies to deployments from that branch.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limits & Enterprise Features */}
        <Card>
          <CardHeader>
            <CardTitle>Limits &amp; Enterprise Features</CardTitle>
            <CardDescription>
              Understanding environment variable constraints
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 pr-4 font-medium">Limit</th>
                    <th className="pb-2 pr-4 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 pr-4">Max env vars per environment per project</td>
                    <td className="py-2 font-mono">1,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Total size (all vars combined per deployment)</td>
                    <td className="py-2 font-mono">64 KB</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Edge Functions / Middleware per-var limit</td>
                    <td className="py-2 font-mono">5 KB</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4">Branch-specific overrides</td>
                    <td className="py-2">Unlimited (any branch can have overrides)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Custom environments (Enterprise)</td>
                    <td className="py-2">Up to <strong>12</strong> beyond Production/Preview/Development</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-muted-foreground">
              <strong>Enterprise custom environments</strong> let you create isolated environments
              like Staging, QA, or team-specific environments - each with their own env vars,
              domains, and branch rules. This is useful when branch overrides aren&apos;t enough
              and you need completely separate deployment contexts.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://vercel.com/docs/environment-variables"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Env Vars Docs &rarr;
              </a>
              <a
                href="https://vercel.com/docs/accounts/plans-and-billing/limits"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Limits &rarr;
              </a>
              <a
                href="https://vercel.com/docs/deployments/custom-environments"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Custom Environments &rarr;
              </a>
            </div>
          </CardContent>
        </Card>

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
