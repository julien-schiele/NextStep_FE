import { buildHeaders, parseErrorResponse } from "./core";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
    accessToken = token;
}

export async function fetchFromClient<T>(
    path: string,
    locale: string,
    method: string = "GET",
    body?: any
): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

    const makeRequest = () =>
        fetch(`${baseUrl}${path}`, {
            method,
            headers: buildHeaders({ locale, accessToken }),
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
        });

    let res = await makeRequest();

    if (res.status === 401) {
        if (!accessToken) {
            const errorMsg = await parseErrorResponse(res);
            throw new Error(errorMsg || "Not authenticated");
        }
        const refreshRes = await fetch(`${baseUrl}/token/refresh/`, {
            method: "POST",
            headers: buildHeaders({ locale }),
            credentials: "include",
        });

        if (!refreshRes.ok) {
            throw new Error("Session expirée");
        }

        const data = await refreshRes.json();
        setAccessToken(data?.access);

        res = await makeRequest();
    }

    if (!res.ok) {
        throw new Error(await parseErrorResponse(res));
    }

    if (res.status === 204) return {} as T;

    return res.json();
}