import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type StackProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeClassName: Record<NonNullable<StackProps["size"]>, string> = {
  sm: "gap-4",
  md: "gap-6 md:gap-8",
  lg: "gap-10 md:gap-12",
  xl: "gap-14 md:gap-16",
};

export function Stack({ size = "md", className, ...props }: StackProps) {
  return <div className={twMerge("flex flex-col", sizeClassName[size], className)} {...props} />;
}

