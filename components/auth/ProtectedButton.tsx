"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/authProvider";

interface ProtectedButtonProps extends ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ProtectedButton({ onClick, ...props }: ProtectedButtonProps) {
    const { user, openAuth } = useAuth();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!user) {
            e.preventDefault();
            openAuth();
            return;
        }
        onClick?.(e);
    };

    return <Button {...props} onClick={handleClick} />;
}
