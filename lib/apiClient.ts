const PUBLIC_API = process.env.NEXT_PUBLIC_API_URL;
const SERVER_API = process.env.NEXT_SERVER_API_URL;
type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
let accessToken: string | null = null;

/**
 * Choose the right api URL :
 * - browser → localhost
 * - server Next → docker service name
 */
function getBaseUrl() {
    if (typeof window === "undefined") {
        if (!SERVER_API) throw new Error("NEXT_SERVER_API_URL is missing");
        return SERVER_API;
    }

    if (!PUBLIC_API) throw new Error("NEXT_PUBLIC_API_URL is missing");
    return PUBLIC_API;
}


export function setAccessToken(token: string | null) {
    accessToken = token;
}


function buildQuery(params?: Record<string, string | number | boolean>) {
    if (!params) return "";
    const esc = encodeURIComponent;
    return (
        "?" +
        Object.entries(params)
            .map(([k, v]) => `${esc(k)}=${esc(String(v))}`)
            .join("&")
    );
}


async function _fetch<T>(
    path: string,
    method: RequestMethod,
    options?: {
        body?: any;
        locale?: string;
        params?: Record<string, string | number | boolean>;
        extraHeaders?: Record<string, string>;
    }
): Promise<Response> {
    const { body, locale, params, extraHeaders } = options || {};
    const baseUrl = getBaseUrl()
    const url = `${baseUrl}${path}${buildQuery(params)}`;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(locale ? { "Accept-Language": locale } : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...extraHeaders,
    };

    return fetch(url, {
        method,
        headers,
        credentials: "include",
        body: body ? JSON.stringify(body) : undefined,
    });
}


export async function apiFetch<T>(
    path: string,
    method: RequestMethod = "GET",
    options?: {
        body?: any;
        locale?: string;
        params?: Record<string, string | number | boolean>;
    }
): Promise<T> {
    let res = await _fetch<T>(path, method, options);

    if (res.status === 401 && accessToken) {
        const baseUrl = getBaseUrl()
        const refreshRes = await fetch(`${baseUrl}/token/refresh/`, {
            method: "POST",
            credentials: "include",
        });
        if (!refreshRes.ok) {
            accessToken = null;
            throw new Error("Session expired. Please login again.");
        }
        const data = await refreshRes.json();
        if (!data.access) throw new Error("Refresh succeeded but no access token returned");
        accessToken = data.access;
        res = await _fetch<T>(path, method, options);
    }
    if (!res.ok) {
        const text = await res.text();
        let message = `API Error ${res.status}`;
        try {
            const err = JSON.parse(text);
            if (err.detail) {
                message = err.detail;
            }
        } catch {
            if (text) message = text;
        }
        throw new Error(message);
    }

    return res.json() as Promise<T>;
}


export async function apiGet<T>(
    path: string,
    options?: {
        locale?: string;
        params?: Record<string, string | number | boolean>;
    }
) {
    return apiFetch<T>(path, "GET", options);
}


export async function apiPost<T>(
    path: string,
    body: any,
    options?: { locale?: string; params?: Record<string, string | number | boolean> }
) {
    return apiFetch<T>(path, "POST", { ...options, body });
}
