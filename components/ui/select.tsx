import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const SelectVariants = cva(
    "block w-full rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                default:
                    "bg-background border border-input text-foreground shadow-sm focus:border-primary",
                secondary:
                    "bg-secondary border border-input text-secondary-foreground shadow-sm",
                subtle:
                    "bg-neutral-secondary-medium border border-default-medium text-heading shadow-xs",
            },
            size: {
                default: "px-3 py-2.5",
                sm: "px-2 py-2 text-xs",
                lg: "px-4 py-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type NativeSelectProps = Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "size"
>;

export interface SelectProps
    extends NativeSelectProps,
    VariantProps<typeof SelectVariants> {
    label?: string;
}

const Select = React.forwardRef<
    HTMLSelectElement,
    SelectProps
>(({ className, variant, size, label, children, ...props }, ref) => {
    return (
        <div className="max-w-sm">
            {label && (
                <label
                    htmlFor={props.id}
                    className="block mb-2.5 text-sm font-medium text-heading"
                >
                    {label}
                </label>
            )}

            <select
                ref={ref}
                className={cn(SelectVariants({ variant, size, className }))}
                {...props}
            >
                {children}
            </select>
        </div>
    );
});

Select.displayName = "Select";

export { Select, SelectVariants };
