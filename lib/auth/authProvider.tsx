// lib/auth/authProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from "react";
import { fetchFromClient, setAccessToken } from "@/lib/api/client";
import { TokenResponseType, UserType } from "@/types/api/users";
import { useLocale } from "next-intl";
import AuthDialog from "@/components/layout/AuthDialog";
import { toast } from "sonner";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ApiError } from "../api/core";


type AuthContextType = {
    user: UserType | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearUser: () => void;
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
    const router = useRouter()
    const pathname = usePathname()

    const localeRef = useRef(locale);
    useEffect(() => {
        localeRef.current = locale;
    }, [locale]);

    const fetchUser = useCallback(async () => {
        try {
            const u = await fetchFromClient<UserType>("/users/current/", localeRef.current);
            setUser(u);
        } catch (e) {
            if (e instanceof ApiError && e.status === 401) {
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [pathname, fetchUser]);


    const login = async (email: string, password: string) => {
        try {
            const data: TokenResponseType = await fetchFromClient("/token/", locale, "POST", { email, password });
            setAccessToken(data.access);
            await fetchUser();
            setIsOpen(false);
            router.push("/dashboard");
            router.refresh();
        } catch (e) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
    };

    const logout = async () => {
        try {
            await fetchFromClient("/logout/", locale, "POST");
            clearUser()
            router.push("/")
        } catch (e) {
            toast.error((e as Error).message, { position: "bottom-center" });
        }
    };

    const clearUser = () => {
        setUser(null);
        setAccessToken(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                clearUser,
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
