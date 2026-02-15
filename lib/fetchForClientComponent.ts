"use client";

let accessToken: string | null = null;


export function setAccessToken(token: string | null) {
    accessToken = token;
}


export async function fetchFromClient<T>(path: string, locale: string, method: string = "GET", body?: any): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

    let res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": locale,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
    });

    if (res.status === 401) {
        // try to refresh token
        const refreshRes = await fetch(`${baseUrl}/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": locale,
            },
            credentials: "include",
        });

        if (!refreshRes.ok) {
            throw new Error("Session expired, please login again");
        }

        const data = await refreshRes.json();
        if (!data.access) throw new Error("Refresh succeeded but no access token returned");
        setAccessToken(data.access)

        // replay request with new access token
        res = await fetch(`${baseUrl}${path}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": locale,
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include",
        });
    }

    if (!res.ok) {
        const text = await res.text();
        let message = `API Error ${res.status}`;
        try {
            const err = JSON.parse(text);
            if (err.detail) message = err.detail;
        } catch { }
        throw new Error(message);
    }

    return res.json();
}
