"use client";

import { ReactNode, MouseEvent } from "react";
import { useAuth } from "@/lib/auth/authProvider";
import { Link } from "@/i18n/navigation";


type Props = {
    href: string;
    children: ReactNode;
    className?: string;
};


export default function ProtectedLink({ href, children, className }: Props) {
    const { user, openAuth } = useAuth();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!user) {
            e.preventDefault();
            openAuth();
        }
    };

    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
}
