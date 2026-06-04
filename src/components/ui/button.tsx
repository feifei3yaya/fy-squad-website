import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-fy-amber/50 focus-visible:border-fy-amber active:scale-95 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-fy-red aria-invalid:ring-2 aria-invalid:ring-fy-red/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-fy-amber text-fy-dark hover:bg-fy-amber-hc shadow-sm hover:shadow",
        outline:
          "border-fy-edge bg-transparent hover:bg-fy-amber/10 text-fy-amber hover:text-fy-amber-hc shadow-sm",
        secondary:
          "bg-fy-panel text-fy-silver hover:bg-fy-surface border border-fy-edge shadow-sm",
        ghost:
          "hover:bg-fy-panel text-fy-silver hover:text-white",
        destructive:
          "bg-fy-red/10 text-fy-red-hc hover:bg-fy-red/20 border border-fy-red/20",
        link: "text-fy-amber underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 px-4 py-2",
        xs: "h-6 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
