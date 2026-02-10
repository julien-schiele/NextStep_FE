"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function LocaleSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentParams = searchParams.toString();

    const locales = ["en", "fr", "es"];

    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = locales.includes(segments[0]) ? segments[0] : "en";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const locale = e.target.value;

        const pathSegments = [...segments];
        if (locales.includes(pathSegments[0])) pathSegments.shift();

        const newPath = `/${locale}/${pathSegments.join("/")}${currentParams ? `?${currentParams}` : ""}`;
        router.push(newPath);
    };

    return (
        <Button asChild variant="outline" className="px-2">
            <select onChange={handleChange} value={currentLocale}>
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
            </select>
        </Button>
    );
}
