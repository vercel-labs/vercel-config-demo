import { type NextRequest } from "next/server"
import { verifyAccess, type ApiData } from "@vercel/flags"
import { newPdpLayoutFlag, freeShippingThresholdFlag, checkoutExperimentFlag } from "@/lib/flags"

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get("Authorization"))

  if (!access) {
    return new Response(null, { status: 401 })
  }

  const flags: ApiData = {
    definitions: {
      [newPdpLayoutFlag.key]: {
        description: newPdpLayoutFlag.description,
        origin: "https://console.statsig.com/",
        options: [
          { value: false, label: "Off" },
          { value: true, label: "On" },
        ],
      },
      [freeShippingThresholdFlag.key]: {
        description: freeShippingThresholdFlag.description,
        origin: "https://console.statsig.com/",
        options: [
          { value: 50, label: "$50" },
          { value: 75, label: "$75" },
          { value: 100, label: "$100" },
          { value: 0, label: "Free (no minimum)" },
        ],
      },
      [checkoutExperimentFlag.key]: {
        description: checkoutExperimentFlag.description,
        origin: "https://console.statsig.com/",
        options: [
          { value: "control", label: "Control" },
          { value: "variant_a", label: "Variant A" },
          { value: "variant_b", label: "Variant B" },
        ],
      },
    },
  }

  return Response.json(flags)
}
