import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FlagsTableProps {
  checkoutVariant: "control" | "variant_a" | "variant_b";
  freeShippingThreshold: number;
  newPdpLayout: boolean;
}

export function FlagsTable({
  newPdpLayout,
  freeShippingThreshold,
  checkoutVariant,
}: FlagsTableProps) {
  const flags = [
    {
      key: "flag_new_pdp_layout",
      type: "boolean",
      value: newPdpLayout,
      displayValue: newPdpLayout ? "true" : "false",
      description: "Toggles between classic and new PDP layouts",
    },
    {
      key: "flag_free_shipping_threshold",
      type: "number",
      value: freeShippingThreshold,
      displayValue: `$${freeShippingThreshold}`,
      description: "Free shipping qualification threshold",
    },
    {
      key: "flag_checkout_experiment_variant",
      type: "string",
      value: checkoutVariant,
      displayValue: checkoutVariant,
      description: "Checkout experience experiment variant",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-64">Flag Key</TableHead>
          <TableHead className="w-24">Type</TableHead>
          <TableHead className="w-32">Current Value</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flags.map((flag) => (
          <TableRow key={flag.key}>
            <TableCell className="font-mono text-xs">{flag.key}</TableCell>
            <TableCell>
              <Badge variant="outline">{flag.type}</Badge>
            </TableCell>
            <TableCell>
              <code className="rounded bg-muted px-1.5 py-0.5 font-semibold text-xs">
                {flag.displayValue}
              </code>
            </TableCell>
            <TableCell className="text-muted-foreground text-sm">
              {flag.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
