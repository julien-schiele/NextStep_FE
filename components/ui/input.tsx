"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
    "w-full rounded-xl border bg-background px-3 py-2 text-sm \
   ring-offset-background placeholder:text-muted-foreground \
   focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 \
   disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                default: "border-border",
                outline: "border-2 border-primary",
                ghost: "border-transparent bg-muted",
            },
            size: {
                sm: "h-9 text-sm",
                default: "h-10 text-base",
                lg: "h-12 text-lg",
            },
            hasError: {
                true: "border-destructive focus:ring-destructive",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            hasError: false,
        },
    }
);

type ExtraInputProps = {
    label?: React.ReactNode;
    error?: string | React.ReactNode;
};

export type InputProps =
    React.InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof inputVariants> &
    ExtraInputProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, className, variant, size, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium mb-1">{label}</label>
                )}

                <input
                    ref={ref}
                    className={cn(inputVariants({ variant, size, hasError: !!error }), className)}
                    {...props}
                />

                {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";
