"use client";

import ThemeToggle from "./ThemeToggle";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSelector from "./LocalSelector";
import { useAuth } from "@/lib/auth/authProvider";
import { UserMenu } from "./UserMenu";
import ProtectedLink from "../auth/ProtectedLink";
import ProtectedButton from "../auth/ProtectedButton";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "../ui/button";
import { AiOutlineLogin } from "react-icons/ai";


function Links({ t, className = "", onLinkClick }: {
    t: ReturnType<typeof useTranslations<'Header'>>;
    className?: string;
    onLinkClick?: () => void
}) {
    const completeClassName = `${className} hover:text-primary transition-colors`;
    return (
        <>
            <Link href="/" onClick={onLinkClick} className={completeClassName}>{t("home")}</Link>
            <ProtectedLink href="/programs" onClick={onLinkClick} className={completeClassName}>{t("program")}</ProtectedLink>
            <ProtectedLink href="/dashboard" onClick={onLinkClick} className={completeClassName}>{t("dashboard")}</ProtectedLink>
        </>
    );
}


export default function Header() {
    const [displayBurgerMenu, setDisplayBurgerMenu] = useState(false);
    const t = useTranslations('Header');
    const { loading, user } = useAuth();

    if (loading) return null


    return (
        <header className="w-full fixed top-0 z-10 bg-background/70 dark:bg-background/70 backdrop-blur border-b border-border">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center md:gap-4 h-16 w-full md:w-auto">
                    <LocaleSelector />
                    <span className="font-semibold text-lg text-foreground flex-1 text-center md:flex-none md:text-left">
                        <Link href="/">NextStep</Link>
                    </span>
                </div>

                {/* NAV for desktop */}
                <nav className="hidden md:flex items-center gap-6 text-foreground">
                    <Links t={t} />
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-4 h-16">
                    {user ?
                        <UserMenu user={user} />
                        :
                        <ProtectedButton>
                            <p className="hidden md:flex">{t("sign_in")}</p>
                            <AiOutlineLogin className="flex md:hidden" />
                        </ProtectedButton>
                    }
                    <ThemeToggle />

                    {/* Burger menu for smartphone */}
                    <Button
                        variant={"outline"}
                        className="md:hidden p-2"
                        onClick={() => setDisplayBurgerMenu(!displayBurgerMenu)}
                    >
                        {displayBurgerMenu ? <HiX size={24} /> : <HiMenu size={24} />}
                    </Button>
                </div>
            </div>

            {/* NAV for smartphone */}
            <nav className="md:hidden overflow-hidden">
                <div className={`flex flex-col bg-card text-center transition-all duration-300 ease-in-out
                                    ${displayBurgerMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                                `}
                >
                    <Links t={t} className="border-b border-border p-4" onLinkClick={() => setDisplayBurgerMenu(false)} />
                </div>
            </nav>
        </header >
    );
}