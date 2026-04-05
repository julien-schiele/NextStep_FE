export function extractErrorMessage(data: unknown): string {
    if (!data) return "Une erreur est survenue";

    if (typeof data === "string") return data;

    if (Array.isArray(data)) return data.join(", ");

    if (typeof data === "object") {
        const obj = data as Record<string, unknown>;
        if (Array.isArray(obj.detail)) return (obj.detail as string[]).join(", ");
        if (typeof obj.detail === "string") return obj.detail;
        if (typeof obj.message === "string") return obj.message;
        if (typeof obj.error === "string") return obj.error;
        return JSON.stringify(data);
    }

    return "Une erreur est survenue";
}


export async function parseErrorResponse(res: Response): Promise<string> {
    try {
        const data = await res.json();
        return extractErrorMessage(data);
    } catch {
        return `API Error ${res.status}`;
    }
}


export function buildHeaders({
    locale,
    accessToken,
    cookieHeader,
}: {
    locale: string;
    accessToken?: string | null;
    cookieHeader?: string;
}) {
    return {
        "Content-Type": "application/json",
        "Accept-Language": locale,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    };
}