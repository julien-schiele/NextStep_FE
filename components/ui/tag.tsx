import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
    {
        variants: {
            variant: {
                default:
                    "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15",

                secondary:
                    "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",

                outline:
                    "bg-transparent text-foreground border border-border hover:bg-accent/40",

                destructive:
                    "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20",

                ghost:
                    "bg-accent/40 text-accent-foreground border border-transparent hover:bg-accent",
            },

            size: {
                sm: "h-6 px-2.5 text-xs",
                default: "h-7 px-3 text-sm",
                lg: "h-9 px-4 text-sm",
                icon: "h-8 w-8 p-0",
            },
        },

        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface TagProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
    asChild?: boolean
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "span"

        return (
            <Comp
                ref={ref}
                className={cn(tagVariants({ variant, size }), className)}
                {...props}
            />
        )
    }
)

Tag.displayName = "Tag"

export { Tag, tagVariants }
