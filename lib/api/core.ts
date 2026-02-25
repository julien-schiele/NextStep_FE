export function extractErrorMessage(data: any): string {
    if (!data) return "Une erreur est survenue";

    if (typeof data === "string") return data;

    if (Array.isArray(data)) return data.join(", ");

    if (typeof data === "object") {
        if (Array.isArray(data.detail)) return data.detail.join(", ");
        if (typeof data.detail === "string") return data.detail;
        if (typeof data.message === "string") return data.message;
        if (typeof data.error === "string") return data.error;
        // fallback stringify
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