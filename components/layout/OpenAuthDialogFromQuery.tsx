"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth/authProvider";
import { useSearchParams, useRouter } from 'next/navigation';

export default function OpenAuthDialogFromQuery() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { openAuth } = useAuth();

    useEffect(() => {
        const showAuthDialog = searchParams.get('showAuthDialog');

        if (showAuthDialog === "true") {
            openAuth();

            const params = new URLSearchParams(searchParams.toString());
            params.delete('showAuthDialog');
            router.replace(`?${params.toString()}`);
        }
    }, [searchParams, openAuth, router]);

    return null;
}
