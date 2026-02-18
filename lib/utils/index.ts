import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInDays } from "date-fns";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const capitalize = (value?: string) =>
    value ? value[0].toUpperCase() + value.slice(1) : "";


export function getDurationInDays(start_date?: string | null, end_date?: string | null): number | null {
    if (!start_date) return null;

    const start = Date.parse(start_date);
    const end = end_date ? Date.parse(end_date) : Date.now();
    return differenceInDays(end, start)
}


export function formatDateToLocale(dateString?: string | null): string | null {
    if (!dateString) return null;

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return null;

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}