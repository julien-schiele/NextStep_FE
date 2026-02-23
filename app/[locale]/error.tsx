"use client";

import { H2, P } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";


type Props = {
    error: Error;
    reset: () => void;
}


export default function GlobalError({ error, reset, }: Props) {
    const t = useTranslations("ErrorPage")

    const errorId = crypto.randomUUID();
    console.error(errorId, error);

    if (process.env.NODE_ENV === "development") {
        console.error(error);
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-6">
            <H2>{t("something_happens")}</H2>

            <P>ID: {errorId}</P>
            <P>{t("please_retry")}</P>

            <Button onClick={() => reset()} className="w-1/4">
                {t("retry")}
            </Button>

            <Link href="/">{t("back_home")}</Link>
        </div>
    );
}