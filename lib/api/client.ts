import { buildHeaders, parseErrorResponse } from "./core";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
    accessToken = token;
}

export async function fetchFromClient<T>(
    path: string,
    locale: string,
    method: string = "GET",
    body?: Record<string, unknown>,
    retry = true
): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

    const isAuthRoute =
        path.includes("/token") ||
        path.includes("/users/create/") ||
        path.includes("/token/refresh");

    const makeRequest = () =>
        fetch(`${baseUrl}${path}`, {
            method,
            headers: buildHeaders({ locale, accessToken }),
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
        });

    const res = await makeRequest();

    if (res.status === 401 && retry && !isAuthRoute) {
        const refreshRes = await fetch(`${baseUrl}/token/refresh/`, {
            method: "POST",
            headers: buildHeaders({ locale }),
            credentials: "include",
        });

        if (!refreshRes.ok) {
            setAccessToken(null);
            throw new Error(await parseErrorResponse(refreshRes));
        }

        const data = await refreshRes.json();

        if (!data?.access) {
            setAccessToken(null);
            throw new Error("Invalid refresh response");
        }

        setAccessToken(data.access);

        return fetchFromClient<T>(path, locale, method, body, false);
    }

    if (!res.ok) {
        throw new Error(await parseErrorResponse(res));
    }

    if (res.status === 204) return {} as T;

    return res.json();
}