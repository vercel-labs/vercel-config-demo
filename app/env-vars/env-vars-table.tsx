"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

interface EnvVarsTableProps {
  buildTimeBrandName?: string
  buildTimeApiUrl?: string
}

interface RuntimeConfig {
  DEMO_PROMO_BANNER_TEXT?: string
  DEMO_COLOR_THEME?: string
}

export function EnvVarsTable({ buildTimeBrandName, buildTimeApiUrl }: EnvVarsTableProps) {
  const [runtimeConfig, setRuntimeConfig] = useState<RuntimeConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch runtime config from API route
    fetch("/api/runtime-config")
      .then((res) => res.json())
      .then((data) => {
        setRuntimeConfig(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const rows = [
    {
      source: "Build-time",
      name: "DEMO_BRAND_NAME",
      value: buildTimeBrandName,
      notes: "Brand name baked in at build. Changes require new deployment.",
    },
    {
      source: "Build-time",
      name: "DEMO_API_BASE_URL",
      value: buildTimeApiUrl,
      notes: "API endpoint captured during build process.",
    },
    {
      source: "Runtime",
      name: "DEMO_PROMO_BANNER_TEXT",
      value: runtimeConfig?.DEMO_PROMO_BANNER_TEXT,
      notes: "Fetched via Route Handler at request time.",
    },
    {
      source: "Runtime",
      name: "DEMO_COLOR_THEME",
      value: runtimeConfig?.DEMO_COLOR_THEME,
      notes: "Theme preference fetched dynamically.",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">Source</TableHead>
          <TableHead className="w-48">Env Var Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>
              <Badge variant={row.source === "Build-time" ? "default" : "secondary"}>
                {row.source}
              </Badge>
            </TableCell>
            <TableCell className="font-mono text-xs">{row.name}</TableCell>
            <TableCell>
              {row.source === "Runtime" && loading ? (
                <Spinner className="h-4 w-4" />
              ) : row.value ? (
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{row.value}</code>
              ) : (
                <span className="text-muted-foreground italic text-xs">not set</span>
              )}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{row.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
