import { twMerge } from "tailwind-merge";
import { ReactNode, HTMLAttributes, LiHTMLAttributes, OlHTMLAttributes } from "react";


type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
    children: ReactNode;
};

export const H1 = ({ children, className = "", ...props }: HeadingProps) => (
    <h1
        className={twMerge("text-4xl md:text-5xl font-extrabold leading-tight", className)}

        {...props}
    >
        {children}
    </h1>
);

export const H2 = ({ children, className = "", ...props }: HeadingProps) => (
    <h2
        className={twMerge("text-3xl md:text-4xl font-bold leading-snug", className)}
        {...props}
    >
        {children}
    </h2>
);

export const H3 = ({ children, className = "", ...props }: HeadingProps) => (
    <h3
        className={twMerge("text-lg md:text-lg font-semibold leading-snug", className)}
        {...props}
    >
        {children}
    </h3>
);

export const H4 = ({ children, className = "", ...props }: HeadingProps) => (
    <h3
        className={twMerge("text-md md:text-md font-semibold leading-snug", className)}
        {...props}
    >
        {children}
    </h3>
);

export const P = ({ children, className = "", ...props }: HeadingProps) => (
    <p className={twMerge("text-sm text-muted-foreground", className)}
        {...props}
    >
        {children}
    </p>
);

export const UL = ({ children, className = "", ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul
        className={twMerge("list-disc ml-6 mb-4 space-y-2", className)}
        {...props}
    >
        {children}
    </ul>
);

export const OL = ({ children, className = "", ...props }: OlHTMLAttributes<HTMLOListElement>) => (
    <ol
        className={twMerge("list-decimal ml-6 mb-4 space-y-2", className)}
        {...props}
    >
        {children}
    </ol>
);

export const LI = ({ children, className = "", ...props }: LiHTMLAttributes<HTMLLIElement>) => (
    <li
        className={twMerge("text-sm text-muted-foreground", className)}
        {...props}
    >
        {children}
    </li>
);