import { flag } from "flags/next";

/**
 * Feature Flags Configuration using Vercel Flags SDK
 *
 * These flags demonstrate how to use Vercel Flags with Statsig as the provider.
 * The "static but dynamic" concept means:
 * - Flags are evaluated at the edge (in middleware)
 * - Pages can still be cached because flag values are passed via headers/cookies
 * - No runtime evaluation needed in the page component itself
 *
 * To connect Statsig:
 * 1. Set STATSIG_SERVER_SECRET in environment variables
 * 2. Configure Statsig SDK options below
 * 3. Create matching feature gates/experiments in Statsig console
 */

/**
 * Flag: New PDP Layout
 *
 * Toggles between the classic and new product detail page layouts.
 * Use case: A/B testing a new design before rolling out to all users.
 */
export const newPdpLayoutFlag = flag<boolean>({
  key: "flag_new_pdp_layout",
  description: "Toggles between classic and new PDP layouts",
  defaultValue: false,
  // In production, this would use a Statsig adapter:
  // adapter: statsigAdapter({ featureGate: "new_pdp_layout" })
  decide: () => {
    // Fallback decision logic when Statsig is not configured
    // In production, replace with Statsig adapter
    return process.env.FLAG_NEW_PDP_LAYOUT === "true";
  },
});

/**
 * Flag: Free Shipping Threshold
 *
 * Dynamic threshold value for free shipping qualification.
 * Use case: Adjusting promotions without code changes.
 */
export const freeShippingThresholdFlag = flag<number>({
  key: "flag_free_shipping_threshold",
  description: "Free shipping threshold in dollars",
  defaultValue: 50,
  options: [25, 50, 75, 100, 150],
  decide: () => {
    // In production, this would come from Statsig dynamic config
    const threshold = process.env.FLAG_FREE_SHIPPING_THRESHOLD;
    return threshold ? Number.parseInt(threshold, 10) : 50;
  },
});

/**
 * Flag: Checkout Experiment Variant
 *
 * Determines which checkout flow variant to show.
 * Use case: Running an A/B/n experiment on checkout experience.
 */
export const checkoutExperimentFlag = flag<
  "control" | "variant_a" | "variant_b"
>({
  key: "flag_checkout_experiment_variant",
  description: "Checkout experience experiment variant",
  defaultValue: "control",
  options: ["control", "variant_a", "variant_b"],
  decide: () => {
    // In production, this would come from Statsig experiment
    const variant = process.env.FLAG_CHECKOUT_VARIANT as
      | "control"
      | "variant_a"
      | "variant_b"
      | undefined;
    return variant || "control";
  },
});
