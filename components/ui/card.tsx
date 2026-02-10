import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";


type CardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export const Card = ({ children, className = "", ...props }: CardProps) => (
    <div
        className={twMerge("bg-card text-card-foreground rounded-2xl p-5", className)}
        {...props}
    >
        {children}
    </div>
);