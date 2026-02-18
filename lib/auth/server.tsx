// lib/auth-server.ts
import { fetchFromServer } from "@/lib/api/server";
import { UserType } from "@/types/api/users";

export async function getCurrentUser() {
    let res: UserType | null = null
    try {
        res = await fetchFromServer("/users/me/");
        return res
    } catch {
        return null;
    }
}
