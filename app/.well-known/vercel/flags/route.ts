import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";
import {
  checkoutExperimentFlag,
  freeShippingThresholdFlag,
  newPdpLayoutFlag,
} from "@/lib/flags";

const flags = {
  checkoutExperimentFlag,
  freeShippingThresholdFlag,
  newPdpLayoutFlag,
};

export const GET = createFlagsDiscoveryEndpoint(async () => {
  return await getProviderData(flags);
});
