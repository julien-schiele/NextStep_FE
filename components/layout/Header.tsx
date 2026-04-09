"use client";

import ThemeToggle from "./ThemeToggle";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSelector from "./LocalSelector";
import { useAuth } from "@/lib/auth/authProvider";
import { UserMenu } from "./UserMenu";
import ProtectedButton from "../auth/ProtectedButton";
import { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "../ui/button";
import { AiOutlineLogin } from "react-icons/ai";
import { HeaderLinks } from "./HeaderLinks";
import { Container } from "@/components/layout/Container";


export default function Header() {
    const [displayBurgerMenu, setDisplayBurgerMenu] = useState(false);
    const t = useTranslations('Header');
    const { loading, user } = useAuth();
    const menuRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!displayBurgerMenu) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setDisplayBurgerMenu(false);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [displayBurgerMenu]);


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setDisplayBurgerMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) return (
        <header className="w-full fixed top-0 z-10 bg-background/70 backdrop-blur border-b border-border">
            <Container className="h-16 flex items-center justify-between">
                <div className="h-5 w-24 bg-muted rounded animate-pulse" />
                <div className="h-8 w-8 bg-muted rounded animate-pulse" />
            </Container>
        </header>
    );


    return (
        <header ref={menuRef} className="w-full fixed top-0 z-10 bg-background/70 dark:bg-background/70 backdrop-blur border-b border-border">
            <Container className="h-16 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center md:gap-4 h-16 w-full md:w-auto">
                    <LocaleSelector />
                    <span className="font-semibold text-lg text-foreground flex-1 text-center md:flex-none md:text-left">
                        <Link href="/">NextStep</Link>
                    </span>
                </div>

                {/* NAV for desktop */}
                <nav className="hidden md:flex items-center gap-6 text-foreground">
                    <HeaderLinks t={t} />
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
                        aria-label={displayBurgerMenu ? "close menu" : "open menu"}
                        aria-expanded={displayBurgerMenu}
                    >
                        {displayBurgerMenu ? <HiX size={24} /> : <HiMenu size={24} />}
                    </Button>
                </div>
            </Container>

            {/* NAV for smartphone */}
            <nav className="md:hidden overflow-hidden">
                <div className={`flex flex-col bg-card text-center transition-all duration-300 ease-in-out
                                    ${displayBurgerMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                                `}
                >
                    <HeaderLinks t={t} className="border-b border-border p-4" onLinkClick={() => setDisplayBurgerMenu(false)} />
                </div>
            </nav>
        </header >
    );
}