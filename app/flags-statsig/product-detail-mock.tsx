import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Truck, Star } from "lucide-react"

interface ProductDetailMockProps {
  isNewLayout: boolean
  freeShippingThreshold: number
  checkoutVariant: "control" | "variant_a" | "variant_b"
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
  }

  // Checkout button text varies by experiment variant
  const checkoutButtonText = {
    control: "Add to Cart",
    variant_a: "Buy Now - Quick Checkout",
    variant_b: "Add to Bag",
  }[checkoutVariant]

  if (isNewLayout) {
    // NEW LAYOUT: Modern, card-based design
    return (
      <div className="rounded-lg border border-primary bg-primary/5 p-4">
        <Badge className="mb-4">New Layout Active</Badge>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Image placeholder */}
          <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
            <span className="text-4xl">👟</span>
          </div>

          {/* Product info - new layout */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span>({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="text-3xl font-bold">${product.price}</div>

            {/* Free shipping banner */}
            <div className="rounded-md bg-green-50 dark:bg-green-950 p-3 text-sm">
              <Truck className="inline h-4 w-4 mr-2" />
              Free shipping on orders over ${freeShippingThreshold}!
            </div>

            {/* Color selector - new style */}
            <div>
              <p className="text-sm font-medium mb-2">Color</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <Button key={color} variant="outline" size="sm">
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Checkout CTA */}
            <Button size="lg" className="w-full">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {checkoutButtonText}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Checkout variant: <code>{checkoutVariant}</code>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // CLASSIC LAYOUT: Traditional horizontal layout
  return (
    <div className="rounded-lg border p-4">
      <Badge variant="secondary" className="mb-4">
        Classic Layout Active
      </Badge>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image placeholder */}
        <div className="w-full md:w-48 aspect-square rounded bg-muted flex items-center justify-center shrink-0">
          <span className="text-4xl">👟</span>
        </div>

        {/* Product info - classic layout */}
        <div className="flex-1 space-y-3">
          <h3 className="text-xl font-semibold">{product.name}</h3>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {product.rating} ({product.reviews} reviews)
          </div>

          <div className="text-2xl font-bold">${product.price}</div>

          <p className="text-sm text-muted-foreground">
            <Truck className="inline h-4 w-4 mr-1" />
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
            <span className="text-xs text-muted-foreground">
              Variant: <code>{checkoutVariant}</code>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
