"use client";

import { parseISO, isValid } from "date-fns";
import { useLocale } from "next-intl";

interface ClientDateProps {
    dateString?: string | null;
}

export function ClientDate({ dateString }: ClientDateProps) {
    const locale = useLocale();

    if (!dateString?.trim()) return null;

    const date = parseISO(dateString);
    if (!isValid(date)) return null;

    const formatted = date.toLocaleDateString(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    return <>{formatted}</>;
}