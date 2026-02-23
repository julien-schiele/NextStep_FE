"use client";

import { useEffect, useState } from "react";
import { parseISO, isValid } from "date-fns";
import { useLocale } from "next-intl";

/**
* Component that displays a date formatted according to the locale
* Client-side only. No server-side rendering → zero hydration mismatch.
*/
interface ClientDateProps {
    dateString?: string | null;
}

export function ClientDate({ dateString }: ClientDateProps) {
    const locale = useLocale()
    const [formatted, setFormatted] = useState<string | null>(null);

    useEffect(() => {
        if (!dateString?.trim()) {
            setFormatted(null);
            return;
        }

        const date = parseISO(dateString);
        if (!isValid(date)) {
            setFormatted(null);
            return;
        }

        setFormatted(
            date.toLocaleDateString(locale, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
        );
    }, [dateString, locale]);

    return <>{formatted}</>;
}