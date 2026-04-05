'use client';

import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <Button
            variant={"outline"}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            suppressHydrationWarning
        >
            <IoMoon className="dark:hidden" />
            <IoSunny className="hidden dark:block" />
        </Button>
    );
}