import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";


type CardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export const Card = ({ children, className = "", ...props }: CardProps) => (
    <div
        className={twMerge("p-6 rounded-md border bg-muted/30", className)}
        {...props}
    >
        {children}
    </div>
);