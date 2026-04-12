import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const metadata: Metadata = {
    title: "NextStep",
    description: "MVP Project",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='fr' suppressHydrationWarning>
            <body className="flex flex-col min-h-screen overscroll-none">
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </NextThemesProvider>
            </body>
        </html>
    );
}