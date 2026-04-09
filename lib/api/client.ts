// lib/api/client.ts
import { ApiError, buildHeaders, parseErrorResponse } from "./core";

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

    let refreshPromise: Promise<string> | null = null;

    if (res.status === 401 && retry && !isAuthRoute) {
        try {
            if (!refreshPromise) {
                refreshPromise = fetch(`${baseUrl}/token/refresh/`, {
                    method: "POST",
                    headers: buildHeaders({ locale }),
                    credentials: "include",
                })
                    .then(async (refreshRes) => {
                        if (!refreshRes.ok) throw new ApiError(refreshRes.status, await parseErrorResponse(refreshRes));
                        const data = await refreshRes.json();
                        if (!data?.access) throw new Error("Invalid refresh response");
                        return data.access as string;
                    })
                    .finally(() => { refreshPromise = null; });
            }

            const newToken = await refreshPromise;
            setAccessToken(newToken);
            return fetchFromClient<T>(path, locale, method, body, false);

        } catch (e) {
            setAccessToken(null);
            throw e;
        }
    }

    if (!res.ok) {
        throw new ApiError(res.status, await parseErrorResponse(res));
    }

    if (res.status === 204) return {} as T;

    return res.json();
}