// lib/api/server.ts
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { ApiError, buildHeaders, parseErrorResponse } from "./core";

export async function fetchFromServer<T>(
    path: string,
    method: string = "GET",
    body?: Record<string, unknown>,
    retry=true
): Promise<T> {
    const locale = await getLocale();
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    const baseUrl = process.env.NEXT_SERVER_API_URL!;

    const makeRequest = (accessToken?: string) =>
        fetch(`${baseUrl}${path}`, {
            method,
            headers: buildHeaders({ locale, accessToken, cookieHeader }),
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
            cache: "no-store",
        });

    let accessToken = cookieStore.get("_at")?.value ?? undefined;
    let res = await makeRequest(accessToken);

    if (res.status === 401 && retry) {
        const refreshRes = await fetch(`${baseUrl}/token/refresh/`, {
            method: "POST",
            headers: buildHeaders({ locale, cookieHeader }),
            credentials: "include",
            cache: "no-store",
        });

        if (!refreshRes.ok) {
            throw new ApiError(refreshRes.status, await parseErrorResponse(refreshRes));
        }

        const data = await refreshRes.json();
        if (!data?.access) throw new ApiError(401, "Invalid refresh response");
        accessToken = data.access;
        res = await makeRequest(accessToken);
    }

    if (!res.ok) {
        throw new Error(await parseErrorResponse(res));
    }

    if (res.status === 204) return {} as T;

    return res.json();
}