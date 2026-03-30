import { createClient, type EdgeConfigClient } from "@vercel/edge-config";

/**
 * Edge Config Client Utility
 *
 * Vercel Edge Config provides ultra-low-latency reads (<1ms) for dynamic configuration.
 * The connection string is stored in the EDGE_CONFIG environment variable.
 *
 * Common use cases:
 * - Feature flags that need instant updates (no redeploy)
 * - Regional content/banners
 * - Block lists (SKUs, IPs, users)
 * - Redirect rules
 * - A/B test configurations
 */

// Create the Edge Config client only if the connection string is available
// The EDGE_CONFIG env var is automatically set when you link an Edge Config store
function getEdgeConfigClient(): EdgeConfigClient | null {
  if (!process.env.EDGE_CONFIG) {
    return null;
  }
  return createClient(process.env.EDGE_CONFIG);
}

export const edgeConfig = getEdgeConfigClient();

/**
 * Type definitions for our demo Edge Config keys
 */
export interface RegionalBanner {
  [countryCode: string]: {
    text: string;
    backgroundColor: string;
    textColor: string;
  };
}

export interface RedirectRule {
  from: string;
  permanent: boolean;
  to: string;
}

export interface EdgeConfigData {
  blocked_skus?: string[];
  redirect_rules?: RedirectRule[];
  regional_banner_by_country?: RegionalBanner;
  sale_page_version?: "v1" | "v2";
}

/**
 * Fetch multiple Edge Config values at once
 */
export async function getEdgeConfigValues(): Promise<EdgeConfigData> {
  if (!edgeConfig) {
    console.warn("Edge Config not configured - EDGE_CONFIG env var not set");
    return {};
  }

  try {
    const [regionalBanner, blockedSkus, redirectRules, salePageVersion] =
      await Promise.all([
        edgeConfig.get<RegionalBanner>("regional_banner_by_country"),
        edgeConfig.get<string[]>("blocked_skus"),
        edgeConfig.get<RedirectRule[]>("redirect_rules"),
        edgeConfig.get<"v1" | "v2">("sale_page_version"),
      ]);

    return {
      regional_banner_by_country: regionalBanner ?? undefined,
      blocked_skus: blockedSkus ?? undefined,
      redirect_rules: redirectRules ?? undefined,
      sale_page_version: salePageVersion ?? undefined,
    };
  } catch (error) {
    console.error("Error fetching Edge Config:", error);
    return {};
  }
}
