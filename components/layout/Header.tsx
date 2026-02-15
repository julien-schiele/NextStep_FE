"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTranslations } from "next-intl";
import AuthDialog from "./AuthDialog";
import { Link } from "@/i18n/navigation";
import LocaleSelector from "./LocalSelector";
import { useAuth } from "@/lib/authProvider";
import { UserMenu } from "./UserMenu";

export default function Header() {
    const t = useTranslations('Header');
    const { loading, user } = useAuth();

    if(loading)return null

    return (
        <header className="w-full fixed top-0 z-10 bg-background/70 dark:bg-background/70 backdrop-blur border-b border-border">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-4 h-16">
                    <LocaleSelector />
                    <div className="font-semibold text-lg text-foreground">
                        NextStep
                    </div>
                </div>

                {/* NAV */}
                <nav className="hidden md:flex items-center gap-6 text-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">
                        {t("home")}
                    </Link>
                    <Link href="/programs" className="hover:text-primary transition-colors">
                        {t("program")}
                    </Link>
                    <Link href="/dashboard" className="hover:text-primary transition-colors">
                        {t("dashboard")}
                    </Link>
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-4 h-16">
                    { user ? (
                        <UserMenu user={user} />
                    ) : (
                        <AuthDialog />
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
