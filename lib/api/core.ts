export function extractErrorMessage(data: any): string {
    if (!data) return "Une erreur est survenue";

    if (typeof data === "string") return data;

    return (
        data.detail ||
        data.message ||
        data.error ||
        (typeof data === "object" ? JSON.stringify(data) : null) ||
        "Une erreur est survenue"
    );
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