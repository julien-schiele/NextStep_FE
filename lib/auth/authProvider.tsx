"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchFromClient, setAccessToken } from "@/lib/api/client";
import { UserType } from "@/types/api/users";
import { useLocale } from "next-intl";
import AuthDialog from "@/components/layout/AuthDialog";


type AuthContextType = {
    user: UserType | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    openAuth: () => void;
    closeAuth: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const locale = useLocale()
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false)

    const fetchUser = async () => {
        try {
            const u = await fetchFromClient<UserType>("/users/me/", locale);
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
            const data = await fetchFromClient("/token/", locale, "POST", { email, password });
            setAccessToken(data.access);
            await fetchUser();
            setIsOpen(false);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const logout = async () => {
        setUser(null);         // reset state on frontend
        setAccessToken(null);  // remove access token stored on client

        try {
            const res = await fetchFromClient("/logout/", locale, "POST");
        } catch (err) {
            console.error("Erreur logout", err);
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
                openAuth: () => setIsOpen(true),
                closeAuth: () => setIsOpen(false),
            }}
        >
            {children}
            <AuthDialog open={isOpen} onOpenChange={setIsOpen} />
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
