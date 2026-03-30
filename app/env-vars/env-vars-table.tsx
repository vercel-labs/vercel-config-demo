"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function EnvVarValue({
  isRuntime,
  loading,
  value,
}: {
  isRuntime: boolean;
  loading: boolean;
  value: string | undefined;
}) {
  if (isRuntime && loading) {
    return <Spinner className="h-4 w-4" />;
  }
  if (value) {
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{value}</code>
    );
  }
  return <span className="text-muted-foreground text-xs italic">not set</span>;
}

interface EnvVarsTableProps {
  buildTimeApiUrl?: string;
  buildTimeBrandName?: string;
}

interface RuntimeConfig {
  DEMO_COLOR_THEME?: string;
  DEMO_PROMO_BANNER_TEXT?: string;
}

export function EnvVarsTable({
  buildTimeBrandName,
  buildTimeApiUrl,
}: EnvVarsTableProps) {
  const [runtimeConfig, setRuntimeConfig] = useState<RuntimeConfig | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch runtime config from API route
    fetch("/api/runtime-config")
      .then((res) => res.json())
      .then((data) => {
        setRuntimeConfig(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

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
  ];

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
              <Badge
                variant={row.source === "Build-time" ? "default" : "secondary"}
              >
                {row.source}
              </Badge>
            </TableCell>
            <TableCell className="font-mono text-xs">{row.name}</TableCell>
            <TableCell>
              <EnvVarValue
                isRuntime={row.source === "Runtime"}
                loading={loading}
                value={row.value}
              />
            </TableCell>
            <TableCell className="text-muted-foreground text-sm">
              {row.notes}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
