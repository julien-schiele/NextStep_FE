import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "lg" | "md" | "sm";
};

const sizeClassName: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-6xl",
  lg: "max-w-7xl",
  md: "max-w-3xl",
  sm: "max-w-lg",
};

export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={twMerge(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClassName[size],
        className
      )}
      {...props}
    />
  );
}

