"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiGet, apiPost, setAccessToken } from "./apiClient";
import { UserType } from "@/types/api/user";

type AuthContextType = {
    user: UserType | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const u = await apiGet<UserType>("/users/me/", {});
            setUser(u);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await apiPost("/token/", { email, password }, {});
            setAccessToken(data.access);
            await fetchUser();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const logout = async () => {
        setUser(null);         // reset état user côté FE
        setAccessToken(null);  // efface access token stocké localement

        try {
            await fetch("/api/logout", { method: "POST" }); // proxie vers Django
        } catch (err) {
            console.error("Erreur logout", err);
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
