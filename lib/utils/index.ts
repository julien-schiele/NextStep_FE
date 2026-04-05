import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInDays, format, isValid, parseISO } from "date-fns";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const capitalize = (value?: string) =>
    value ? value[0].toUpperCase() + value.slice(1) : "";


export function extractErrorMessage(data: unknown): string {
    if (!data) return "Une erreur est survenue";

    if (typeof data === "string") return data;

    if (typeof data === "object") {
        const obj = data as Record<string, unknown>;
        if (typeof obj.detail === "string") return obj.detail;
        if (typeof obj.message === "string") return obj.message;
        if (typeof obj.error === "string") return obj.error;
        return JSON.stringify(data);
    }

    return "Une erreur est survenue";
}

/**
 * Calculates the duration in days between two ISO dates.
 * 100% client-side to avoid SSR mismatch.
 */
export function getDurationInDays(start_date?: string | null, end_date?: string | null): number | null {
    if (!start_date?.trim()) return null;

    const start = parseISO(start_date);
    if (!isValid(start)) return null;

    const end = end_date?.trim() ? parseISO(end_date) : new Date();
    if (!isValid(end)) return null;

    return differenceInDays(end, start) + 1;
}


/**
 * Formats a date according to the past locale.
 * Safe: checks if the date is valid.
 *
 * @param dateString ISO string de la date
 * @param locale Locale BCP-47, ex: "fr-FR", "en-US"
 */
export function formatDateToLocale(locale: string, dateString?: string | null): string | null {
    if (!dateString?.trim()) return null;

    const date = parseISO(dateString);
    if (!isValid(date)) return null;

    return date.toLocaleDateString(locale);
}

/**
 * Formats a date in a fixed way (dd/MM/yyyy)
 * For stable display or logs
 * 
 * @param dateString ISO string de la date
 */
export const formatDate = (dateString: string): string => {
    const date = parseISO(dateString);
    if (!isValid(date)) return "-";
    return format(date, "dd/MM/yyyy");
};