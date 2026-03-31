# Vercel Configuration Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fvercel-config-demo)

A Next.js demo project demonstrating **static vs dynamic configuration on Vercel** using three mechanisms:

1. **Environment Variables** - Per-project, per-environment configuration
2. **Feature Flags (Vercel Flags SDK + Statsig)** - Toggle features without redeploying
3. **Edge Config** - Ultra-low-latency dynamic configuration

## Local Development

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

## Vercel Configuration

### Environment Variables

1. Go to Project Settings → Environment Variables
2. Add the following variables with different values per environment:

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `DEMO_BRAND_NAME` | Crocs Dev | Crocs Preview | Crocs |
| `DEMO_API_BASE_URL` | https://dev-api.example.com | https://preview-api.example.com | https://api.example.com |
| `DEMO_PROMO_BANNER_TEXT` | Dev: Testing promo | Preview: 20% off! | Free shipping over $50! |
| `DEMO_COLOR_THEME` | light | dark | light |

3. Enable "Automatically expose System Environment Variables" to access `VERCEL_ENV`, `VERCEL_GIT_COMMIT_REF`, etc.

### Feature Flags (Statsig)

1. Create a [Statsig](https://statsig.com) account and project
2. Add environment variables:
   - `STATSIG_SERVER_SECRET` - Your Statsig server secret
   - `STATSIG_CLIENT_KEY` - Your Statsig client key
3. Create feature gates in Statsig console:
   - `new_pdp_layout` (boolean)
   - `free_shipping_threshold` (dynamic config)
   - `checkout_experiment` (experiment)

### Edge Config

1. Go to Project Settings → Edge Config
2. Create or link an Edge Config store
3. Add the following keys:

```json
{
  "regional_banner_by_country": {
    "US": { "text": "Free shipping in the US!", "backgroundColor": "#dcfce7", "textColor": "#166534" },
    "UK": { "text": "Free returns for UK customers!", "backgroundColor": "#dbeafe", "textColor": "#1e40af" }
  },
  "blocked_skus": ["SKU-DISCONTINUED-001", "SKU-RECALLED-002"],
  "redirect_rules": [
    { "from": "/old-page", "to": "/new-page", "permanent": true }
  ],
  "sale_page_version": "v1"
}
```

4. Change `sale_page_version` to `"v2"` to see the middleware rewrite in action!

## Demo Script

Use these steps when presenting the demo:

1. **Start with the Home page** - Explain the three configuration mechanisms and when to use each.

2. **Environment Variables (`/env-vars`)** - Show the difference between build-time (baked in) vs runtime (fetched per request). Point out the Debug Panel showing the current environment.

3. **Deploy to Preview** - Push to a feature branch and show how Preview environment variables differ from Production.

4. **Feature Flags (`/flags-statsig`)** - Demonstrate the "static but dynamic" concept. Show the mock PDP switching between layouts.

5. **Toggle a flag** - Change `FLAG_NEW_PDP_LAYOUT=true` (or in Statsig console) and refresh to see the new layout without redeploying.

6. **Edge Config (`/edge-config`)** - Show the current Edge Config values. Explain sub-millisecond reads at the edge.

7. **Middleware demo** - Visit `/sale` (shows V1 by default). Change `sale_page_version` to `"v2"` in Edge Config, refresh, and see V2 **instantly without redeploying**.

8. **Wrap up** - Summarize:
   - Env vars: per-environment, requires redeploy
   - Flags: experimentation, targeted rollouts
   - Edge Config: instant updates, edge-native

## Project Structure

```
app/
├── page.tsx              # Home page
├── env-vars/             # Environment variables demo
├── flags-statsig/        # Feature flags demo
├── edge-config/          # Edge Config demo
├── sale/                 # Sale page v1
├── sale-v2/              # Sale page v2
└── api/
    ├── runtime-config/   # Runtime env var endpoint
    └── edge-config/      # Edge Config endpoint

lib/
├── flags.ts              # Vercel Flags configuration
└── edge-config.ts        # Edge Config client utility

middleware.ts             # Edge Config-powered routing
```

## Key Concepts

### Build-time vs Runtime Variables

```typescript
// BUILD-TIME: Captured when module is evaluated during build
const API_URL = process.env.MY_VAR

// RUNTIME: Read fresh on each request (in Route Handlers)
export async function GET() {
  return Response.json({ value: process.env.MY_VAR })
}
```

### Static but Dynamic (Flags)

Flags are evaluated at the edge in middleware, and results are passed to pages via headers/cookies. This keeps pages cacheable while still allowing personalization.

### Edge Config in Middleware

```typescript
import { get } from "@vercel/edge-config"

export async function middleware(request) {
  const version = await get("sale_page_version")
  if (version === "v2") {
    return NextResponse.rewrite(new URL("/sale-v2", request.url))
  }
}
```
