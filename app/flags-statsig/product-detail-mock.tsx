import { ShoppingCart, Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProductDetailMockProps {
  checkoutVariant: "control" | "variant_a" | "variant_b";
  freeShippingThreshold: number;
  isNewLayout: boolean;
}

export function ProductDetailMock({
  isNewLayout,
  freeShippingThreshold,
  checkoutVariant,
}: ProductDetailMockProps) {
  const product = {
    name: "Classic Clog",
    price: 49.99,
    rating: 4.8,
    reviews: 2341,
    colors: ["Lime", "Navy", "White"],
  };

  // Checkout button text varies by experiment variant
  const checkoutButtonText = {
    control: "Add to Cart",
    variant_a: "Buy Now - Quick Checkout",
    variant_b: "Add to Bag",
  }[checkoutVariant];

  if (isNewLayout) {
    // NEW LAYOUT: Modern, card-based design
    return (
      <div className="rounded-lg border border-primary bg-primary/5 p-4">
        <Badge className="mb-4">New Layout Active</Badge>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Image placeholder */}
          <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
            <span className="text-4xl">👟</span>
          </div>

          {/* Product info - new layout */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-2xl">{product.name}</h3>
              <div className="mt-1 flex items-center gap-2 text-muted-foreground text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span>({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="font-bold text-3xl">${product.price}</div>

            {/* Free shipping banner */}
            <div className="rounded-md bg-green-50 p-3 text-sm dark:bg-green-950">
              <Truck className="mr-2 inline h-4 w-4" />
              Free shipping on orders over ${freeShippingThreshold}!
            </div>

            {/* Color selector - new style */}
            <div>
              <p className="mb-2 font-medium text-sm">Color</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <Button key={color} size="sm" variant="outline">
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Checkout CTA */}
            <Button className="w-full" size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {checkoutButtonText}
            </Button>

            <p className="text-center text-muted-foreground text-xs">
              Checkout variant: <code>{checkoutVariant}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // CLASSIC LAYOUT: Traditional horizontal layout
  return (
    <div className="rounded-lg border p-4">
      <Badge className="mb-4" variant="secondary">
        Classic Layout Active
      </Badge>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Image placeholder */}
        <div className="flex aspect-square w-full shrink-0 items-center justify-center rounded bg-muted md:w-48">
          <span className="text-4xl">👟</span>
        </div>

        {/* Product info - classic layout */}
        <div className="flex-1 space-y-3">
          <h3 className="font-semibold text-xl">{product.name}</h3>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {product.rating} ({product.reviews} reviews)
          </div>

          <div className="font-bold text-2xl">${product.price}</div>

          <p className="text-muted-foreground text-sm">
            <Truck className="mr-1 inline h-4 w-4" />
            Free shipping over ${freeShippingThreshold}
          </p>

          {/* Color selector - classic style */}
          <div className="text-sm">
            <span className="text-muted-foreground">Colors: </span>
            {product.colors.join(", ")}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {checkoutButtonText}
            </Button>
            <span className="text-muted-foreground text-xs">
              Variant: <code>{checkoutVariant}</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
